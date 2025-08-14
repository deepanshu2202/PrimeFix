import "../styles/components/ticket.css";

const Ticket = ({ title, amount, description, status, date }) => {

  const handleTicketClick = () => {
    console.log("root clicked!");
  }

  return (
    <div className="ticket-root" onClick={handleTicketClick}>
      <div className="ticket-head">
        <h3 className="ticket-title">{title}</h3>
        <h3 className={`ticket-amount ${status}`}>₹{amount}</h3>
      </div>
      <p>{description}</p>
      <div className="ticket-footer">
        <h3 className={`ticket-status-${status}`}>{status}</h3>
        <h3 className="ticket-date">{date}</h3>
      </div>
    </div>
  );
};

export default Ticket;
