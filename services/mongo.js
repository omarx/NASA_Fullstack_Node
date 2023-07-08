const mongo = require("mongoose");

require ('dotenv').config();

async function mongoConnect(){
await mongo.connect(process.env.MONGO_URL)
    .then(()=>console.log("MongoDB Connected!!"))
    .catch((error)=>console.log("There was an error: ", error));
}

async function mongoDisconnect(){
     await mongo.disconnect();
}
module.exports={
     mongoConnect,
     mongoDisconnect
}