const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const planetsSchema=new Schema({
     keplerName:{
         type:String,
         required:true,
         index:true,
     }
})

module.exports=mongoose.model('Planet',planetsSchema);