import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  loginAdmin,
} from "../controllers/authControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.post("/login-admin", loginAdmin);
router.get("/me", authMiddleware, getProfile);
router.get("/logout", authMiddleware, logoutUser);
router.put("/me", authMiddleware, updateProfile);

export default router;