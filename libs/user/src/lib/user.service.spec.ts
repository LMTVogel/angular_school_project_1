import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { User } from './user.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let mockUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Import the HttpClientTestingModule
      providers: [UserService]
    });

    service = TestBed.inject(UserService);

    mockUser = {
      id: '11',
      name: 'Test User',
      email: 'test@example.com',
      bday: new Date('2000-01-01'),
      isAdmin: false
    };
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllUsers should return all users', () => {
    const users = service.getAllUsers();
    expect(users.length).toBe(10);
    expect(users).toEqual(service.users);
  });

  it('getUserById should return the correct user', () => {
    const user = service.getUserById('1');
    expect(user).toEqual(service.users[0]);
  });

  it('addUser should add a user', () => {
    const initialLength = service.users.length;
    service.addUser(mockUser);
    expect(service.users.length).toBe(initialLength + 1);
    expect(service.users[initialLength]).toEqual(mockUser);
  });

  it('editUser should edit the correct user', () => {
    const editedUser = { ...service.users[0], name: 'Edited Name' };
    service.editUser(editedUser);
    expect(service.users[0].name).toBe('Edited Name');
  });

  it('deleteUser should remove the correct user', () => {
    const initialLength = service.users.length;
    service.deleteUser('1');
    expect(service.users.length).toBe(initialLength - 1);
    expect(service.users.find((user) => user.id === '1')).toBeUndefined();
  });
});
