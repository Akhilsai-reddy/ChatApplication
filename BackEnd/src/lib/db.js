import mongoose from "mongoose";

export const connectDB = async() =>{
    try{
        await mongoose.connect("mongodb+srv://Akhilsai1:Akhilsai1279@cluster0.i6xte.mongodb.net/chat_db?")
        console.log("connectDB connected")
    }catch(err){
    console.log("connectDB error", err)
    }
}