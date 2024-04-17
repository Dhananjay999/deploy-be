import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { user } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let spyUserFindOne: jest.SpyInstance;
  let spyUserFind: jest.SpyInstance;

  const dto = {
    EMAIL: 'dhananjay.manjare@docuity.com',
    PASSWORD: '$2a$10$7h/0SQ4FXRG5eX3602o3/.0mziz0/UA1R6oAnISmX7BcPXVZlZjB2',
  };
  const dto2 = {
    id: 1,
    FIRSTNAME: 'Dhananjay',
    LASTNAME: 'Dhananjay',
    EMAIL: 'dhananjay.manjare@docuity.com',
    PASSWORD: 'aASDSASHU@121@',
    NUMBER: 7999941680,
  };

  const mockUserRepository = {
    findOne: jest.fn().mockImplementation((dto) => dto),
    save: jest.fn().mockImplementation((dto) => null),
    find: jest.fn(),
  };

  const mockJwt = {
    sign: jest.fn().mockImplementation((payload) => {
      return {
        accessToken: 'dddd',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        JwtService,
        {
          provide: getRepositoryToken(user),
          useValue: mockUserRepository,
        },
      ],
    })
      .overrideProvider(JwtService)
      .useValue(mockJwt)
      .compile();
    service = module.get<UserService>(UserService);
    spyUserFindOne = jest.spyOn(mockUserRepository, 'findOne');
    spyUserFind = jest.spyOn(mockUserRepository, 'find');
  });

  it('should create a user', async () => {
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(null));
    expect(await service.create(dto2)).toEqual({
      status: true,
    });
  });

  it('should not create a user', async () => {
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(dto2));
    expect(await service.create(dto2)).toEqual({
      status: false,
    });
  });

  const email = 'dhananjay.manjare@docuity.com';
  const password = 'aASDSASHU@121@';

  it('user should login', async () => {
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(dto));
    expect(await service.login(email, password)).toEqual({
      status: true,
      token: { accessToken: 'dddd' },
    });
  });

  it('user should not login', async () => {
    spyUserFindOne.mockImplementationOnce(() => Promise.resolve(null));
    expect(await service.login(email, password)).toEqual({
      status: false,
    });
  });

  it('should get all users', async () => {
    spyUserFind.mockImplementationOnce(async () => Promise.resolve(dto2));
    expect(await service.get()).toEqual(dto2);
  });
});
