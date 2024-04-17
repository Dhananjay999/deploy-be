import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  const dto = {
    id: 1,
    FIRSTNAME: 'Dhananjay',
    LASTNAME: 'Dhananjay',
    EMAIL: 'dhananjay.manjare@docuity.com',
    PASSWORD: 'aASDSASHU@121@',
    NUMBER: 7999941680,
  };
  const mockUsercontroller = {
    create: jest.fn((dto) => {
      return {
        id: Date.now(),
        ...dto,
      };
    }),

    login: jest.fn((EMAIL: string, PASSWORD: string) => {
      return {
        EMAIL,
        PASSWORD,
      };
    }),

    delete: jest.fn((id: number) => {
      return id;
    }),

    get: jest.fn(() => {
      return dto;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService],
    })
      .overrideProvider(UserService)
      .useValue(mockUsercontroller)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a user', () => {
    expect(
      controller.store({
        FIRSTNAME: 'Dhananjay',
        LASTNAME: 'Dhananjay',
        EMAIL: 'dhananjay.manjare@docuity.com',
        PASSWORD: 'AAAAA',
        NUMBER: 7999941680,
      }),
    ).toEqual({
      id: expect.any(Number),
      FIRSTNAME: 'Dhananjay',
      LASTNAME: 'Dhananjay',
      EMAIL: 'dhananjay.manjare@docuity.com',
      PASSWORD: 'AAAAA',
      NUMBER: 7999941680,
    });
  });

  it('should be login and return user data', () => {
    expect(
      controller.log({
        EMAIL: 'dhananjay@doc.com',
        PASSWORD: 'AAAA',
      }),
    ).toEqual({
      EMAIL: 'dhananjay@doc.com',
      PASSWORD: 'AAAA',
    });
  });

  it('should be delete and return user id', () => {
    expect(controller.delete(1)).toEqual(1);
  });

  it('should be return user all users data', () => {
    expect(controller.getuser()).toEqual(dto);
  });
});
