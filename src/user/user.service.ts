import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';

// define the response type
export interface UserResponse {
  status: HttpStatus;
  message: string;
  data?: UserEntity;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async update(
    id: number,
    userCreateDto: CreateUserDto,
  ): Promise<UserResponse> {
    try {
      const user = await this.userRepository.findOne({
        where: { user_id: userCreateDto.user_id },
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
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
