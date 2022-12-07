import { Module } from '@nestjs/common';
import { DataModule } from './data.module';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`),
    RouterModule.register([
      {
        path: 'api',
        module: DataModule,
      }
    ]),
    DataModule,
  ],
})
export class AppModule {}