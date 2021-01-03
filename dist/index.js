"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CrytoJs = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.previousHash = previousHash;
        this.hash = hash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.validateStructure = (block) => typeof block.index === "number" &&
    typeof block.hash === "string" &&
    typeof block.previousHash === "string" &&
    typeof block.data === "string" &&
    typeof block.timestamp === "number";
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CrytoJs.SHA256(index + previousHash + timestamp + data).toString();
const genesisBlock = new Block(0, "2021", "", "Hello", 12345);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimestamp = () => Math.round(new Date().getTime() / 1000);
const getHashforBlock = (block) => Block.calculateBlockHash(block.index, block.previousHash, block.timestamp, block.data);
const createBlock = (data) => {
    // index
    const newIndex = getLatestBlock().index + 1;
    // previous hash
    const previousHash = getLatestBlock().hash;
    // timestamp
    const newTimestamp = getNewTimestamp();
    // hash
    const newHash = Block.calculateBlockHash(newIndex, previousHash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousHash, data, newTimestamp);
    return newBlock;
};
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.validateStructure(candidateBlock)) {
        return false;
    }
    else if (candidateBlock.index !== previousBlock.index + 1) {
        return false;
    }
    else if (candidateBlock.previousHash !== previousBlock.hash) {
        return false;
    }
    else if (candidateBlock.hash !== getHashforBlock(candidateBlock)) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
addBlock(createBlock("hello"));
addBlock(createBlock("world"));
addBlock(createBlock("i'm typescript !"));
console.log(getBlockchain());
//# sourceMappingURL=index.js.map