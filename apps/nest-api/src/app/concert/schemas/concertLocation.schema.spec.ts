import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { ConcertLocation, ConcertLocationDocument, ConcertLocationSchema } from './concertLocation.schema';

describe('ConcertLocation Schema', () => {
    let mongoServer: MongoMemoryServer;
    let concertLocationModel: Model<ConcertLocationDocument>;

    beforeAll(async () => {
        const app = await Test.createTestingModule({
            imports: [
                MongooseModule.forRootAsync({
                    useFactory: async () => {
                        mongoServer = await MongoMemoryServer.create();
                        const uri = await mongoServer.getUri();
                        return { uri }
                    }
                }),
                MongooseModule.forFeature([{ name: ConcertLocation.name, schema: ConcertLocationSchema }]),
            ],
        }).compile();

        concertLocationModel = app.get<Model<ConcertLocationDocument>>(getModelToken(ConcertLocation.name));
    });

    afterAll(async () => {
        await disconnect();
        await mongoServer.stop();
    });

    it('has all required fields', async () => {
        const model = new concertLocationModel({
            name: 'Test Concert Location',
            streetAddress: 'Test Street 1',
            zipCode: '1234AB',
            city: 'Test City',
            country: 'Test Country'
        });
        const err = model.validateSync();
        expect(err).toBeUndefined();
    }); 

    it('has a required name', async () => {
        const model = new concertLocationModel();
        const err = model.validateSync();
        expect(err.errors.name).toBeInstanceOf(Error);
    });

    it('has a required streetAddress', async () => {
        const model = new concertLocationModel();
        const err = model.validateSync();
        expect(err.errors.streetAddress).toBeInstanceOf(Error);
    });

    it('has a correct zipCode', async () => {
        const model = new concertLocationModel();
        model.zipCode = '1234AB';
        const err = model.validateSync();
        expect(err.errors.zipCode).toBeUndefined();
    });

    it('has an incorrect zipCode', async () => {
        const model = new concertLocationModel({
            name: 'Test Concert Location',
            streetAddress: 'Test Street 1',
            zipCode: '1234ABC',
            city: 'Test City',
            country: 'Test Country'
        });
        
        try {
            await model.validate();
        } catch (err) {
            expect(err.errors.zipCode.message).toBe('1234ABC is not a valid zip code.');
            expect(err.errors.zipCode.name).toBe('ValidatorError');
        }
    });

    it('has a city', async () => {
        const model = new concertLocationModel();
        const err = model.validateSync();
        expect(err.errors.city).toBeInstanceOf(Error);
    });

    it('has a country', async () => {
        const model = new concertLocationModel();
        const err = model.validateSync();
        expect(err.errors.country).toBeInstanceOf(Error);
    });
});