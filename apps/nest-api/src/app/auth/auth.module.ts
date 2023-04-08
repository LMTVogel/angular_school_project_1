import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthController } from './auth.controller';

import { Identity, IdentitySchema } from './identity.schema';
import { User, UserSchema } from '../user/user.schema';
import { AuthService } from './auth.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Identity.name, schema: IdentitySchema },
      { name: User.name, schema: UserSchema }
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}