// react
import { useState } from "react";
import "../styles/pages/profilepage.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slice/userSlice";

import { updatePassword, updateProfile } from "../utils/api";
import { toast } from "react-hot-toast";
import ConfirmWindow from "../components/ConfirmWindow";

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const userSavedAddress = user.address;
  const dispatch = useDispatch();

  const [event, setEvent] = useState(null);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [userCity, setUserCity] = useState("");
  const [username, setUsername] = useState("");
  const [userState, setUserState] = useState("");
  const [cityPincode, setCityPincode] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [passChanging, setPassChanging] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userAltPhoneNumber, setUserAltPhoneNumber] = useState("");

  // functions
  const handleSubmit = async () => {
    event.preventDefault();

    const newAddress = {
      city: userCity || userSavedAddress.city,
      main: userAddress || userSavedAddress.main,
      state: userState || userSavedAddress.state,
      country: userCountry || userSavedAddress.country,
      phone: userPhoneNumber || userSavedAddress.phone,
      pincode: cityPincode || userSavedAddress.pincode,
      altPhone: userAltPhoneNumber || userSavedAddress.altPhone,
    };

    try {
      await updateProfile({ name: username, address: newAddress });
      dispatch(setUser({ name: username, address: newAddress }));
      toast.success("Details updated successfully");
      setUserCity("");
      setUserState("");
      setUsername("");
      setCityPincode("");
      setUserAddress("");
      setUserCountry("");
      setUserPhoneNumber("");
      setUserAltPhoneNumber("");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setIsOpen(false);
    }
  };

  const handleFormSubmit = (e) => {
    setIsOpen(true);
    setEvent(e);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPass.length < 6) {
      toast.error("Password should atleast contain 6 characters");
      return;
    }

    const data = {oldPass, newPass}
    try {
      await updatePassword(data);
      toast.success("Password changed successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      setPassChanging(false);
    }
  }

  return (
    <div className="profilepage-root">
      <div className="form-div">
        <div className="profile-details-container">
          <h1>Personal Details</h1>
          <label className="profile-name">
            Username <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={user.name}
            />
          </label>

          <label className="profile-email">
            Email <br />
            <input type="text" value={user.email} readOnly />
          </label>

          <div className="profile-empty-space">
            {!passChanging ? (
              <button
                className="change-pass-opener"
                onClick={() => setPassChanging(true)}
              >
                Change password
              </button>
            ) : (
              <div className="change-pass-container">
                <input type="password" placeholder="Enter Old Password" onChange={(e) => setOldPass(e.target.value)}/>
                <input type="password" placeholder="Enter New Password" onChange={(e) => setNewPass(e.target.value)}/>
                <div className="change-pass-container-actions">
                  <button onClick={handlePasswordChange}>Change</button>
                  <button onClick={() => setPassChanging(false)}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="profile-address-container">
          <h1>Address</h1>

          <label className="profile-address">
            H.No/Flat No/Street No/Landmark/Area <br />
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              placeholder={userSavedAddress.main}
            />
          </label>

          <div>
            <label className="profile-city">
              City <br />
              <input
                type="text"
                value={userCity}
                onChange={(e) => setUserCity(e.target.value)}
                placeholder={userSavedAddress.city}
              />
            </label>
            <label className="profile-city-pincode">
              Pincode <br />
              <input
                type="number"
                value={cityPincode}
                onChange={(e) => setCityPincode(e.target.value)}
                placeholder={userSavedAddress.pincode}
              />
            </label>
          </div>

          <div>
            <label className="profile-state">
              State <br />
              <input
                type="text"
                value={userState}
                onChange={(e) => setUserState(e.target.value)}
                placeholder={userSavedAddress.state}
              />
            </label>
            <label className="profile-country">
              Country <br />
              <input
                type="text"
                value={userCountry}
                onChange={(e) => setUserCountry(e.target.value)}
                placeholder={userSavedAddress.country}
              />
            </label>
          </div>

          <label className="profile-phone">
            Phone number <br />
            <input
              type="tel"
              value={userPhoneNumber}
              onChange={(e) => setUserPhoneNumber(e.target.value)}
              placeholder={userSavedAddress.phone}
            />
          </label>

          <label className="profile-phone-alt">
            Alternate Phone number <br />
            <input
              type="tel"
              value={userAltPhoneNumber}
              onChange={(e) => setUserAltPhoneNumber(e.target.value)}
              placeholder={userSavedAddress.altPhone}
            />
          </label>

          <span className="update-btn" onClick={handleFormSubmit}>
            Update profile
          </span>
        </div>
        <ConfirmWindow
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          message="Do you want to save the changes to your profile?"
          confirmFunction={handleSubmit}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
