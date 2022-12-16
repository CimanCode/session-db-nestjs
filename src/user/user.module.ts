import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { user } from './user.entiy';
import { UserService } from './user.service';

@Module({
  imports:[TypeOrmModule.forFeature([user])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
