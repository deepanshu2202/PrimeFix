import { useState } from "react";
import "../styles/components/customeritem.css";

const CustomerItem = ({ id, role, name, email, address, promoteFunction, isUpdating, onReq }) => {
  const [password, setPassword] = useState("");
  const [isPromoting, setIsPromoting] = useState(true);

  const handleSubmit = (e) => {
    setPassword(""); 
    promoteFunction(e, id, password, name, email, address);
  }

  return (
    <div className="customer-item-root">
      <ul className="customer-item-details">
        <li>{name ?? "Name"}</li>
        <li>{email ?? "Email"}</li>
        {!onReq && <li
          className={`customer-item-role ${role}`}
        >{`(${role.toUpperCase()})`}</li>}
        {(role === "user" || isUpdating) && (isPromoting ? (
          <li
            className="customer-item-promote-btn"
            onClick={() => setIsPromoting((p) => !p)}
          >
            {!isUpdating ? "Promote" : "Add"}
          </li>
        ) : (
          <li className="customer-item-promote-input">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSubmit}>
              submit
            </button>
            <button onClick={() => setIsPromoting((p) => !p)}>cancel</button>
          </li>
        ))}
      </ul>
      <ul className="customer-item-address">
        <li>{address.main || ""}</li>
        <li>{`${address.city || ""} (${address.pincode || ""})`}</li>
        <li>{`${address.state || ""}, ${address.country || ""}`}</li>
        <li>{address.phone || ""}</li>
        <li>{address.altPhone || ""}</li>
      </ul>
    </div>
  );
};

export default CustomerItem;
