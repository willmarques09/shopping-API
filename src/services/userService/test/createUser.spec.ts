import 'reflect-metadata';
import FakeHashProvider from '../../../config/fake/fakeHashProvider';
import AppError from '../../../errors';
import FakeUsersRepository from '../../../repositories/fakes/userRepository';
import CreateUserService from '../createUserService';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let fakeHashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.create({
      name: 'Andreyna Carvalho',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create two users with the same email', async () => {
    await createUser.create({
      name: 'Willhan Marques',
      email: 'teste@teste.com',
      password: '123456',
    });

    expect(
      createUser.create({
        name: 'Willhan Marques',
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
