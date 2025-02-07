import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http'
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should can say hello using service', async () => {
    const response = await controller.sayHelloService('Gilang','')
    expect(response).toBe('Hello, Gilang!');
  })

  it('should can say hello', async () => {
    const response = await controller.sayHello('John', 'Doe')
    expect(response).toBe('Hello John Doe');
  })

  it('should can get view', async () => {
    const response = httpMock.createResponse();
    controller.viewHello('Gilang', response);

    expect(response._getRenderView()).toBe('index.html')
    expect(response._getRenderData()).toEqual({
      name: 'Gilang',
      title: 'Template Engine Mustache',
    });
  })
});
