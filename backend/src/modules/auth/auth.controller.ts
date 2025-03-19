import { cookieName, TOKEN_TYPE } from '@/modules/auth/auth.const';
import { AuthService } from '@/modules/auth/auth.service';
import { FastifyRequestWithUser } from '@/modules/auth/auth.types';
import { LocalAuthGuard } from '@/modules/auth/guards/local-auth.guard';
import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Req() request: FastifyRequestWithUser,
    @Res({ passthrough: true }) response: FastifyReply,
  ) {
    console.log(request);
    const tokens = await this.authService.login(request);
    response.setCookie(cookieName[TOKEN_TYPE.Access], tokens?.accessToken ?? '', {
      httpOnly: true,
    });
  }
}
