// react
import "../styles/components/navbar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// icons
import { GiHamburgerMenu } from "react-icons/gi";
import ConfirmWindow from "./ConfirmWindow";

const Navbar = () => {
  
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false); // testing
  const [profileClick, setProfileClick] = useState(false);
  const [sidebarIsOpen, setSideBarIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(window.scrollY > 580);
  const [onMobile, setOnMobile] = useState(window.innerWidth < 540);


  // useEffects
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

  // functions
  const handleLogoutClick = () => {
    console.log("Logging out...");
  };

  const handleLog = () => {
    console.log("log clicked!");
  };

  // testing
  const handleConfirmClick = () => {
    console.log("Confirm clicked!");
    setIsOpen(false);
  }

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
          <div onClick={() => navigate("/service")}>Services</div>
          <div onClick={() => navigate("/history")}>History</div>
          <div onClick={() => navigate('/work')}>Work</div>
          <div onClick={() => setProfileClick((prev) => !prev)}>Profile</div>
        </div>
      )}

      <div className={`nav-actions-mobile ${sidebarIsOpen ? "open" : ""}`}>
        <div>
          <div className="nav-action-mobile-btn" onClick={() => navigate("/")}>
            Home
          </div>
          <div
            className="nav-action-mobile-btn"
            onClick={() => navigate("/service")}
          >
            Service
          </div>
          <div
            className="nav-action-mobile-btn"
            onClick={() => navigate("/history")}
          >
            History
          </div>
          <div
            className="nav-action-mobile-btn"
            onClick={() => navigate("/profile")}
          >
            Profile
          </div>
        </div>
        <div className="mobile-logout-btn" onClick={handleLogoutClick}>
          Logout
        </div>
      </div>

      {profileClick && (
        <div className={`profile-menu ${profileClick ? "open" : ""}`}>
          <div
            onClick={() => {
              navigate("/profile");
              setProfileClick(false);
            }}
          >
            Edit profile
          </div>
          <div onClick={handleLogoutClick}>logout</div>
        </div>
      )}

      {/* testing */}
      <ConfirmWindow isOpen={isOpen} setIsOpen={setIsOpen} message="on navbar" confirmFunction={handleConfirmClick} />
    </div>
  );
};

export default Navbar;
