import request = require('supertest');
import { INestApplication, MiddlewareConsumer, Module } from '@nestjs/common';
import { MongoMemoryServer } from "mongodb-memory-server";
import { MongooseModule } from "@nestjs/mongoose";
import { Neo4jModule } from "./neo4j/neo4j.module";
import { AuthModule } from "./auth/auth.module";
import { RouterModule } from "@nestjs/core";
import { DataModule } from "./data.module";
import { TokenMiddleware } from "./auth/token.middleware";
import { Test, TestingModule } from "@nestjs/testing";
import { MongoClient } from 'mongodb';
import { disconnect } from 'mongoose';
import { UserRegistration } from '@angular-concert-project/user';

let mongod: MongoMemoryServer;
let uri: string;

@Module({
    imports: [
        MongooseModule.forRootAsync({
            useFactory: async () => {
                mongod = await MongoMemoryServer.create();
                uri = mongod.getUri();
                return { uri };
            },
        }),
        Neo4jModule.forRoot({
            scheme: 'neo4j+s',
            host: process.env.NEO4J_HOST,
            username: process.env.NEO4J_USR,
            password: process.env.NEO4J_PWD,
            database: process.env.NEO4J_DATABASE,
        }),
        AuthModule,
        DataModule,
        RouterModule.register([
            { path: 'auth', module: AuthModule },
            { path: 'data', module: DataModule },
        ]),
    ],
    controllers: [],
    providers: [],
})
export class TestAppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(TokenMiddleware).forRoutes('data');
    }
}

describe('Concert API', () => {
    let app: INestApplication;
    let server;
    let module: TestingModule;
    let mongoc: MongoClient;
    
    beforeAll(async () => {
        module = await Test.createTestingModule({
            imports: [TestAppModule],
        }).compile();

        app = module.createNestApplication();
        await app.init();

        mongoc = new MongoClient(uri);
        await mongoc.connect();

        server = app.getHttpServer();
    });

    beforeEach(async () => {
        await mongoc.db('test').collection('users').deleteMany({});
    });

    afterAll(async () => {
        await mongoc.close();
        await disconnect();
        await mongod.stop();
    });

    describe('single user', () => {
        let credentials: UserRegistration;

        beforeEach(async () => {
            credentials = {
                name: 'Test User',
                email: 'luuk@gmail.com',
                password: 'root',
                bday: new Date(),
            };
        });

        it('should register a new user', async () => {
            const res = await request(server).post('/auth/register').send(credentials);
            expect(res.status).toBe(201);
            expect(res.body.id).toBeDefined();

            const login = await request(server).post('/auth/login').send({ email: credentials.email, password: credentials.password });
            expect(login.status).toBe(201);
            expect(login.body.token).toBeDefined();
        });

        it('should not log in user with wrong email', async () => {
            await request(server).post('/auth/register').send(credentials);

            const login = await request(server).post('/auth/login').send({ email: 'qwerty@mail.com', password: credentials.password });
            expect(login.status).toBe(401);
            expect(login.body.token).toBeUndefined();
        });

        it('should not log in user with wrong password', async () => {
            await request(server).post('/auth/register').send(credentials);

            const login = await request(server).post('/auth/login').send({ email: credentials.email, password: 'abracadabra' });
            expect(login.status).toBe(401);
            expect(login.body.token).toBeUndefined();
        });
    })
});