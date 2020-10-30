import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IBlock } from './blocks.types';

export type Block = any;
@Injectable()
export class BlocksService {
    constructor(@InjectModel('Block') private blockModel: Model<Block>) {
    }

    async getAllBlocks(): Promise<IBlock[]> {
        const blocks = await this.blockModel.find();

        if (blocks) {
            return blocks;
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'BLOCKS_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async createNewBlock(block: IBlock): Promise<any> {
        if (block.blockType.length) {
            const newBlock = new this.blockModel(block);
            await newBlock.save();
            throw new HttpException({
                status: HttpStatus.CREATED,
                message: 'NEW_BLOCK_SUCCESSFULLY_CREATED',
            }, HttpStatus.CREATED);
        } else {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                message: 'INVALID_BLOCK_TYPE',
            }, HttpStatus.BAD_REQUEST);
        }
    }

    async getBlockById(id: string): Promise<IBlock> {
        const block = await this.blockModel.findById(id).exec();

        if (block) {
            return block;
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'BLOCK_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async updateBlockById(_id: string, updatedBlock: IBlock): Promise<IBlock> {
        const block = await this.blockModel.findOne({ _id });

        if (block) {
            block.blockType = updatedBlock.blockType;
            block.properties = updatedBlock.properties;
            await block.save();
            return block;
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'BLOCK_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }

    async deleteBlockById(_id: string): Promise<IBlock> {
        const block = await this.blockModel.findOne({ _id });

        if (block) {
            await this.blockModel.deleteOne({ _id });
            throw new HttpException({
                status: HttpStatus.OK,
                message: 'BLOCK_SUCCESSFULLY_DELETED',
            }, HttpStatus.OK);
        } else {
            throw new HttpException({
                status: HttpStatus.NOT_FOUND,
                message: 'BLOCK_NOT_FOUND',
            }, HttpStatus.NOT_FOUND);
        }
    }
}
