import { User as UserModel, UserDocument } from "./user.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {}

    async getAll(): Promise<UserModel[]> {
        return this.userModel.find();
    }

    async getUserById(id: string): Promise<UserModel> {
        return this.userModel.findOne({ id: id });
    }

    async updateUser(incomingUser: UserModel): Promise<UserModel> {
        const user = await this.userModel.findOneAndUpdate(
            { id: incomingUser.id }, 
            { name: incomingUser.name },
            { new: true }
        );
        
        return user;
    }
}
