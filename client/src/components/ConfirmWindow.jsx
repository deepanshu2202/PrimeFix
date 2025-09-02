import "../styles/components/confirmwindow.css";

const ConfirmWindow = ({ isOpen, setIsOpen, message, confirmFunction }) => {
  return (
    <div className={`confirm-window-root ${isOpen ? "open" : ""}`}>
      <div className="window-container">
        <p>{message}</p>
        <div className="confirm-window-actions">
          <button
            className="cancel-window-btn"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button className="confirm-window-btn" onClick={confirmFunction}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmWindow;
