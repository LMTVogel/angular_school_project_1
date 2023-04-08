// import { TokenMiddleware } from './token.middleware';

// describe('Token middelware', () => {
//   let middleware, authService;
//   let request, response;
  
//   // eslint-disable-next-line @typescript-eslint/no-empty-function
//   const next = () => {};

//   beforeEach(() => {
//     authService = {verifyToken: jest.fn()}

//     middleware = new TokenMiddleware(authService);

//     request = {header: jest.fn()};
//     response = {locals: {}};
//   });

//   it('should not accept missing authorization header', async () => {
//     request.header.mockImplementation(() => "");
    
//     await expect(middleware.use(request, response, next)).rejects.toThrow();
//   });

//   it('should not accept invalid token', async () => {
//     request.header.mockImplementation(() => "token");
//     authService.verifyToken.mockImplementation(() => {throw new Error('token invalid');});
    
//     await expect(middleware.use(request, response, next)).rejects.toThrow();
//   });

//   it('should store token in resonse locals', async () => {
//     const token = {username: 'dion', id: 'id123'};

//     request.header.mockImplementation(() => "token");
//     authService.verifyToken.mockImplementation(() => token);

//     await middleware.use(request, response, next);

//     expect(response.locals).toHaveProperty('token', token);
//   });
// });