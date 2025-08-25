import express from "express";
import {
  getAdmin,
  loginUser,
  logoutUser,
  loginAdmin,
  getProfile,
  logoutAdmin,
  registerUser,
  updateProfile,
} from "../controllers/authControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authMiddlewareAdmin from "../middlewares/authMiddlewareAdmin.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", authMiddleware, getProfile);
router.put("/me", authMiddleware, updateProfile);
router.get("/logout", authMiddleware, logoutUser);

router.post("/login-admin", loginAdmin);
router.get("/me-admin", authMiddlewareAdmin, getAdmin);
router.get("/logout-admin", authMiddlewareAdmin, logoutAdmin);

export default router;