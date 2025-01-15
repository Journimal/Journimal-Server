import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from 'src/auth/auth.controller';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { User } from './util/user.decorator';
// import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('name')
  @UseGuards(JwtAuthGuard)
  async findOne(@User('id') id: number): Promise<UserResponse> {
    return this.userService.findOneById(id);
  }
}
