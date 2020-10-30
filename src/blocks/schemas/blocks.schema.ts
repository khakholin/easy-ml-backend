import * as mongoose from 'mongoose';

export const BlockSchema = new mongoose.Schema({
    blockType: String,
    properties: [
        {
            alias: String,
            default: Number,
            name: String,
        },
    ],
});