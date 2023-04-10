import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Artist, ArtistDocument, ArtistSchema } from './artist.schema';
import { Band, BandDocument, BandSchema } from './band.schema';

describe('Artist Schema', () => {
    let mongoServer: MongoMemoryServer;
    let artistModel: Model<ArtistDocument>;
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
                MongooseModule.forFeature([
                    { name: Artist.name, schema: ArtistSchema },
                    { name: Band.name, schema: BandSchema }
                ]),
            ],
        }).compile();

        artistModel = app.get<Model<ArtistDocument>>(getModelToken(Artist.name));
        bandModel = app.get<Model<BandDocument>>(getModelToken(Band.name));
    });

    afterAll(async () => {
        await disconnect();
        await mongoServer.stop();
    });

    it('has all required fields', async () => {
        const band = new bandModel({
            name: 'Test Band',
        });
        const model = new artistModel({
            name: 'Test Artist',
            band: band,
        });
        const err = model.validateSync();
        expect(err).toBeUndefined();
    });

    it('has a required name', async () => {
        const model = new artistModel();
        const err = model.validateSync();
        expect(err.errors.name).toBeInstanceOf(Error);
    });

    it('has no required band', async () => {
        const model = new artistModel();
        const err = model.validateSync();
        expect(err.errors.band).toBeUndefined();
    });
});