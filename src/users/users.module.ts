import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './entities/users.entity';
import { UserExistsRule } from '../decorators/custom-validator';
import { VerificationEntity } from './entities/verification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, VerificationEntity]),
    AuthModule,
    PassportModule,
  ],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService, UserExistsRule],
  controllers: [UsersController],
})
export class UsersModule {}
