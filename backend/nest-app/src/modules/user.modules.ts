import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from 'src/interfaces/controllers/user.controller';
import { UsersService } from 'src/usecases/user.interactor';
import { User } from 'src/domain/models/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  exports: [TypeOrmModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}