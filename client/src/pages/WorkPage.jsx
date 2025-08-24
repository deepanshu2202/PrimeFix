import { useState } from "react";
import "../styles/pages/workpage.css";
import WorkRequestItem from "../components/WorkRequestItem";
import WorkHistoryItem from "../components/WorkHistoryItem";

const WorkPage = () => {
  const [isRequest, setIsRequest] = useState(true);

  return (
    <div className="workpage-root">
      <div className="workpage-head">
        <button
          className={isRequest ? "workpage-active-btn" : ""}
          onClick={() => setIsRequest(true)}
        >
          Request
        </button>
        <button
          className={!isRequest ? "workpage-active-btn" : ""}
          onClick={() => setIsRequest(false)}
        >
          History
        </button>
      </div>
      <div className="workpage-main">
        {isRequest ? (
          <div className="workpage-request-container">
            <WorkRequestItem
              title="Title"
              amount="1200"
              description="Description"
              status="In Progress"
              date="12-08-2025"
              customer={{ 
                CustomerName: "name",
                AddressMain: "address",
                City: "City",
                pincode:"123456",
                State: "State",
                Phone: "1234567890",
                AltPhone: "0123456789"
              }}
            />
          </div>
        ) : (
          <div className="workpage-history-container">
            <WorkHistoryItem
              title="Title"
              amount="1200"
              description="Description"
              status="Completed"
              date="12-08-2025"
              customer={{ 
                CustomerName: "name",
                AddressMain: "address",
                City: "City",
                pincode:"123456",
                State: "State",
                Phone: "1234567890",
                AltPhone: "0123456789"
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkPage;
