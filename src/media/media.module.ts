import { Module, Global } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaRepository } from './media.repository';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([MediaRepository])],
  providers: [MediaService],
  controllers: [MediaController],
  exports: [MediaService],
})
export class MediaModule {}
