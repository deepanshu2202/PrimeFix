import { useState } from "react";
import "../styles/pages/dashboard.css";
import { requests, customers } from "../utils/constants";
import RequestItem from "./../components/RequestItem";

const Dashboard = () => {
  const [selectedFilter, setSelectedFilter] = useState("");
  const filteredRequests = selectedFilter === "" ? requests : requests.filter((item) => item.status === selectedFilter);

  return (
    <div className="dashboard-root">
      <div className="dashboard-nav">
        <h1>REQUESTS</h1>
      </div>
      <div className="dashboard-head">
        <h3>Filter: </h3>
        <div
          className={
            selectedFilter === "" ? "active-filter-btn" : "filter-btn"
          }
          onClick={() => setSelectedFilter("")}
        >
          All
        </div>
        <div
          className={
            selectedFilter === "Pending" ? "active-filter-btn" : "filter-btn"
          }
          onClick={() => setSelectedFilter("Pending")}
        >
          Pending
        </div>
        <div
          className={
            selectedFilter === "In Progress" ? "active-filter-btn" : "filter-btn"
          }
          onClick={() => setSelectedFilter("In Progress")}
        >
          In Progress
        </div>
        <div
          className={
            selectedFilter === "Completed" ? "active-filter-btn" : "filter-btn"
          }
          onClick={() => setSelectedFilter("Completed")}
        >
          Completed
        </div>
        <div
          className={
            selectedFilter === "Cancelled" ? "active-filter-btn" : "filter-btn"
          }
          onClick={() => setSelectedFilter("Cancelled")}
        >
          Cancelled
        </div>
      </div>
      <div className="request-container">
        {filteredRequests.map((request, idx) => (
          <RequestItem
            id={idx}
            key={idx}
            title={request.title}
            description={request.description}
            status={request.status}
            amount={request.amount}
            date={request.date}
            customer={customers[idx]}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
