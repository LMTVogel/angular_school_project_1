import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { UserListComponent } from './user-list.component';
import { UserService } from "../user.service";
import { User } from '../user.model';
import { RouterTestingModule } from '@angular/router/testing';

class MockUserService {
  users: User[] = [
    { id: '1', name: 'Test User 1', email: 'test1@example.com', bday: new Date(), isAdmin: false },
    { id: '2', name: 'Test User 2', email: 'test2@example.com', bday: new Date(), isAdmin: false },
    { id: '3', name: 'Test User 3', email: 'test3@example.com', bday: new Date(), isAdmin: false },
  ];

  getAllUsers() {
    return this.users;
  }

  deleteUser(id: string) {
    this.users = this.users.filter(user => user.id !== id);
  }
}

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserListComponent ],
      providers: [ { provide: UserService, useClass: MockUserService } ],
      imports: [ RouterTestingModule ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    fixture.detectChanges(); // triggers ngOnInit
  });

  // Checks if the component is being created
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Checks if the component is initialized with a list of users
  it('should initialize with a list of users', () => {
    expect(component.users.length).toBeGreaterThan(0);
  });

  // Checks if the component is created with the correct list of users
  it('should load all users into the DOM', () => {
    const userRows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(userRows.length).toEqual(component.users.length);
  });

  // Checks if the delete button works and removes the user from the DOM
  it('should delete a user when delete button is clicked in the template', () => {
    const userServiceSpy = jest.spyOn(userService, 'deleteUser').mockImplementation((id: string) => {
      return component.users = component.users.filter(user => user.id !== id);
    });

    // Find the delete button for the first user and click it
    const deleteButtons = fixture.debugElement.queryAll(By.css('.btn-danger'));
    deleteButtons[0].triggerEventHandler('click', null);

    fixture.detectChanges(); // Update the view to reflect the new state

    // Check if the deleteUser method was called
    expect(userServiceSpy).toHaveBeenCalledWith('1');

    // Check the DOM to ensure that the user row is removed
    const userRowsAfterDelete = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(userRowsAfterDelete.length).toEqual(1); // Should only have one user left
    expect(component.users.length).toEqual(1); // Component's users array should have one user
  });
});
