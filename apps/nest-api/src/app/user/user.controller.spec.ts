import { Test, TestingModule } from "@nestjs/testing"
import { UserController } from "./user.controller"
import { UserService } from "./user.service"
import { AuthService } from "../auth/auth.service";

describe('UserController', () => {
    let app: TestingModule;
    let userController: UserController;
    let userService: UserService;

    beforeEach(async () => {
        app = await Test.createTestingModule({
            controllers: [UserController],
            providers: [{
                provide: UserService,
                useValue: {
                    getAll: jest.fn(),
                    getUserById: jest.fn(),
                },
            },
            {
                provide: AuthService,
                useValue: {
                    verifyToken: jest.fn(),
                },
            }],    
        }).compile();

        userService = app.get<UserService>(UserService);
        userController = app.get<UserController>(UserController);
    });

    describe('getAll', () => {
        it('should return an array of users', async () => {
            const users = [
                {
                  id: '1asdfasd',
                  name: 'Test User',
                  email: 'luuk@gmail.com',
                  bday: new Date(),
                  isAdmin: false,
                },
                {
                  id: '3asdfasdf',
                  name: 'Test User 2',
                  email: 'arend@gmail.com',
                  bday: new Date(),
                  isAdmin: false,
                },
            ];

            jest.spyOn(userService, 'getAll').mockImplementation(async () => users);
            const result = await userController.getAll();
            expect(result).toBe(users);
            expect(result.length).toBe(2);
            expect(result[0].id).toBe('1asdfasd');
            expect(result[1].id).toBe('3asdfasdf');
        });
    });

    describe('get user by id', () => {
        it('should return user with requested id', async () => {
            const user = { id: '1asdf', name: 'arend', email: 'arend@mail.com', city: 'Test city', bday: new Date(), isAdmin: false };
            jest.spyOn(userService, 'getUserById').mockImplementation(async () => user);
            const result = await userController.getUserById(user.id);
            expect(result).toHaveProperty('id', '1asdf');
        });
    });
});