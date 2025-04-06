import { User } from "../Models/user.modal.js";
import Message from "../Models/messages.modal.js";
import cloudinary from "../lib/cloudinary.js";
import { getRecieiverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js";
export const getAllUsers = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send("getAllUsers error");
    console.log("getAllUsers error", error);
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId },
        { senderId: receiverId, receiverId: myId },
      ],
    });
    res.status(200).send(messages);
  } catch (error) {
    res.status(500).send("getMessages error");
    console.log("getMessages error", error);
  }
};

export const sendMessage = async (req, res) => {
  
  try {
    const { text, image } = req.body;
    const { id:receiverId } = req.params;
    const senderId = req.user._id;
console.log(senderId);

    // if (!text) return res.status(400).send("message is required");

    let imageUrl;
    
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();
    
    const receverSocketId = getRecieiverSocketId(receiverId)

    if(receverSocketId){
      io.to(receverSocketId).emit('newMessage',newMessage)
    }
    res.status(201).send(newMessage);
  } catch (error) {
    res.status(500).send("sendMessage error");
    console.log("sendMessage error", error);
  }
};
