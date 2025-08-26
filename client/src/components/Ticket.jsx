import { useState } from "react";
import "../styles/components/ticket.css";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";

const Ticket = ({
  id,
  name,
  date,
  title,
  worker,
  photos,
  status,
  amount: charge,
  address,
  description,
  handleCancelClick,
}) => {
  const [rootClicked, setRootClicked] = useState(false);

  return (
    <div className={`ticket-root ${rootClicked ? "open" : ""}`}>
      <button
        className="ticket-action"
        onClick={() => setRootClicked((p) => !p)}
      >
        {rootClicked ? <IoCaretUp size={16} /> : <IoCaretDown size={16} />}
      </button>
      {rootClicked && (
        <div className={`ticket-details ${rootClicked ? "open" : ""}`}>
          <ul className="customer-details">
            <li>{name}</li>
            <li>{address.main}</li>
            <li>{`${address.city} (${address.pincode})`}</li>
            <li>
              {address.state}, {address.country}
            </li>
            <li>{address.phone}</li>
            <li>{address.altPhone || "-"}</li>
          </ul>
          {worker ? (
            <ul className="worker-detaills">
              <li>Worker ID</li>
              <li>Worker Name</li>
              <li>Worker Phone</li>
            </ul>
          ) : (
            <p>Pending Assignment</p>
          )}
        </div>
      )}
      <div className="ticket-head">
        <h3 className="ticket-title">{title.split(".")[1]}</h3>
        <h3 className={`ticket-amount Completed`}>
          {(charge === undefined || charge === "0") ? "" : `₹${charge}`}
        </h3>
      </div>
      <p>{description}</p>
      {rootClicked && (
        <div className="ticket-images-container">
          {photos.map((item, idx) => {
            return <img key={idx} src={item} alt="Image" />;
          })}
        </div>
      )}

      <div className="ticket-footer">
        <span>
          <h3 className={`ticket-status-${status}`}>{status}</h3>
          {status === "pending" && (
            <h3 className="cancel-service-btn" onClick={(e) => handleCancelClick(e, id)}>
              <u>Cancel</u>
            </h3>
          )}
        </span>
        <h3 className="ticket-date">{date}</h3>
      </div>
    </div>
  );
};

export default Ticket;
