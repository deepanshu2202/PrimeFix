import { useEffect, useState } from "react";
import "../styles/pages/dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { setAllTickets } from "../redux/slice/globalSlice";
import RequestItem from "./../components/RequestItem";
import CustomerItem from "../components/CustomerItem";
import { addWorker } from "../utils/api";
import { useSocket } from "../context/useSocket";
import { workerAssigned } from './../utils/socket';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.global.allUsers);
  const requests = useSelector((state) => state.global.allTickets);

  const [selectedTicketId, setSelectedTicketId] = useState("");
  const [toggleSearchWorkerName, setToggleSearchWorkerName] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users ?
    Object.values(users)
      .flat()
      .filter((user) => user.role === "worker") : []
  );

  const filteredRequests =
    selectedFilter === ""
      ? requests
      : requests ? Object.values(requests)
          .flat()
          .filter((item) => item.status === selectedFilter) : [];

  const handleUpdate = (ticketId) => {
    setSelectedTicketId(ticketId);
    setIsUpdating(true);
  };

  const handleFilterUsers = (e) => {
    const value = e.target.value;
    setFilteredUsers(
      Object.values(users)
        .flat()
        .filter(
          (user) =>
            (toggleSearchWorkerName
              ? user.name.toLowerCase().includes(value.toLowerCase())
              : user.email.toLowerCase().includes(value.toLowerCase())) &&
            user.role === "worker"
        )
    );
  };

  const handleAddWorker = async (e, id, password) => {
    e.preventDefault();
    const data = {
      password: password,
      ticketId: selectedTicketId,
      workerId: id,
    };

    try {
      const res = await addWorker(data);
      const newTicket = res.data;
      const updatedTickets = Object.values(requests)
        .flat()
        .map((ticket) =>
          ticket._id === newTicket._id ? newTicket : ticket );

      dispatch(setAllTickets({ updatedTickets }));
      setIsUpdating(false);
      workerAssigned(socket, newTicket);
      toast.success("Assigned Successfully");
    } catch (err) {
      // console.log("Ticket Update Error:", err);
      toast.error(err.response.data.message);
    }
  };

  // const handleLog = () => {}

  useEffect(() => {
    setFilteredUsers(
      Object.values(users)
        .flat()
        .filter((user) => user.role === "worker")
    );
  }, [users]);

  return (
    <div className="dashboard-root">
      <div className="dashboard-nav">
        <h1>REQUESTS</h1>
      </div>

      {!isUpdating ? (
        <div className="dashboard-head">
          <h3 className="dash-h3s">Filter: </h3>
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
              selectedFilter === "pending" ? "active-filter-btn" : "filter-btn"
            }
            onClick={() => setSelectedFilter("pending")}
          >
            Pending
          </div>
          <div
            className={
              selectedFilter === "inProgress"
                ? "active-filter-btn"
                : "filter-btn"
            }
            onClick={() => setSelectedFilter("inProgress")}
          >
            In Progress
          </div>
          <div
            className={
              selectedFilter === "completed"
                ? "active-filter-btn"
                : "filter-btn"
            }
            onClick={() => setSelectedFilter("completed")}
          >
            Completed
          </div>
          <div
            className={
              selectedFilter === "cancelled"
                ? "active-filter-btn"
                : "filter-btn"
            }
            onClick={() => setSelectedFilter("cancelled")}
          >
            Cancelled
          </div>

          {/* <div onClick={handleLog}>LOG</div> */}

        </div>
      ) : (
        <div className="dashboard-nav-updating-worker">
          <h3 className="dash-h3s">Filter: </h3>
          <input type="text" onChange={handleFilterUsers} />
          <button
            className={toggleSearchWorkerName ? "active-dash-filter-btn" : ""}
            onClick={() => {
              setToggleSearchWorkerName(true);
            }}
          >
            Name
          </button>
          <button
            className={!toggleSearchWorkerName ? "active-dash-filter-btn" : ""}
            onClick={() => {
              setToggleSearchWorkerName(false);
            }}
          >
            Email
          </button>
          <button
            className="cancel-adding-worker"
            onClick={() => {
              setIsUpdating(false);
              setSelectedTicketId("");
            }}
          >
            Cancel
          </button>
        </div>
      )}

      {isUpdating ? (
        <div className="request-update-container">
          <div className="request-update-container-actions">
            {Object.values(filteredUsers)
              .flat()
              .map((user, idx) => (
                <CustomerItem
                  key={idx}
                  id={user._id}
                  role={user.role}
                  name={user.name}
                  email={user.email}
                  address={user.address}
                  promoteFunction={handleAddWorker}
                  isUpdating={true}
                  onReq={true}
                />
              ))}
          </div>
        </div>
      ) : (
        <div className="request-container">
          {Object.values(filteredRequests)
            .flat()
            .map((request, idx) => {
              // console.log("Idx:", idx, "Item:\n", request);
              return (
                <RequestItem
                  id={request._id}
                  key={idx}
                  title={request.category.split(".")[1]}
                  description={request.description}
                  status={request.status}
                  amount={request.charge}
                  customer={request.customer}
                  handleUpdate={handleUpdate}
                  address={request.address}
                  worker={request.worker}
                  photos={request.photos}
                  date={new Date(request.createdAt).toLocaleString()}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
