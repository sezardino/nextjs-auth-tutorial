import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/user.dto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(userName: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: { userName: userName },
    });
  }

  async create(userDto: CreateUserDto) {
    const user = await this.usersRepository.create(userDto);
    return await this.usersRepository.save(user);
  }
}
