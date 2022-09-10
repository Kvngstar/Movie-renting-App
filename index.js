
const customer = require("./routes/customer")
const genres = require("./routes/genure")
const express = require("express");
const mongoose = require("mongoose");
const app = express();

async function connectMongoDb(){
    try{
        
       await mongoose.connect("mongodb://localhost:27017/Knglystores")
        console.log("connected to DataBase")
        
        
    }
    catch(err){
        console.log(err)
    }
    
    
    
}
connectMongoDb()

app.use(express.json())
app.use("/api/genre",genres)
app.use("/api/customer",customer)

// const Moschema = new mongoose.Schema({
//     name: String,

// })

// const mongModel = mongoose.model("King",Moschema);

// async function newmode(){
//  try{

//      const neww = await mongModel.create({
//          name: "kingsley"
//         })
//         neww.save()
//         console.log(neww)
//     }
//     catch(err){
// console.log("unsucessful")
//     }
//     }
// newmode()
// app.get("/",(req,res)=>{
//     res.send("Hello World")
// })
app.listen(3000,()=>{
    console.log("listening to port 3000")})
