import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { user } from './user/user.entiy';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';

@Module({
  imports: [ AuthModule,UserModule,
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get('DB_USERNAME'),
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [user],
        synchronize: true,
        autoLoadEntities:true
      }),
     inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
