import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponse } from 'src/auth/auth.controller';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './util/user.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // get username by id
  @Get('name')
  @UseGuards(JwtAuthGuard)
  async findOne(@User('id') id: number): Promise<UserResponse> {
    return this.userService.findOneById(id);
  }

  // update username by id
  @Patch('name')
  @UseGuards(JwtAuthGuard)
  async update(
    @User('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponse> {
    return this.userService.updateUsername(id, updateUserDto);
  }
}
