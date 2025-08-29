import User from "../models/User.js";
import Ticket from "../models/Ticket.js";
import bcrypt from "bcrypt";

export const bookTicket = async (req, res) => {
  const photoUrls = req.files.map((file) => file.path);
  const { name, category, description, address } = req.body;

  try {
    const ticket = await Ticket.create({
      customer: {
        name,
        id: req.user._id,
      },
      category,
      description,
      address: JSON.parse(address),
      photos: photoUrls,
      status: "pending",
      charge: "0",
    });

    res.status(200).json(ticket);
  } catch (err) {
    console.log("Book Ticket error:\n", err);
    res.status(500).json({ message: "Error creating ticket" });
  }
};

export const cancelTicket = async (req, res) => {
  const { ticketId } = req.body;

  try {
    const updatedTicket = await Ticket.updateOne(
      { _id: ticketId },
      { $set: { status: "cancelled" } }
    );
    res.status(200).json(updatedTicket);
  } catch (err) {
    console.log("Error updating ticket:\n", err);
    res.status(500).json({ message: "Error updating ticket" });
  }
};

export const getAllTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ "customer.id": req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(tickets);
  } catch (err) {
    console.log("Error in getAllTickets:\n", err);
    res.status(500).json({ message: "Error getting tickets" });
  }
};

export const getAllTicketsAdmin = async (req, res) => {
  try {
    const tickets = await Ticket.find({}).sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (err) {
    console.log("Error in getAllTickets:\n", err);
    res.status(500).json({ message: "Error getting tickets" });
  }
};

export const addWorker = async (req, res) => {
  const { password, ticketId, workerId } = req.body;

  try {
    const currUser = await User.findById(req.user._id);
    if (!currUser) {
      return res.status(400).json({ message: "Current user not found!" });
    }

    const isMatch = await bcrypt.compare(password, currUser.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const currWorker = await User.findById(workerId);
    if (!currWorker) {
      return res.status(400).json({ message: "Worker doesn't exist" });
    }

    const worker = {
      id: workerId,
      name: currWorker.name,
      email: currWorker.email,
      phone: currWorker.phone,
    };

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { $set: { worker: worker, status: "inProgress" } },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ message: "Target ticket not found!" });
    }

    res.status(200).json(updatedTicket);
  } catch (err) {
    console.log("Error in upatingTicket:\n", err);
    res.status(500).json({ message: "Error adding worker" });
  }
};

export const getWorkTickets = async (req, res) => {
  try {
    const userId = req.user._id;

    const tickets = await Ticket.find({
      "worker.id": userId
    }).sort({ createdAt: -1 });

    res.status(200).json(tickets);
  } catch (err) {
    console.log("Error in getWorkTickets:", err);
    res.status(500).json({message:"Error getting wok ticktes"});
  }
};

export const updateAmount = async (req, res) => {
  const {ticketId, charge} = req.body;

  try {
    const newTicket = await Ticket.findByIdAndUpdate(ticketId, {
      $set: {charge, status:"completed"}}, { new: true });

    if (!newTicket) {
      res.status(400).json({message:"Ticket not found"});
    }

    res.status(200).json(newTicket);
  } catch (err) {
    console.log("Error in update amount", err);
    res.status(500).json({message:"Error updating amount"});
  }
}