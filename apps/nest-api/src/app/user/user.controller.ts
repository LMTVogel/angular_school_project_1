import {Controller, Get, Post, Put, Delete, Param, Body, HttpException, HttpStatus} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel } from './user.schema';
import { InjectToken, Token } from '../auth/token.decorator';
import {Neo4jService} from "../neo4j/neo4j.service";

@Controller('users')
export class UserController {
    constructor(private userService: UserService, private neo4jService: Neo4jService) {}

    @Get()
    async getAll(): Promise<UserModel[]> {
        const data = await this.neo4jService.singleRead('MATCH (n) RETURN n LIMIT 25');
        data.records.forEach(record => {
            console.log(record.get('n'));
        });
        return this.userService.getAll();
    }

    // @Post(':userId')
    // async AddUser(
    //     @Param("userId") userId: string,
    //     @Body() changes: Partial<User>): Promise<User> {

    //     console.log('Creating user!');

    //     return this.userRepository.addUser(userId, changes);
    // }

    @Get(':userId')
    async getUserById(@Param("userId") userId: string): Promise<UserModel> {
        return this.userService.getUserById(userId);
    }


    @Put(':userId')
    async updateUser(
        @Param("userId") userId: string,
        @Body() userChanges: UserModel,
        @InjectToken() token: Token
    ): Promise<UserModel> {
        const user = await this.userService.getUserById(token.id);
        if (user.id === userId) {
            return this.userService.updateUser(userChanges);
        } else {
            throw new HttpException('Not authorized to update user!', HttpStatus.UNAUTHORIZED);
        }
    }

    // @Delete(':userId')
    // async deleteUser(@Param("userId") userId: string): Promise<User> {
    //     return this.userRepository.deleteUser(userId);
    // }
}
