import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
    title: { type: String, required: true },
    message: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
});

const messagesModel = mongoose.model("Messages", MessagesSchema);

export default messagesModel;