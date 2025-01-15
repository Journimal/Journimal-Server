import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UserResponse } from '../auth/auth.controller';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  // find username by id
  async findOneById(id: number): Promise<UserResponse> {
    const foundUser = this.userRepository.findOne({ where: { id: id } });

    if (!foundUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: HttpStatus.OK,
      message: 'User found',
      data: (await foundUser).user_name,
    };
  }

  // update username by id
  async updateUsername(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    console.log();
    const user = await this.userRepository.update(id, {
      user_name: updateUserDto.user_name,
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    return {
      status: HttpStatus.OK,
      message: 'User updated successfully',
    };
  }
}
