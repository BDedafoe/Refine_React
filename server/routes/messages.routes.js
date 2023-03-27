import express from "express";

import {
    createMessage,
    deleteMessage,
    getAllMessages,
    getMessageDetail,
    updateMessage,
} from "../controllers/messages.controller.js";

const router = express.Router();

router.route("/").get(getAllMessages);
router.route("/:id").get(getMessageDetail);
router.route("/").post(createMessage);
router.route("/:id").patch(updateMessage);
router.route("/:id").delete(deleteMessage);

export default router;