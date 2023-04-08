import { Injectable } from '@nestjs/common';

import { sign, verify, JwtPayload } from 'jsonwebtoken';
import { hash, compare } from 'bcrypt';

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Identity, IdentityDocument } from './identity.schema';
import { User, UserDocument } from '../user/user.schema';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Identity.name) private identityModel: Model<IdentityDocument>,
        @InjectModel(User.name) private userModel: Model<UserDocument>
    ) {}

    async createUser(name: string, email: string, bday: Date, isAdmin: boolean): Promise<string> {
        const user = new this.userModel({name, email, bday, isAdmin});
        await user.save();
        return user.id;
      }

    async verifyToken(token: string): Promise<any> {
        return new Promise((resolve, reject) => {
            verify(token, process.env.JWT_SECRET, (err, payload) => {
                if (err) reject(err);
                else resolve(payload);
            })
        })
    }

    async registerUser(email: string, password: string,) {
        const generatedHash = await hash(password, parseInt(process.env.SALT_ROUNDS, 10));

        const identity = new this.identityModel({email, hash: generatedHash});

        await identity.save();
    }

    async generateToken(email: string, password: string): Promise<string> {
        const identity = await this.identityModel.findOne({email});

        if (!identity || !(await compare(password, identity.hash)))
          throw new Error("user not authorized");

        const user = await this.userModel.findOne({email: email});

        return new Promise((resolve, reject) => {
            sign(
              {email, id: user.id},
              process.env.JWT_SECRET,
              (err: Error, token: string) => {
                if (err) reject(err);
                else resolve(token);
            });
        })
    }
}
