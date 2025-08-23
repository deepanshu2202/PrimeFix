import "../styles/components/sidebar.css";
import { useNavigate } from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useState } from "react";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (e) => {
    const val = e.target.getAttribute("val");

    if (val === "dash") navigate("/");
    if (val === "feed") navigate("/feedbacks");
    if (val === "comp") navigate("/complaints");

    setIsOpen(false);
  };

  return (
    <div className={`sidebar-root ${isOpen ? "open" : ""}`}>
      <h2>PrimeFix</h2>
      <div val="dash" onClick={handleNavClick}>
        Requests
      </div>
      <div val="comp" onClick={handleNavClick}>
        Complaints
      </div>
      <div val="feed" onClick={handleNavClick}>
        Feedbacks
      </div>

      <span
        className={`sidebar-icon ${isOpen ? "open" : "close"}`}
        onClick={() => setIsOpen((p) => !p)}
      >
        {isOpen ? (
          <FaAngleDoubleLeft size={36} />
        ) : (
          <FaAngleDoubleRight size={36} />
        )}
      </span>
    </div>
  );
};

export default Sidebar;
