// react
import "../styles/components/navbar.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// icons
import { GiHamburgerMenu } from "react-icons/gi";
import ConfirmWindow from "./ConfirmWindow";
import { logoutUser } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { resetUser } from "../redux/slice/userSlice";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const role = useSelector((state) => state.user.role);
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
  const handleLogoutClick = async (e) => {
    e.preventDefault();
    await logoutUser();
    setIsOpen(false);
    dispatch(resetUser());
    navigate("/login");
    toast.success("You’re logged out");
  };

  // const handleLog = () => {}

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
          {/* <div onClick={handleLog}>log</div> */}
          <div
            className={
              window.location.pathname === "/" ? "active-window-btn" : ""
            }
            onClick={() => navigate("/")}
          >
            Home
          </div>
          <div
            className={
              window.location.pathname === "/service" ? "active-window-btn" : ""
            }
            onClick={() => navigate("/service")}
          >
            Services
          </div>
          <div
            className={
              window.location.pathname === "/history" ? "active-window-btn" : ""
            }
            onClick={() => navigate("/history")}
          >
            History
          </div>
          {(role === "admin" || role === "worker") && (
            <div
              className={
                window.location.pathname === "/work" ? "active-window-btn" : ""
              }
              onClick={() => navigate("/work")}
            >
              Work
            </div>
          )}
          <div onClick={() => setProfileClick((prev) => !prev)}>Profile</div>
        </div>
      )}

      <div className={`nav-actions-mobile ${sidebarIsOpen ? "open" : ""}`}>
        <div className="nav-open-icon">
          <GiHamburgerMenu
            size={32}
            className="nav-real-icon"
            onClick={() => setSideBarIsOpen(false)}
          />
        </div>
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
          {(role === "admin" || role === "worker") && (
            <div
              className="nav-action-mobile-btn"
              onClick={() => navigate("/work")}
            >
              Work
            </div>
          )}
          <div
            className="nav-action-mobile-btn"
            onClick={() => navigate("/profile")}
          >
            Profile
          </div>
        </div>
        <div className="mobile-logout-btn" onClick={() => setIsOpen(true)}>
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
          <div onClick={() => setIsOpen(true)}>logout</div>
        </div>
      )}

      <ConfirmWindow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        message="Are you sure you want to log out?"
        confirmFunction={handleLogoutClick}
      />
    </div>
  );
};

export default Navbar;
