import { useEffect, useState } from "react";
import "../styles/pages/workpage.css";
import WorkRequestItem from "../components/WorkRequestItem";
import WorkHistoryItem from "../components/WorkHistoryItem";
import { useDispatch, useSelector } from "react-redux";
import { updateAmount } from "../utils/api";
import { setWorkTickets } from "../redux/slice/globalSlice";
import { useSocket } from "../context/useSocket";
import { serviceCompleted } from "../utils/socket";
import { toast } from 'react-hot-toast';

const WorkPage = () => {
  const socket = useSocket();
  const dispatch = useDispatch();
  const [workAmount, setWorkAmount] = useState("");
  const [isRequest, setIsRequest] = useState(true);
  const tickets = useSelector((state) => state.global.workTickets);
  const [requests, setRequests] = useState(
    Object.values(tickets)
      .flat()
      .filter((ticket) => ticket.status === "inProgress")
  );

  const updateFunction = async (e, id) => {
    e.preventDefault();
    const data = {
      ticketId: id,
      charge: workAmount,
    };

    try {
      const res = await updateAmount(data);
      const newTicket = res.data;
      // console.log("Updated successfull", newTicket);
      const updatedTickets = Object.values(tickets)
        .flat()
        .map((ticket) => {
          return ticket._id === id ? newTicket : ticket;
        });

      dispatch(setWorkTickets({ updatedTickets }));
      setWorkAmount("");
      serviceCompleted(socket, newTicket);
      toast.success("Updated successfully");
    } catch (err) {
      // console.log(err);
      toast.err(err.response.data.message);
    }
  };

  useEffect(() => {
    setRequests(
      Object.values(tickets)
        .flat()
        .filter((ticket) => ticket.status === "inProgress")
    );
  }, [tickets]);

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
            {Object.values(requests)
              .flat()
              .map((ticket, idx) => (
                <WorkRequestItem
                  key={idx}
                  id={ticket._id}
                  title={ticket.category}
                  amount={ticket.charge}
                  status={ticket.status}
                  worker={ticket.worker}
                  photos={ticket.photos}
                  address={ticket.address}
                  customer={ticket.customer}
                  description={ticket.description}
                  updateFunction={updateFunction}
                  workAmount={workAmount}
                  setWorkAmount={setWorkAmount}
                  date={new Date(ticket.createdAt).toLocaleString()}
                />
              ))}
          </div>
        ) : (
          <div className="workpage-history-container">
            {Object.values(tickets)
              .flat()
              .map((ticket, idx) => (
                <WorkHistoryItem
                  key={idx}
                  id={ticket._id}
                  title={ticket.category}
                  amount={ticket.charge}
                  status={ticket.status}
                  worker={ticket.worker}
                  photos={ticket.photos}
                  address={ticket.address}
                  customer={ticket.customer}
                  description={ticket.description}
                  date={new Date(ticket.createdAt).toLocaleString()}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkPage;
