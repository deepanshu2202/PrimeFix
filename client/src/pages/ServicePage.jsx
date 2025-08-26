// react
import "../styles/pages/servicepage.css";
import { useEffect, useState } from "react";

// redux
import { useSelector } from "react-redux";

// miscellaneous
import { services } from "../utils/constants";
import { bookTicket } from "../utils/api";

const ServicePage = () => {
  const name = useSelector((state) => state.user.name);
  const userSavedAddress = useSelector((state) => state.user.address);
  const selectedService = useSelector((state) => state.global.selectedService);

  const [userCity, setUserCity] = useState("");
  const [userState, setUserState] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [cityPincode, setCityPincode] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [serviceImages, setServiceImages] = useState(null);
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [userAltPhoneNumber, setUserAltPhoneNumber] = useState("");
  const [serviceType, setServiceType] = useState(
    `${selectedService.id}. ${selectedService.title}`
  );

  // useEffects
  useEffect(() => {
    const setAddress = () => {
      setUserCity(userSavedAddress.city);
      setUserState(userSavedAddress.state);
      setUserAddress(userSavedAddress.main);
      setCityPincode(userSavedAddress.pincode);
      setUserCountry(userSavedAddress.country);
      setUserPhoneNumber(userSavedAddress.phone);
      setUserAltPhoneNumber(userSavedAddress.altPhone);
    };

    const resetAddress = () => {
      setUserCity("");
      setUserState("");
      setUserAddress("");
      setCityPincode("");
      setUserCountry("");
      setUserPhoneNumber("");
      setUserAltPhoneNumber("");
    };

    if (checkbox) {
      setAddress();
    } else {
      resetAddress();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkbox]);

  // functions
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", serviceType);
    formData.append("description", serviceDescription);
    formData.append(
      "address",
      JSON.stringify({
        main: userAddress,
        city: userCity,
        pincode: cityPincode,
        state: userState,
        country: userCountry,
        phone: userPhoneNumber,
        altPhone: userAltPhoneNumber,
      })
    );

    if (serviceImages) {
      for (let i = 0; i < Math.min(serviceImages.length, 6); i++) {
        formData.append("photos", serviceImages[i]);
      }
    }

    try {
      const res = await bookTicket(formData);
      console.log("Successfully booked! Response:\n", res.data);
    } catch (err) {
      console.log("Error service booking:\n", err);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setServiceImages(files);
  };

  return (
    <div className="servicepage-root">
      <form onSubmit={handleFormSubmit}>
        <div className="service-details-container">
          <label className="service-type">
            Type <br />
            <select
              defaultValue={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
            >
              {Object.entries(services).map(([key, value]) => (
                <option key={key} value={`${key}. ${value.title}`}>
                  {`${key}. ${value.title}`}
                </option>
              ))}
            </select>
          </label>

          <label className="service-description">
            Description <br />
            <textarea
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
              placeholder="Please write a detailed description of the problem...."
              required
            />
          </label>

          <label htmlFor="service-images" className="service-image">
            Upload files {"(if needed)"} <br />
            <input
              multiple
              accept="image/*"
              type="file"
              id="service-images"
              onChange={handleImageChange}
            />
          </label>

          <div className="images-preview-container">
            {(serviceImages && serviceImages.length > 0)
              ? serviceImages.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt={`Image number : ${idx + 1}`}
                  />
                ))
              : "No Images"}
          </div>
        </div>

        <div className="service-address-container">
          <label className="address-checkbox">
            <input
              type="checkbox"
              checked={checkbox}
              onChange={(e) => setCheckbox(e.target.checked)}
            />
            use saved address
          </label>

          <label className="user-address">
            H.No/Flat No/Street No/Landmark/Area <br />
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
              required
            />
          </label>

          <div>
            <label className="user-city">
              City <br />
              <input
                type="text"
                value={userCity}
                onChange={(e) => setUserCity(e.target.value)}
                required
              />
            </label>
            <label className="user-city-pincode">
              Pincode <br />
              <input
                type="number"
                value={cityPincode}
                onChange={(e) => setCityPincode(e.target.value)}
                required
              />
            </label>
          </div>

          <div>
            <label className="user-state">
              State <br />
              <input
                type="text"
                value={userState}
                onChange={(e) => setUserState(e.target.value)}
                required
              />
            </label>
            <label className="user-country">
              Country <br />
              <input
                type="text"
                value={userCountry}
                onChange={(e) => setUserCountry(e.target.value)}
                required
              />
            </label>
          </div>

          <label className="user-phone">
            Phone number <br />
            <input
              type="tel"
              value={userPhoneNumber}
              onChange={(e) => setUserPhoneNumber(e.target.value)}
              required
            />
          </label>

          <label className="user-phone-alt">
            Alternate Phone number <br />
            <input
              type="tel"
              value={userAltPhoneNumber}
              onChange={(e) => setUserAltPhoneNumber(e.target.value)}
            />
          </label>

          <button type="submit" className="submit-btn">
            Book Service
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServicePage;
