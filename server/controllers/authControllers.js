import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "email already taken" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(201)
      .json({ message: "Registered successfully" });
  } catch (err) {
    console.log("Error in registerUser:\n", err);
    res
      .status(500)
      .json({ message: "Registration failed", error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    const token = generateToken(user._id);
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (err) {
    console.log("Error in LoginUser:\n", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  const { name, address } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name && name.trim() !== "") {
      user.name = name.trim();
    }

    if (address) {
      user.address = {
        main: address.main || user.address.main,
        city: address.city || user.address.city,
        pincode: address.pincode || user.address.pincode,
        state: address.state || user.address.state,
        country: address.country || user.address.country,
        phone: address.phone || user.address.phone,
        altPhone: address.altPhone || user.address.altPhone,
      };
    }
    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    console.log("Error in updateProfile:\n", err);
    res
      .status(500)
      .json({ message: "Failed to update profile", error: err.message });
  }
};

export const logoutUser = (req, res) => {
  res
    .clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" })
    .status(200)
    .json({ message: "Logged out successfully" });
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (err) {
    console.log("Error in getProfile:\n");
    res.status(500).json({ message: "Error fetching profile" });
  }
};

// Admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    if (user.role !== "admin")
      return res.status(400).json({ message: "Not authorized" });

    const token = generateToken(user._id);
    res
      .cookie("adminToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (err) {
    console.log("Error in LoginAdmin:\n", err);
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (user.role !== "admin") {
      res.status(400), json({ message: "Not authorized" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.log("Error in getProfile:\n");
    res.status(500).json({ message: "Error fetching profile" });
  }
};

export const logoutAdmin = (req, res) => {
  res
    .clearCookie("adminToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    })
    .status(200)
    .json({ message: "Logged out successfully" });
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.user._id } })
      .select("-password")
      .sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (err) {
    console.log("Error in getAllUsers");
    res.status(500).json({ message: "Error getting users" });
  }
};

export const promoteUser = async (req, res) => {
  const { userId, password } = req.body;

  try {
    const currUser = await User.findById(req.user._id);
    if (!currUser) {
      return res.status(400).json({ message: "Current user not found!" });
    }

    const isMatch = await bcrypt.compare(password, currUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { role: "worker" } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Target user not found!" });
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("Error in promoteUser:\n", err);
    res.status(500).json({ message: "Error promoting user" });
  }
};