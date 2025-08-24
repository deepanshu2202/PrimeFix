import { useState } from "react";
import '../styles/components/workrequestitem.css';
import { IoCaretUp, IoCaretDown } from "react-icons/io5";

const WorkRequestItem = ({
  title,
  amount,
  description,
  status,
  date,
  customer,
}) => {
  const [workAmount, setWorkAmount] = useState("");
  const [rootClicked, setRootClicked] = useState(false);

  const handleUpdateClick = () => {
    console.log("update button clicked!");
    setRootClicked(true);
  };

  return (
    <div className={`work-request-item-root ${rootClicked ? "open" : ""}`}>
      <button
        className="work-request-item-action"
        onClick={() => setRootClicked((p) => !p)}
      >
        {rootClicked ? <IoCaretUp size={16} /> : <IoCaretDown size={16} />}
      </button>
      {rootClicked && (
        <div className={`work-request-item-details ${rootClicked ? "open" : ""}`}>
          <ul className="work-customer-details">
            <li>{customer.CustomerName}</li>
            <li>{customer.AddressMain}</li>
            <li>{`${customer.City} (${customer.pincode})`}</li>
            <li>{`${customer.State}, ${customer.Country}`}</li>
            <li>{customer.Phone}</li>
            <li>{customer.AltPhone}</li>
          </ul>
          <ul className="work-request-item-worker-detaills">
            <li>Worker ID</li>
            <li>Worker Name</li>
            <li>Worker Phone</li>
          </ul>
        </div>
      )}
      <div className="work-request-item-head">
        <h3 className="work-request-item-title">{title}</h3>
        <h3 className={`work-request-item-amount ${status}`}>₹{amount}</h3>
      </div>
      <p>{description}</p>
      {rootClicked && (
        <div className="work-request-item-images-container">
          <span>Img1</span>
          <span>Img2</span>
          <span>Img3</span>
          <span>Img4</span>
        </div>
      )}

      {rootClicked && status === "In Progress" && (
        <div className="work-update-wrapper">
          <h3 className="work-update-details-heading">Update Details</h3>
          <div className="work-request-update-form">
            <label>
              <h4>Amount:</h4>
              <input
                type="number"
                value={workAmount}
                onChange={(e) => setWorkAmount(e.target.value)}
              />
            </label>
            <button className="work-update-worker-btn" onClick={handleUpdateClick}>
              Update
            </button>
          </div>
        </div>
      )}

      <div className="work-request-item-footer">
        <span>
          <h3 className={`work-request-item-status-${status}`}>{status}</h3>
        </span>
        <h3 className="work-request-item-date">{date}</h3>
      </div>
    </div>
  );
};

export default WorkRequestItem;