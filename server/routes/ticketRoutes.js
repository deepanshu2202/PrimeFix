import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authMiddlewareAdmin from "../middlewares/authMiddlewareAdmin.js";
import {
  bookTicket,
  getAllTickets,
  cancelTicket,
  addWorker,
  getAllTicketsAdmin,
  getWorkTickets,
  updateAmount,
} from "../controllers/ticketControllers.js";

const router = express.Router();

router.get("/get", authMiddleware, getAllTickets);
router.put("/cancel", authMiddleware, cancelTicket);
router.put("/amount", authMiddleware, updateAmount);
router.get("/getwork", authMiddleware, getWorkTickets);
router.post("/book", authMiddleware, upload.array("photos", 6), bookTicket);

router.get("/get-admin", authMiddlewareAdmin, getAllTicketsAdmin);
router.put("/add-worker-admin", authMiddlewareAdmin, addWorker);

export default router;
