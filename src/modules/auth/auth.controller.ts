import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { UserInterceptor } from '../user/interceptors/user.interceptor';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Public } from 'src/common/decorators/public/public.decorator';
import { RefreshTokenDTO } from './dto/refresh.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @UseInterceptors(UserInterceptor)
  @Get('')
  async auth(@Req() req: Request) {
    return await this.userService.findByEmail((req as any).user.email);
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(UserInterceptor)
  @Public()
  @Post('login')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('refresh')
  async refresh(@Body() refreshTokenDto: RefreshTokenDTO) {
    return await this.authService.generateAccessTokenByRefreshToken(
      refreshTokenDto,
    );
  }

  @HttpCode(HttpStatus.OK)
  @Post('reset-password')
  async resetPassword(
    @Req() req: Request,
    @Body() resetPasswordDto: ResetPasswordDto,
  ) {
    return await this.authService.resetPasswordUsingOldPassword(
      resetPasswordDto,
      (req as any).user.sub,
    );
  }

  @Get('logout')
  async logout(@Req() req: Request) {
    await this.authService.deleteRefreshTokensForUser((req as any).user.sub);
    return {
      message: 'User logged out successfully',
    };
  }
}
