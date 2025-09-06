import { useState } from "react";
import "../styles/pages/historypage.css";
import Ticket from "./../components/Ticket";
import { useDispatch, useSelector } from "react-redux";
import { cancelTicket } from "../utils/api";
import { setAllTickets } from "../redux/slice/globalSlice";
import { useEffect } from "react";
import { serviceCancelled } from "../utils/socket";
import { useSocket } from './../context/useSocket';
import ConfirmWindow from "../components/ConfirmWindow";
import toast from "react-hot-toast";

const HistoryPage = () => {
  const socket = useSocket();
  const dispatch = useDispatch();

  const [currId, setCurrId] = useState(""); 
  const [event, setEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [btnClicked, setBtnClicked] = useState("all");
  const tickets = useSelector((state) => state.global.allTickets);
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  const handleCancelClick = async () => {
    event.preventDefault();
    try {
      await cancelTicket({ ticketId: currId });
      let cancelledTicket;
  
      const updatedTickets = Object.values(tickets).flat().map((ticket) => {
        if (ticket._id === currId) {
          return cancelledTicket = { ...ticket, status: "cancelled" }; 
        }
        return ticket;
      });

      dispatch(setAllTickets({updatedTickets}));
      serviceCancelled(socket, cancelledTicket);
      toast.success("Service cancelled successfully");
    } catch (err) {
      // console.log("Error cancelling ticket:", err);
      toast.error(err.response.data.message);
    } finally {
      setIsOpen(false);
    }
  }

  const handlePreCancel = (e, id) => {
    setEvent(e);
    setCurrId(id);
    setIsOpen(true);
  }

  useEffect(() => {
    setFilteredTickets(tickets);
  }, [tickets]);

  return (
    <div className="historypage-root">
      <div className="filter-container">
        <p>Filter: </p>
        <button
          className={
            btnClicked === "all" ? "filter-container-active-button" : ""
          }
          onClick={() => {
            setFilteredTickets(tickets);
            setBtnClicked("all");
          }}
        >
          All
        </button>
        <button
          className={
            btnClicked === "pending" ? "filter-container-active-button" : ""
          }
          onClick={() => {
            setFilteredTickets(
              Object.values(tickets).flat().filter((ticket) => ticket.status === "pending")
            );
            setBtnClicked("pending");
          }}
        >
          Pending
        </button>
        <button
          className={
            btnClicked === "inProgress" ? "filter-container-active-button" : ""
          }
          onClick={() => {
            setFilteredTickets(
              Object.values(tickets).flat().filter((ticket) => ticket.status === "inProgress")
            );
            setBtnClicked("inProgress");
          }}
        >
          In Progress
        </button>
        <button
          className={
            btnClicked === "completed" ? "filter-container-active-button" : ""
          }
          onClick={() => {
            setFilteredTickets(
              Object.values(tickets).flat().filter((ticket) => ticket.status === "completed")
            );
            setBtnClicked("completed");
          }}
        >
          Completed
        </button>
        <button
          className={
            btnClicked === "cancelled" ? "filter-container-active-button" : ""
          }
          onClick={() => {
            setFilteredTickets(
              Object.values(tickets).flat().filter((ticket) => ticket.status === "cancelled")
            );
            setBtnClicked("cancelled");
          }}
        >
          Cancelled
        </button>
      </div>
      <div className="ticket-container">
        {Object.values(filteredTickets).flat().map((ticket, idx) => {
          
          return <Ticket
            key={idx}
            id={ticket._id}
            charge={ticket.charge}
            photos={ticket.photos}
            status={ticket.status}
            title={ticket.category}
            address={ticket.address}
            name={ticket.customer.name}
            description={ticket.description}
            date={new Date(ticket.createdAt).toLocaleString()}
            worker={ticket.worker}
            handleCancelClick={handlePreCancel}
          />
        })}
      </div>

      <ConfirmWindow isOpen={isOpen} setIsOpen={setIsOpen} 
        message="Are you sure you want to cancel this service?" 
        confirmFunction={handleCancelClick} 
      />

    </div>
  );
};

export default HistoryPage;
