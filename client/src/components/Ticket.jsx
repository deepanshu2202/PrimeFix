import { useState } from "react";
import "../styles/components/ticket.css";

const Ticket = ({ title, amount, description, status, date }) => {
  const [rootClicked, setRootClicked] = useState(false);

  const handleCancelClick = () => {
    console.log("cancel ticket button clicked!");
  };

  return (
    <div className={`ticket-root ${rootClicked ? "open" : ""}`}>
      <button
        className="ticket-action"
        onClick={() => setRootClicked((p) => !p)}
      >
        {rootClicked ? "less" : "more"}
      </button>
      {rootClicked && (
        <div className={`ticket-details ${rootClicked ? "open" : ""}`}>
          <ul className="customer-details">
            <li>Customer Name</li>
            <li>Address main</li>
            <li>City {"(pincode)"}</li>
            <li>State, Country</li>
            <li>Phone</li>
            <li>Alt Phone</li>
          </ul>
          <ul className="worker-detaills">
            <li>Worker ID</li>
            <li>Worker Name</li>
            <li>Worker Phone</li>
          </ul>
        </div>
      )}
      <div className="ticket-head">
        <h3 className="ticket-title">{title}</h3>
        <h3 className={`ticket-amount ${status}`}>₹{amount}</h3>
      </div>
      <p>{description}</p>
      {rootClicked && (
        <div className="ticket-images-container">
          <span>Img1</span>
          <span>Img2</span>
          <span>Img3</span>
          <span>Img4</span>
        </div>
      )}

      <div className="ticket-footer">
        <span>
        <h3 className={`ticket-status-${status}`}>
          {status}
        </h3>
        {(status === "Pending") && (
          <h3 className="cancel-service-btn" onClick={handleCancelClick}>Cancel Service</h3>
        ) }
        </span>
        <h3 className="ticket-date">{date}</h3>
      </div>
    </div>
  );
};

export default Ticket;
