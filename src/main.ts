import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';

import * as  exphbs from 'express-handlebars';
import * as passport from 'passport';
import flash = require('connect-flash');
import * as session from 'express-session';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const viewpath = join(__dirname, '../public/views');
  app.engine('.hbs', exphbs.engine({extname: '.hbs', defaultLayout: 'main'}))
  app.set('views', viewpath);
  app.set('view engine', '.hbs');

  app.use(
    session({
      secret : 'nest cats',
      resave: false,
      saveUninitialized: false
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
  await app.listen(3000);
}
bootstrap();
