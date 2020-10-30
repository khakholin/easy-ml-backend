export interface IProperty {
    alias: string,
    default: number,
    name: string,
};

export interface IBlock {
    _id?: string,
    blockType: string,
    properties: IProperty[],
};
