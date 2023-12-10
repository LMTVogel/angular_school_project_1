import { User as UserModel, UserDocument } from "./user.schema";
import { Identity as IdentityModel } from "../auth/identity.schema";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(UserModel.name) private userModel: Model<UserDocument>,
        @InjectModel(IdentityModel.name) private identityModel: Model<IdentityModel>
        ) {}

    async getAll(): Promise<UserModel[]> {
        return this.userModel.find();
    }

    async getUserById(id: string): Promise<UserModel> {
        return this.userModel.findOne({ id: id });
    }

    async updateUser(incomingUser: UserModel): Promise<UserModel> {
        const existingUser = await this.userModel.findOne({ id: incomingUser.id });

        const user = await this.userModel.findOneAndUpdate(
            { id: incomingUser.id }, 
            incomingUser,
            { new: true }
        );

        await this.identityModel.findOneAndUpdate(
            { email: existingUser.email },
            { email: incomingUser.email },
            { new: true }
        );
        
        return user;
    }

    async deleteUser(id: string, email: string): Promise<UserModel> {
        console.log(id, ' ', email);

        const toBeDeletedIdentity = await this.identityModel.findOne({ email: email });

        if (toBeDeletedIdentity == null) {
            throw new HttpException('Identity not found', HttpStatus.NOT_FOUND);
        }

        const toBeDeletedUser = await this.userModel.findOne({ id: id });

        if (toBeDeletedUser == null) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else if (toBeDeletedUser.isAdmin) {
            throw new HttpException('Cannot delete admin', HttpStatus.BAD_REQUEST);
        }

        await toBeDeletedIdentity.remove();
        await toBeDeletedUser.remove();

        return toBeDeletedUser;
    }
}
