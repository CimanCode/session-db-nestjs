import { Controller, Get, Post, Request, Res, Render, UseGuards, UseFilters} from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { loginGuard } from './common/guards/login.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Get('/')
  @Render('login')
  index(@Request() req): {message: string} {
    return {message: req.flash('loginError')}
  }

  @UseGuards(loginGuard)
  @Post('/login')
  login(@Res() res: Response) {
    res.redirect('/home');
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/home')
  @Render('home')
  getHome(@Request() req) {
    return {user: req.user};
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('profile')
  getProfile(@Request() req) {
    return {user: req.user}
  }

  @Get('/logout')
  logout(@Request() req, @Res() res: Response) {
    req.logout(() => {
      res.redirect('/');
    });
  }
}
