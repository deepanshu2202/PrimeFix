import { useState } from "react";
import '../styles/components/workrequestitem.css';
import { IoCaretUp, IoCaretDown } from "react-icons/io5";

const WorkRequestItem = ({
  id,
  date,
  title,
  amount,
  status,
  worker,
  photos,
  address,
  customer,
  description,
  updateFunction,
  workAmount,
  setWorkAmount,
}) => {
  const [rootClicked, setRootClicked] = useState(false);

  const handleUpdateClick = async (e) => {
    console.log("update button clicked!");
    setRootClicked(true);
    await updateFunction(e, id);
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
      <div className="work-request-item-head">
        <h3 className="work-request-item-title">{title}</h3>
        <h3 className={`work-request-item-amount ${status}`}>₹{amount}</h3>
      </div>
      <p>{description}</p>
      {rootClicked && (
        <div className="work-request-item-images-container">
          {photos.map((photo, idx) => (
            <img src={photo} alt="Image" key={idx} />
          ))}
        </div>
      )}

      {rootClicked && status === "inProgress" && (
        <div className="work-update-wrapper">
          <h3 className="work-update-details-heading">Update Amount</h3>
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
          <h3 className={`work-request-item-status-${status}`}>{status === "inProgress" ? "In Progress" : status}</h3>
        </span>
        <h3 className="work-request-item-date">{date}</h3>
      </div>
    </div>
  );
};

export default WorkRequestItem;