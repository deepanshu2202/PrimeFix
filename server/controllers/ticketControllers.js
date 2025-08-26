import Ticket from "../models/Ticket.js";

export const bookTicket = async (req, res) => {
    const photoUrls = req.files.map(file => file.path);
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
        res.status(500).json({message: "Error creating ticket"});
    }
}

export const cancelTicket = async (req, res) => {
    const { ticketId } = req.body;

    try {
        const updatedTicket = await Ticket.updateOne({ _id: ticketId }, {$set:{status: "cancelled"}});
        res.status(200).json(updatedTicket);
    } catch (err) {
        console.log("Error updating ticket:\n", err);
        res.status(500).json({message: "Error updating ticket"});
    }
}

export const getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ "customer.id": req.user._id}).sort({ createdAt: -1 });

        res.status(200).json(tickets);
    } catch (err) {
        console.log("Error in getAllTickets:\n",err);
        res.status(500).json({message: "Error getting tickets"});
    }
}