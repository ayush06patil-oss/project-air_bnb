const mongoose = require('mongoose');
const Listing = require("../models/listing.js");
const initData = require("../init/data.js");

main().then(()=>{
    console.log("connected to db");
}).catch((err)=>{
    console.log(err);
});

async function main(){
    await mongoose.connect(process.env.ATLASDB_URL);
}

const initDb= async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'69bb73098678fe03fe5d0216'}));
    await Listing.insertMany(initData.data);
};

initDb();
