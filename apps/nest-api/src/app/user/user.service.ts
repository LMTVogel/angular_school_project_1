import { User } from "@angular-concert-project/user";
import { User as UserModel, UserDocument } from "./user.schema";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel.name) private userModel: Model<UserDocument>) {}

    async getAll(): Promise<User[]> {
        return this.userModel.find();
    }

    // async addUser(userId: string, changes: Partial<User>): Promise<User> {
    //     return this.userModel.updateOne({ _id: userId }, changes);
    // }

    // updateUser(userId: string, changes: Partial<User>): User | PromiseLike<User> {
    //     throw new Error('Method not implemented.');
    // }

}