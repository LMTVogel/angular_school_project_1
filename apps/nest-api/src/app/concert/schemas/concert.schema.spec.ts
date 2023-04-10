import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Concert, ConcertSchema, ConcertDocument } from './concert.schema';

describe('Concert Schema', () => {
    let mongoServer: MongoMemoryServer;
    let concertModel: Model<ConcertDocument>;

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
                MongooseModule.forFeature([{ name: Concert.name, schema: ConcertSchema }]),
            ],
        }).compile();

        concertModel = app.get<Model<ConcertDocument>>(getModelToken(Concert.name));
    });

    afterAll(async () => {
        await disconnect();
        await mongoServer.stop();
    });

    it('has a required name', async () => {
        const model = new concertModel();
        const err = model.validateSync();
        expect(err.errors.name).toBeInstanceOf(Error);
    });

    it('has a required description', async () => {
        const model = new concertModel();
        const err = model.validateSync();
        expect(err.errors.description).toBeInstanceOf(Error);
    });

    it('has a default startDate', async () => {
        const model = new concertModel();
        const err = model.validateSync();
        expect(err.errors.startDate).toBeDefined();
    });

    it('has a required maxTickets', async () => {
        const model = new concertModel();
        const err = model.validateSync();
        expect(err.errors.maxTickets).toBeInstanceOf(Error);
    });

    it('has a required minimumAge', async () => {
        const model = new concertModel();
        const err = model.validateSync();
        expect(err.errors.minimumAge).toBeInstanceOf(Error);
    });

    it('has an empty list by default', async () => {
        const model = new concertModel();
        expect(model.artists).toEqual([]);
    });

    it('has a required location', async () => {
        const model = new concertModel();
        const err = model.validateSync();
        expect(err.errors.location).toBeInstanceOf(Error);
    });
});