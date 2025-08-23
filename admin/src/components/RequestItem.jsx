import { useState } from "react";
import "../styles/components/requestitem.css";
import { IoCaretUp, IoCaretDown } from "react-icons/io5";

const RequestItem = ({ title, amount, description, status, date, customer }) => {
  const [workerId, setWorkerId] = useState("");
  const [workerName, setWorkerName] = useState("");
  const [workerPhone, setWorkerPhone] = useState("");
  const [rootClicked, setRootClicked] = useState(false);

  const handleUpdateClick = () => {
    console.log("update button clicked!");
    setRootClicked(true);
  };

  return (
    <div className={`request-item-root ${rootClicked ? "open" : ""}`}>
      <button
        className="request-item-action"
        onClick={() => setRootClicked((p) => !p)}
      >
        {rootClicked ? <IoCaretUp size={16}/> : <IoCaretDown size={16}/>}
      </button>
      {rootClicked && (
        <div className={`request-item-details ${rootClicked ? "open" : ""}`}>
          <ul className="customer-details">
            <li>{customer.CustomerName}</li>
            <li>{customer.AddressMain}</li>
            <li>{`${customer.City} (${customer.pincode})`}</li>
            <li>{`${customer.State}, ${customer.Country}`}</li>
            <li>{customer.Phone}</li>
            <li>{customer.AltPhone}</li>
          </ul>
          <ul className="request-item-worker-detaills">
            <li>Worker ID: {workerId}</li>
            <li>Worker Name: {workerName}</li>
            <li>Worker Phone: {workerPhone}</li>
          </ul>
        </div>
      )}
      <div className="request-item-head">
        <h3 className="request-item-title">{title}</h3>
        <h3 className={`request-item-amount ${status}`}>₹{amount}</h3>
      </div>
      <p>{description}</p>
      {rootClicked && (
        <div className="request-item-images-container">
          <span>Img1</span>
          <span>Img2</span>
          <span>Img3</span>
          <span>Img4</span>
        </div>
      )}

      {rootClicked && status === "Pending" && (
        <div className="update-wrapper">
        <h3 className="update-details-heading">Update Worker Details</h3>
        <div className="request-update-form">

          <label>
            <h4>Worker ID:</h4>
            <input type="text" value={workerId} onChange={(e) => setWorkerId(e.target.value)}/>
          </label>
          <label>
            <h4>Worker Name:</h4>
            <input type="text" value={workerName} onChange={(e) => setWorkerName(e.target.value)}/>
          </label>
          <label>
            <h4>Worker Phone:</h4>
            <input type="number" value={workerPhone} onChange={(e) => setWorkerPhone(e.target.value)}/>
          </label>
          <button className="update-worker-btn" onClick={handleUpdateClick}>Update</button>
        </div>
        </div>
      )}

      <div className="request-item-footer">
        <span>
          <h3 className={`request-item-status-${status}`}>{status}</h3>
          {/* {status === "Pending" && (
            <h3 className="cancel-service-btn" onClick={handleUpdateClick}>
              <u>Update</u>
            </h3>
          )} */}
        </span>
        <h3 className="request-item-date">{date}</h3>
      </div>
    </div>
  );
};

export default RequestItem;
