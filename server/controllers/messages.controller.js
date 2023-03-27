import Messages from "../mongodb/models/messages.js";
import User from "../mongodb/models/user.js";

import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: "dfxeghlgm",
    api_key: "592532158327747",
    api_secret: "a9urzkSLTTf-MOPk775gSHbpnWY"
});

const getAllMessages = async (req, res) => {
    try {
        const users = await Messages.find({}).limit(req.query._end);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMessageDetail = async (req, res) => {
    const { id } = req.params;
    const messageExists = await Messages.findOne({ _id: id }).populate(
        "creator",
    );

    if (messageExists) {
        res.status(200).json(messageExists);
    } else {
        res.status(404).json({ message: "Message not found" });
    }
};

const createMessage = async (req, res) => {
    try {
        const {
            title,
            message,
            email,
        } = req.body;

        const session = await mongoose.startSession();
        session.startTransaction();

        const user = await User.findOne({ email }).session(session);

        if (!user) throw new Error("User not found");

    

        const newMessage = await Messages.create({
            title,
            message,
            creator: user._id,
        });

        user.allMessages.push(newMessage._id);
        await user.save({ session });

        await session.commitTransaction();

        res.status(200).json({ message: "Message created successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateMessage = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, message } =
            req.body;

        await Messages.findByIdAndUpdate(
            { _id: id },
            {
                title,
                message,
           
            },
        );
        res.status(200).json({ message: "Message updated successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteMessage = async (req, res) => {
    let messageToDelete;
    try {
      const { id } = req.params;
      messageToDelete = await Messages.findById({ _id: id }).populate(
        "creator",
    );
  
      if (!messageToDelete) {
        throw new Error('Property not found');
      }
  
      messageToDelete.deleteOne();
      
      res.status(200).json({ message: 'Message deleted successfully', messageToDelete });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

export {
    getAllMessages,
    getMessageDetail,
    createMessage,
    updateMessage,
    deleteMessage,
};