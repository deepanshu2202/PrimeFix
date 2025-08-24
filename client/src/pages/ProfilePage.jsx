// react
import { useState } from "react";
import "../styles/pages/profilepage.css";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/slice/userSlice";

import { updateProfile } from "../utils/api";
import { toast } from 'react-hot-toast';

const ProfilePage = () => {
  const user = useSelector((state) => state.user);
  const userSavedAddress = user.address;
  const dispatch = useDispatch();

  const [userCity, setUserCity] = useState("");
  const [username, setUsername] = useState("");
  const [userState, setUserState] = useState("");
  const [cityPincode, setCityPincode] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userAltPhoneNumber, setUserAltPhoneNumber] = useState("");

  // functions
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newAddress = {
      main: userAddress || userSavedAddress.main,
      city: userCity || userSavedAddress.city,
      pincode: cityPincode || userSavedAddress.pincode,
      state: userState || userSavedAddress.state,
      country: userCountry || userSavedAddress.country,
      phone: userPhoneNumber || userSavedAddress.phone,
      altPhone: userAltPhoneNumber || userSavedAddress.altPhone,
    }

    try {
      await updateProfile({name: username, address: newAddress});
      dispatch(setUser({name: username, address: newAddress}));
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
      toast.error("Error updating details");
      console.log("Error Updating profile: ", err);
    }
  };

  return (
    <div className="profilepage-root">
      <form onSubmit={handleSubmit}>
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
            Theme maybe
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

          <button type="submit" className="update-btn">
            Update profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;
