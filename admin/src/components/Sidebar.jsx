import "../styles/components/sidebar.css";
import { useNavigate } from "react-router-dom";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";
import { useState } from "react";
import { logoutAdmin } from "../utils/api";
import { toast } from 'react-hot-toast';
import ConfirmWindow from './ConfirmWindow';

const Sidebar = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("dash");
  const [isOpen, setIsOpen] = useState(false);
  const [isWOpen, setWIsOpen] = useState(false);

  const handleNavClick = (e) => {
    const val = e.target.getAttribute("val");
    setActiveLink(val);

    if (val === "dash") navigate("/");
    if (val === "feed") navigate("/feedbacks");
    if (val === "comp") navigate("/complaints");
    if (val === "cust") navigate("/customers");

    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logoutAdmin();
      navigate("/login");
      toast.success("You’re logged out");
    } catch (err) {
      // console.log("Admin Logout Error:\n", err.response.data.message);
      toast.error(err.response.data.message);
    } finally {
      setWIsOpen(false);
    }
  }

  return (
    <div className={`sidebar-root ${isOpen ? "open" : ""}`}>
      <h2>PrimeFix</h2>
      <div className={activeLink === "dash" ? "active-location-link" : ""} val="dash" onClick={handleNavClick}>
        Requests
      </div>
      <div className={activeLink === "comp" ? "active-location-link" : ""} val="comp" onClick={handleNavClick}>
        Complaints
      </div>
      <div className={activeLink === "feed" ? "active-location-link" : ""} val="feed" onClick={handleNavClick}>
        Feedbacks
      </div>
      <div className={activeLink === "cust" ? "active-location-link" : ""} val="cust" onClick={handleNavClick}>
        Customers
      </div>
      <div className="sidebar-logout-btn" onClick={() => setWIsOpen(true)}>
        logout
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

      <ConfirmWindow
        isOpen={isWOpen}
        setIsOpen={setWIsOpen}
        message="Are you sure you want to log out?"
        confirmFunction={handleLogout}
      />
    </div>
  );
};

export default Sidebar;
