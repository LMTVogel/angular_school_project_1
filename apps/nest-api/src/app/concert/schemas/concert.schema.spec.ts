import { Test } from '@nestjs/testing';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { Model, disconnect } from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Concert, ConcertSchema, ConcertDocument } from './concert.schema';
import { ConcertLocation, ConcertLocationDocument, ConcertLocationSchema } from './concertLocation.schema';
import { Artist, ArtistDocument, ArtistSchema } from './artist.schema';
import { Band, BandDocument, BandSchema } from './band.schema';

describe('Concert Schema', () => {
    let mongoServer: MongoMemoryServer;
    let concertModel: Model<ConcertDocument>;
    let concertLocationModel: Model<ConcertLocationDocument>;
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
                    { name: Concert.name, schema: ConcertSchema },
                    { name: ConcertLocation.name, schema: ConcertLocationSchema },
                    { name: Artist.name, schema: ArtistSchema },
                    { name: Band.name, schema: BandSchema }
                ]),
            ],
        }).compile();

        concertModel = app.get<Model<ConcertDocument>>(getModelToken(Concert.name));
        concertLocationModel = app.get<Model<ConcertLocationDocument>>(getModelToken(ConcertLocation.name));
        artistModel = app.get<Model<ArtistDocument>>(getModelToken(Artist.name));
        bandModel = app.get<Model<BandDocument>>(getModelToken(Band.name));
    });

    afterAll(async () => {
        await disconnect();
        await mongoServer.stop();
    });

    it('has all required fields', async () => {
        const location = new concertLocationModel({
            name: 'Test Location',
            streetAddress: 'Test Address',
            zipCode: '1234BB',
            city: 'Test City',
            country: 'Test Country',
        });
        const band = new bandModel({
            name: 'Test Band',
        });
        const artist = new artistModel({
            name: 'Test Artist',
            band: band,
        });
        const model = new concertModel({
            name: 'Test Concert',
            description: 'Test Description',
            startDate: new Date(),
            maxTickets: 100,
            minimumAge: 18,
            location: location,
            artists: [artist],
        });
        const err = model.validateSync();
        expect(err).toBeUndefined();
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