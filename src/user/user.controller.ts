import { Body, Controller, Get, Post, Render, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard';
import { user } from './user.entiy';
import { UserService } from './user.service';
import { Response } from 'express';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { loginGuard } from 'src/common/guards/login.guard';
import { Request } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('user')
@UseFilters(AuthExceptionFilter)
export class UserController {
    constructor(private readonly userService: UserService){}

    // @Get()
    // @Render('index')
    // root() {
    //     return {}
    // }

    // @Post()
    // createUser(@Body() request: user){
    //     this.userService.createUser(request);
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
