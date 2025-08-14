// react
import "../styles/components/navbar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// icons
import { GiHamburgerMenu } from "react-icons/gi";

// redux
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const [sidebarIsOpen, setSideBarIsOpen] = useState(false);
  const [onMobile, setOnMobile] = useState(window.innerWidth < 540);
  const selectedService = useSelector((state) => state.global.selectedService);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 580);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setOnMobile(width < 540);

      if (width >= 540) {
        setSideBarIsOpen(false);
      } else {
        setProfileClick(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLog = () => {
    console.log("Id : ", selectedService);
  };

  const handleLogoutClick = () => {
    console.log("Logging out...");
  };

  return (
    <div className={`nav-root ${scrolled ? "scrolled" : ""}`}>
      <h3>PrimeFix</h3>
      {onMobile ? (
        <div
          className="sidebar-toggle"
          onClick={() => setSideBarIsOpen((prev) => !prev)}
        >
          <GiHamburgerMenu size={32} />
        </div>
      ) : (
        <div className="nav-actions">
          <div onClick={handleLog}>log</div>
          <div onClick={() => navigate("/")}>Home</div>
          <div onClick={() => navigate("/service")}>Service</div>
          <div onClick={() => navigate("/history")}>History</div>
          <div onClick={() => setProfileClick((prev) => !prev)}>Profile</div>
        </div>
      )}

      <div className={`nav-actions-mobile ${sidebarIsOpen ? "open" : ""}`}>
        <div>
          <div className="nav-action-mobile-btn">Theme</div>
          <div className="nav-action-mobile-btn" onClick={() => navigate("/")}>Home</div>
          <div className="nav-action-mobile-btn" onClick={() => navigate("/service")}>Service</div>
          <div className="nav-action-mobile-btn" onClick={() => navigate("/history")}>History</div>
          <div className="nav-action-mobile-btn" onClick={() => navigate("/profile")}>Profile</div>
        </div>
        <div className="mobile-logout-btn" onClick={handleLogoutClick}>Logout</div>
      </div>

      {profileClick && (
        <div className={`profile-menu ${profileClick ? "open" : ""}`}>
          <div onClick={() => navigate("/profile")}>Edit profile</div>
          <div onClick={handleLogoutClick}>logout</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
