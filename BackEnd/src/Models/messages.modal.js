import mongoose from "mongoose";

const messagesScheema = mongoose.Schema({
    senderId:{
     type:mongoose.Schema.Types.ObjectId,
     require:true,
     ref:"User"
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
       },

       text:{
        type:String,
       },
       image:{
        type:String,
       }
}
,{timestamps:true}
);

const Message = mongoose.model("messages",messagesScheema);

export default Message;