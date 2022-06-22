import { FindOneOptions, getRepository, Repository } from 'typeorm';
import { hash } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';

import User from '../../models/User';

interface Request {
  name: string;
  surname: string;
  email: string;
  password: string;
}

interface IUsersRepository{
  create(user: User): Promise<User>;
  findOne(options?: FindOneOptions<User | undefined>): Promise<User | undefined>;
  save(user: User): Promise<User>;
}

class CreateUserService {

  constructor(private userRepository: IUsersRepository){}

  public async execute({
    name,
    surname,
    email,
    password,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const checkUserExist = await this.userRepository.findOne({
      where: { email },
    });

    if (checkUserExist) {
      throw new Error('email address already used');
    }

    if (password.length < 8) {
      throw new Error('password should have at least 8 digits');
    }

    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      surname,
      email,
      password: hashPassword,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
