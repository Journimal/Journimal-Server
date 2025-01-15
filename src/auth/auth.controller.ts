import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthCredentialLoginDto } from './dto/auth-credential-login.dto';
// import { JwtAuthGuard } from './jwt.guard';

// define the response type
export interface UserResponse {
  status: number;
  message: string;
  data?: any;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signup(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<UserResponse> {
    return this.authService.signup(authCredentialDto);
  }

  @Post('log-in')
  async login(
    @Body(ValidationPipe) authCredentialLoginDto: AuthCredentialLoginDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.login(authCredentialLoginDto);
  }

  // if you want to test the jwt guard (when you authentication is required)
  /* @UseGuards(JwtAuthGuard)
  @Post('test')
  test() {
    return 'success';
  }*/
}
