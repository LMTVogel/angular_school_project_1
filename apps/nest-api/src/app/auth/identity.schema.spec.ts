// import { Test } from '@nestjs/testing';

// import { MongoClient } from 'mongodb';
// import { Model, disconnect } from 'mongoose';
// import { MongooseModule, getModelToken } from '@nestjs/mongoose';
// import { MongoMemoryServer } from 'mongodb-memory-server';

// import { Identity, IdentityDocument, IdentitySchema } from "./identity.schema";

// describe('Identity Schema', () => {
//   let mongod: MongoMemoryServer;
//   let mongoc: MongoClient;
//   let identityModel: Model<IdentityDocument>;

//   beforeAll(async () => {
//     const app = await Test.createTestingModule({
//       imports: [
//         MongooseModule.forRootAsync({
//           useFactory: async () => {
//             mongod = await MongoMemoryServer.create();
//             const uri = mongod.getUri();
//             mongoc = new MongoClient(uri);
//             return {uri};
//           },
//         }),
//         MongooseModule.forFeature([{ name: Identity.name, schema: IdentitySchema }])
//       ],
//     }).compile();

//     identityModel = app.get<Model<IdentityDocument>>(getModelToken(Identity.name));

//     // not entirely sure why we need to wait for this...
//     // https://github.com/nodkz/mongodb-memory-server/issues/102
//     await identityModel.ensureIndexes();
//   });

//   beforeEach(async () => {
//     await mongoc.db('test').collection('identities').deleteMany({});
//   });

//   afterAll(async () => {
//     await disconnect();
//     await mongod.stop();
//     await mongoc.close();
//   });

//   it('has a required username', () => {
//     const model = new identityModel();

//     const err = model.validateSync();

//     expect(err.errors.username).toBeInstanceOf(Error);
//   });

//   it('has a unique username', async () => {
//     const original = new identityModel({username: 'samename', hash: 'h123', emailAddress: 'me@mail.com'});
//     const duplicate = new identityModel({username: 'samename', hash: 'h456', emailAddress: 'you@mail.com'});

//     await original.save();
    
//     await expect(duplicate.save()).rejects.toThrow();
//   });

//   it('has a required email', () => {
//     const model = new identityModel();

//     const err = model.validateSync();

//     expect(err.errors.emailAddress).toBeInstanceOf(Error);
//   });

//   it('has a unique email', async () => {
//     const original = new identityModel({username: 'samename', hash: 'h123', emailAddress: 'same@mail.com'});
//     const duplicate = new identityModel({username: 'othername', hash: 'h456', emailAddress: 'same@mail.com'});

//     await original.save();
    
//     await expect(duplicate.save()).rejects.toThrow();
//   });

//   it('has a required password hash', () => {
//     const model = new identityModel();

//     const err = model.validateSync();

//     expect(err.errors.hash).toBeInstanceOf(Error);
//   });
// });