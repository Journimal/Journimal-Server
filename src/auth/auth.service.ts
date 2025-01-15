import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthCredentialLoginDto } from './dto/auth-credential-login.dto';
import { UserResponse } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  // sign up method
  async signup(authCredentialDto: AuthCredentialDto): Promise<UserResponse> {
    const { user_id, user_pw, user_name } = authCredentialDto;
    const existingUser = await this.userRepository.findOne({
      where: { user_id: user_id },
    });

    // check if user already exists
    if (existingUser) {
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          message: 'User already exists',
        },
        HttpStatus.CONFLICT,
      );
    }

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(user_pw, salt);
    const newUser = this.userRepository.create({
      user_name,
      user_id,
      user_pw: hashedPassword,
    });

    return {
      status: HttpStatus.CREATED,
      message: 'User created successfully',
      data: await this.userRepository.save(newUser),
    };
  }

  // log in method
  async login(
    authCredentialLoginDto: AuthCredentialLoginDto,
  ): Promise<{ accessToken: string }> {
    const { user_id, user_pw } = authCredentialLoginDto;

    const user = await this.userRepository.findOne({
      where: { user_id: user_id },
    });

    // comparing current user and saved user
    const savedUser = await bcrypt.compare(user_pw, user.user_pw);
    if (user && savedUser) {
      // creating user token(JWT)
      const Payload = { user_id };
      const accessToken = await this.jwtService.sign(Payload);

      return { accessToken };
    } else {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
