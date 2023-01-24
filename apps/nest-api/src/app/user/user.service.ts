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

    // async addUser(userId: string, changes: Partial<User>): Promise<User> {
    //     return this.userModel.updateOne({ _id: userId }, changes);
    // }

    async updateUser(incomingUser: UserModel): Promise<UserModel> {
        const user = await this.userModel.findOne({ id: incomingUser.id });
        const updatedUser = await this.userModel.updateOne({ id: user[0].id },
            [
                {
                    $set: {
                        name: incomingUser.name,
                        email: incomingUser.email,
                        bday: incomingUser.bday
                    }
                }
            ]);
        return user[0];
    }

}
