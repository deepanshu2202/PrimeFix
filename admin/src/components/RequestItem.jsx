import { useState } from "react";
import "../styles/components/requestitem.css";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";

const RequestItem = ({
  id: ticketId,
  title,
  amount,
  description,
  status,
  date,
  customer,
  address,
  worker,
  handleUpdate,
  photos,
}) => {
  const [rootClicked, setRootClicked] = useState(false);

  const postHandleUpdate = () => {
    handleUpdate(ticketId);
  };

  return (
    <div className={`request-item-root ${rootClicked ? "open" : ""}`}>
      <button
        className="request-item-action"
        onClick={() => setRootClicked((p) => !p)}
      >
        {rootClicked ? <IoCaretUp size={16} /> : <IoCaretDown size={16} />}
      </button>
      {rootClicked && (
        <div className={`request-item-details ${rootClicked ? "open" : ""}`}>
          <ul className="customer-details">
            <li>{customer.name}</li>
            <li>{address.main}</li>
            <li>{`${address.city} (${address.pincode})`}</li>
            <li>{`${address.state}, ${address.country}`}</li>
            <li>{address.phone}</li>
            <li>{address.altPhone}</li>
          </ul>
          {(status === "inProgress" || status === "completed") && (
            <ul className="request-item-worker-detaills">
              <li>{worker.name ?? "WorkerName"}</li>
              <li>{worker.email ?? "WorkerEmail"}</li>
              <li>{worker.phone ?? "WorkerPhone"}</li>
              <li>{worker.id ?? "WorkerId"}</li>
            </ul>
          )}
        </div>
      )}
      <div className="request-item-head">
        <h3 className="request-item-title">{title}</h3>
        <h3 className={`request-item-amount ${status}`}>₹{amount}</h3>
      </div>
      <p>{description}</p>
      {rootClicked && (
        <div className="request-item-images-container">
          {photos.map((photo, idx) => (
            <img src={photo} alt="Image" key={idx}/>
          ))}
        </div>
      )}

      <div className="request-item-footer">
        <span>
          <h3 className={`request-item-status-${status}`}>{status === "inProgress" ? "In Progress" : status}</h3>
          {status === "pending" && (
            <h3 className="cancel-service-btn" onClick={postHandleUpdate}>
              <u>Update</u>
            </h3>
          )}
        </span>
        <h3 className="request-item-date">{date}</h3>
      </div>
    </div>
  );
};

export default RequestItem;
