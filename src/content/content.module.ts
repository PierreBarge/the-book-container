import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Content } from './content.entity/content.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content])],
})
export class ContentModule {}
