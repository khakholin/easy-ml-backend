import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { BlocksService } from './blocks.service';
import { IBlock } from './blocks.types';

@Controller('blocks')
export class BlocksController {
    constructor(
        private blocksService: BlocksService,
    ) { }

    @Get()
    async getAllBlocks() {
        return this.blocksService.getAllBlocks();
    }

    @Post()
    async createNewBlock(@Body() body: IBlock) {
        return this.blocksService.createNewBlock(body);
    }

    @Get(':id')
    async getBlockById(@Param('id') id) {
        return this.blocksService.getBlockById(id);
    }

    @Put(':id')
    async updateBlockById(@Param('id') id, @Body() body: IBlock) {
        return this.blocksService.updateBlockById(id, body);
    }

    @Delete(':id')
    async deleteBlockById(@Param('id') id) {
        return this.blocksService.deleteBlockById(id);
    }
}
