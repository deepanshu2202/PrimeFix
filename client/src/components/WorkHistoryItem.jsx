import { useState } from "react";
import '../styles/components/workhistoryitem.css';
import { IoCaretUp, IoCaretDown } from "react-icons/io5";

const WorkHistoryItem = ({
  title,
  amount,
  description,
  status,
  date,
  customer,
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
          <ul className="work-history-customer-details">
            <li>{customer.CustomerName}</li>
            <li>{customer.AddressMain}</li>
            <li>{`${customer.City} (${customer.pincode})`}</li>
            <li>{`${customer.State}, ${customer.Country}`}</li>
            <li>{customer.Phone}</li>
            <li>{customer.AltPhone}</li>
          </ul>
          <ul className="work-history-item-worker-details">
            <li>Worker ID</li>
            <li>Worker Name</li>
            <li>Worker Phone</li>
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
          <span>Img1</span>
          <span>Img2</span>
          <span>Img3</span>
          <span>Img4</span>
        </div>
      )}

      <div className="work-history-item-footer">
        <span>
          <h3 className={`work-history-item-status-${status}`}>{status}</h3>
        </span>
        <h3 className="work-history-item-date">{date}</h3>
      </div>
    </div>
  );
};

export default WorkHistoryItem;