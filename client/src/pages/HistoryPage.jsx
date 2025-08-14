import { useState } from "react";
import "../styles/pages/historypage.css";
import { tickets } from "../utils/constants";
import Ticket from "./../components/Ticket";

const HistoryPage = () => {
  const [btnClicked, setBtnClicked] = useState("all");
  const [filteredTickets, setFilteredTickets] = useState(tickets);

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
              tickets.filter((ticket) => ticket.status === "Pending")
            );
            setBtnClicked("pending");
          }}
        >
          Pending
        </button>
        <button
          className={
            btnClicked === "completed" ? "filter-container-active-button" : ""
          }
          onClick={() => {
            setFilteredTickets(
              tickets.filter((ticket) => ticket.status === "Completed")
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
              tickets.filter((ticket) => ticket.status === "Cancelled")
            );
            setBtnClicked("cancelled");
          }}
        >
          Cancelled
        </button>
      </div>
      <div className="ticket-container">
        {filteredTickets.map((ticket, idx) => (
          <Ticket
            id={idx}
            key={idx}
            title={ticket.title}
            description={ticket.description}
            status={ticket.status}
            amount={ticket.amount}
            date={ticket.date}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
