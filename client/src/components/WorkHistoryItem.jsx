import { useState } from "react";
import '../styles/components/workhistoryitem.css';
import { IoCaretUp, IoCaretDown } from "react-icons/io5";

const WorkHistoryItem = ({
  date,
  title,
  amount,
  status,
  worker,
  photos,
  address,
  customer,
  description,
}) => {
  const [rootClicked, setRootClicked] = useState(false);

  return (
    <div className={`work-history-item-root ${rootClicked ? "open" : ""}`}>
      <button
        className="work-history-item-action"
        onClick={() => setRootClicked((p) => !p)}
      >
        {rootClicked ? <IoCaretUp size={16} /> : <IoCaretDown size={16} />}
      </button>
      {rootClicked && (
        <div className={`work-history-item-details ${rootClicked ? "open" : ""}`}>
          <ul className="work-customer-details">
            <li>{customer.name}</li>
            <li>{address.main}</li>
            <li>{`${address.city} (${address.pincode})`}</li>
            <li>{`${address.state}, ${address.country}`}</li>
            <li>{address.phone}</li>
            <li>{address.altPhone}</li>
          </ul>
          <ul className="work-request-item-worker-detaills">
            <li>{worker.name}</li>
            <li>{worker.email}</li>
            <li>{worker.phone ?? "Phone"}</li>
          </ul>
        </div>
      )}
      <div className="work-history-item-head">
        <h3 className="work-history-item-title">{title}</h3>
        <h3 className={`work-history-item-amount ${status}`}>₹{amount}</h3>
      </div>
      <p>{description}</p>
      {rootClicked && (
        <div className="work-history-item-images-container">
          {photos.map((photo, idx) => (
            <img src={photo} alt="Image" key={idx} />
          ))}
        </div>
      )}

      <div className="work-history-item-footer">
        <span>
          <h3 className={`work-history-item-status-${status}`}>{status === "inProgress" ? "In Progress" : status}</h3>
        </span>
        <h3 className="work-history-item-date">{date}</h3>
      </div>
    </div>
  );
};

export default WorkHistoryItem;