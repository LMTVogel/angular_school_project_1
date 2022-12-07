import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { User } from '@angular-concert-project/user';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {}

    @Get()
    async getAll(): Promise<User[]> {
        return this.userService.getAll();
    }

    // @Post(':userId')
    // async AddUser(
    //     @Param("userId") userId: string,
    //     @Body() changes: Partial<User>): Promise<User> {

    //     console.log('Creating user!');

    //     return this.userRepository.addUser(userId, changes);
    // }

    // @Put(':userId')
    // async updateUser(@Param("userId") userId: string, @Body() changes: Partial<User>): Promise<User> {
    //     return this.userRepository.updateUser(userId, changes);
    // }

    // @Delete(':userId')
    // async deleteUser(@Param("userId") userId: string): Promise<User> {
    //     return this.userRepository.deleteUser(userId);
    // }
}