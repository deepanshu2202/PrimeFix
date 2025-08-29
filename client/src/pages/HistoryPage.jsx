import { useState } from "react";
import "../styles/pages/historypage.css";
import Ticket from "./../components/Ticket";
import { useDispatch, useSelector } from "react-redux";
import { cancelTicket } from "../utils/api";
import { setAllTickets } from "../redux/slice/globalSlice";
import { useEffect } from "react";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const [btnClicked, setBtnClicked] = useState("all");
  const tickets = useSelector((state) => state.global.allTickets);
  const [filteredTickets, setFilteredTickets] = useState(tickets);

  const handleCancelClick = async (e, id) => {
    e.preventDefault();
    try {
      await cancelTicket({ ticketId: id });
      // console.log("New Ticket:", newTicket);
  
      const updatedTickets = Object.values(tickets).flat().map((ticket) => {
        if (ticket._id === id) {
          return { ...ticket, status: "cancelled" }; 
        }
        return ticket;
      });

      // console.log(updatedTickets);
      dispatch(setAllTickets({updatedTickets}));
    } catch (err) {
      console.log("Error cancelling ticket:", err);
    }
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
            handleCancelClick={handleCancelClick}
          />
        })}
      </div>
    </div>
  );
};

export default HistoryPage;
