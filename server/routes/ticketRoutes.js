import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { bookTicket, getAllTickets, cancelTicket } from "../controllers/ticketControllers.js";

const router = express.Router();

router.get("/get", authMiddleware, getAllTickets);
router.put('/cancel', authMiddleware, cancelTicket);
router.post("/book", authMiddleware, upload.array("photos", 6), bookTicket);

export default router;
