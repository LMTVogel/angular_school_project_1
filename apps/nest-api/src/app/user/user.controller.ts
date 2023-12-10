import {Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from './user.schema';
import { InjectToken, Token } from '../auth/token.decorator';
import { AdminGuard } from '../roles/roles.guard';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AdminGuard)
    @Get()
    async getAll(): Promise<UserModel[]> {
        return this.userService.getAll();
    }

    @Get('isUserAdmin')
    async isUserAdmin(@InjectToken() token: Token): Promise<UserModel> {
        console.log('admin check is triggered: ' + token.id);
        return this.userService.getUserById(token.id);
    }

    @UseGuards(AdminGuard)
    @Get(':userId')
    async getUserById(@Param("userId") userId: string): Promise<UserModel> {
        return this.userService.getUserById(userId);
    }

    @Put()
    async updateUser(@Body() userChanges: UserModel): Promise<UserModel> {
        return this.userService.updateUser(userChanges);
    }

    @Delete()
    async deleteUser(@InjectToken() token: Token): Promise<UserModel> {
        console.log(token);
        return this.userService.deleteUser(token.id, token.email);
    }

    @Delete(':userId')
    async deleteUserById(@Param("userId") id: string): Promise<UserModel> {
        const user = await this.userService.getUserById(id);
        return this.userService.deleteUser(user.id, user.email);
    }


}
