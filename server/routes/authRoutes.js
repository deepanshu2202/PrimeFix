import express from "express";
import {
  getAdmin,
  loginUser,
  logoutUser,
  loginAdmin,
  getProfile,
  logoutAdmin,
  getAllUsers,
  promoteUser,
  registerUser,
  updateProfile,
  updatePassword
} from "../controllers/authControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import authMiddlewareAdmin from "../middlewares/authMiddlewareAdmin.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);
router.get("/me", authMiddleware, getProfile);
router.put("/me", authMiddleware, updateProfile);
router.get("/logout", authMiddleware, logoutUser);
router.put("/pass", authMiddleware, updatePassword);

router.post("/login-admin", loginAdmin);
router.get("/me-admin", authMiddlewareAdmin, getAdmin);
router.get("/users-admin", authMiddlewareAdmin, getAllUsers);
router.get("/logout-admin", authMiddlewareAdmin, logoutAdmin);
router.put("/promote-admin", authMiddlewareAdmin, promoteUser);

export default router;