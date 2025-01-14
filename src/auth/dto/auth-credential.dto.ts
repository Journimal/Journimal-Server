import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  user_name: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  user_id: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-xA-Z0-9]*$/, {
    message: 'Only accepts alphanumeric characters and number',
  })
  user_pw: string;
}
