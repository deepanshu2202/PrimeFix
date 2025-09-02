import "../styles/pages/customerpage.css";
import { promoteUser } from "../utils/api";
import { useState, useEffect } from "react";
import CustomerItem from "../components/CustomerItem";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../redux/slice/globalSlice";
import ConfirmWindow from '../components/ConfirmWindow';
import { toast } from 'react-hot-toast';

const CustomerPage = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.global.allUsers);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [event, setEvent] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [activeFilterBtn, setActiveFilterBtn] = useState("all");
  const [baseFilteredUsers, setBaseFilteredUsers] = useState(users);
  const [activeInputFilterBtn, setActiveInputFilterBtn] = useState(true);

  const handleActiveFilterBtn = (e) => {
    const val = e.target.getAttribute("val");
    setActiveFilterBtn(val);

    let newFiltered;
    if (val === "all") {
      newFiltered = users;
    } else {
      newFiltered = Object.values(users)
        .flat()
        .filter((user) => user.role === val);
    }

    setBaseFilteredUsers(newFiltered);
    setFilteredUsers(newFiltered);
  };

  const handleUserPromotion = async () => {
    event.preventDefault();
    try {
      await promoteUser({  userId: id, password });

      const updatedUsers = Object.values(users)
        .flat()
        .map((user) => (user._id === id ? { ...user, role: "worker" } : user));

      dispatch(setAllUsers({ updatedUsers }));
      toast.success("user promoted successfully");
    } catch (err) {
      // console.log("Error promoting user!", err);
      toast.error(err.response.data.message);
    } finally {
      setIsOpen(false);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchText(value);

    if (value === "") {
      setFilteredUsers(baseFilteredUsers);
      return;
    }

    setFilteredUsers(
      Object.values(baseFilteredUsers)
        .flat()
        .filter((user) =>
          activeInputFilterBtn
            ? user.name.toLowerCase().includes(value.toLowerCase())
            : user.email.toLowerCase().includes(value.toLowerCase())
        )
    );
  };

  const handlePreUserPromotion = (e, id, password) => {
    setId(id);
    setEvent(e);
    setPassword(password);
    setIsOpen(true);
  }

  useEffect(() => {
    setBaseFilteredUsers(users);
    setFilteredUsers(users);
  }, [users]);

  return (
    <div className="customer-page-root">
      <div className="customer-page-header">
        <h1>MANAGE USERS</h1>
      </div>

      <div className="customer-page-filter-actions">
        <div>
          <h4>Filters: </h4>
          <span
            className={
              activeFilterBtn === "all" ? "customer-page-active-span" : ""
            }
            val="all"
            onClick={handleActiveFilterBtn}
          >
            All
          </span>
          <span
            className={
              activeFilterBtn === "user" ? "customer-page-active-span" : ""
            }
            val="user"
            onClick={handleActiveFilterBtn}
          >
            Users
          </span>
          <span
            className={
              activeFilterBtn === "worker" ? "customer-page-active-span" : ""
            }
            val="worker"
            onClick={handleActiveFilterBtn}
          >
            Workers
          </span>
        </div>

        <div>
          <h4>Search: </h4>
          <button
            className={`customer-page-filter-btn ${
              activeInputFilterBtn ? "active" : ""
            }`}
            onClick={() => setActiveInputFilterBtn(true)}
            style={{ marginLeft: "auto" }}
          >
            Name
          </button>
          <button
            className={`customer-page-filter-btn ${
              !activeInputFilterBtn ? "active" : ""
            }`}
            onClick={() => setActiveInputFilterBtn(false)}
          >
            Email
          </button>
          <input type="text" value={searchText} onChange={handleSearch} />
        </div>
      </div>

      <div className="customer-item-container">
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
              promoteFunction={handlePreUserPromotion}
            />
          ))}
      </div>

      <ConfirmWindow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        message="You sure want to promote this user?"
        confirmFunction={handleUserPromotion}
      />

    </div>
  );
};

export default CustomerPage;
