const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    
    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }
    
    createGenesisBlock(){
        return new Block(0, "01/01/2018", "Genesis block", "0");
    }
    
    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock){
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
}

let daygonCoin = new Blockchain();
daygonCoin.addBlock(new Block(1, "04/02/1989", { data:[
    {
        'home_sale': '$250,000',
        'home_sold': '$247,999'
    }
    ]}));
daygonCoin.addBlock(new Block(2, "05/02/1989", { amount: 14}));
daygonCoin.addBlock(new Block(3, "06/02/1989", { amount: 28}));

console.log(JSON.stringify(daygonCoin, null, 4));