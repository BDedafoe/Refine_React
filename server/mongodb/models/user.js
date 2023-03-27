import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: true },
    allProperties: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
    allMessages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Messages" }],
});

const userModel = mongoose.model("User", UserSchema);

export default userModel;