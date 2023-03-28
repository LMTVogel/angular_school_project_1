import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';

import { ResourceId, Token, UserCredentials, UserRegistration } from '@angular-concert-project/user';

import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('register')
    // credentials: any is a workaround for the following error: credentials: UserRegistration causes error.
    async register(@Body() credentials: any): Promise<ResourceId> {
        try {
            await this.authService.registerUser(credentials.email, credentials.password);

            return {
                id: await this.authService.createUser(credentials.name, credentials.email, credentials.bday),
            };
        } catch (e) {
            throw new HttpException('Email bestaat al', HttpStatus.BAD_REQUEST);
        }
    }

    @Post('login')
    // credentials: any is a workaround for the following error: credentials: UserRegistration causes error.
    async login(@Body() credentials: any): Promise<Token> {
        try {
            return {
                token: await this.authService.generateToken(credentials.email, credentials.password)
            };
        } catch (e) {
            throw new HttpException('Email of wachtwoord ongeldig', HttpStatus.UNAUTHORIZED);
        }
    }
}
