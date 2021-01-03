import * as CrytoJs from 'crypto-js';
class Block {
    
    static validateStructure = (block:Block
        ):boolean => 
        typeof block.index === "number" && 
        typeof block.hash === "string" && 
        typeof block.previousHash === "string" &&
        typeof block.data === "string" &&
        typeof block.timestamp === "number"

    static calculateBlockHash = (index: number, previousHash:string, timestamp: number, data: string
        ): string => CrytoJs.SHA256(index + previousHash + timestamp + data).toString();

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock:Block = new Block(0,"2021", "", "Hello", 12345);

let blockchain: Block[] = [genesisBlock];

const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[ blockchain.length - 1];

const getNewTimestamp = (): number => Math.round(new Date().getTime() / 1000);

const getHashforBlock = (block: Block): string => 
    Block.calculateBlockHash(block.index, block.previousHash, block.timestamp, block.data);

const createBlock = (data:string):Block => {
    // index
    const newIndex: number = getLatestBlock().index + 1;
    
    // previous hash
    const previousHash: string = getLatestBlock().hash;
    
    // timestamp
    const newTimestamp:number = getNewTimestamp();

    // hash
    const newHash: string = Block.calculateBlockHash(newIndex, previousHash, newTimestamp, data);
    
    const newBlock: Block = new Block(newIndex, newHash, previousHash, data, newTimestamp);

    
    return newBlock;
}

const isBlockValid = (candidateBlock:Block , previousBlock:Block):boolean => {
    if(!Block.validateStructure(candidateBlock)) {
        return false;
    } else if (candidateBlock.index !== previousBlock.index + 1) {
        return false;
    } else if (candidateBlock.previousHash !== previousBlock.hash) {
        return false;
    } else if (candidateBlock.hash !== getHashforBlock(candidateBlock)) {
        return false;
    } else {
        return true;
    }
}

const addBlock = (candidateBlock:Block): void => {
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockchain.push(candidateBlock);
    }
}

addBlock(createBlock("hello"));
addBlock(createBlock("world"));
addBlock(createBlock("i'm typescript !"));

console.log(getBlockchain());

export {};