import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlocksController } from './blocks/blocks.controller';
import { BlockSchema } from './blocks/schemas/blocks.schema';
import { BlocksService } from './blocks/blocks.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/easy-ml'),
    MongooseModule.forFeature([{ name: 'Block', schema: BlockSchema }]),
  ],
  controllers: [
    AppController,
    BlocksController,
  ],
  providers: [
    AppService,
    BlocksService,
  ],
})
export class AppModule { }
