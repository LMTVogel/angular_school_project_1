import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Band, BandDocument, BandSchema } from './band.schema';

describe('Band Schema', () => {
    let mongoServer: MongoMemoryServer;
    let bandModel: Model<BandDocument>;

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
                MongooseModule.forFeature([{ name: Band.name, schema: BandSchema }]),
            ],
        }).compile();

        bandModel = app.get<Model<BandDocument>>(getModelToken(Band.name));
    });

    afterAll(async () => {
        await disconnect();
        await mongoServer.stop();
    });

    it('has a required name', async () => {
        const model = new bandModel();
        const err = model.validateSync();
        expect(err.errors.name).toBeInstanceOf(Error);
    });
});