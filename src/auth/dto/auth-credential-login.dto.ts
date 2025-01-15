import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialLoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  user_id: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-zA-Z0-9!@#$%^&*()._-]+$/, {
    message:
      'Password can only include alphanumeric characters and special characters (!@#$%^&*()._-).',
  })
  user_pw: string;
}
