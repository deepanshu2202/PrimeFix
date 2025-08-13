import "../styles/pages/servicepage.css";
import { useState } from "react";

const ServicePage = () => {
  const [userCity, setUserCity] = useState("");
  const [userState, setUserState] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [serviceType, setServiceType] = useState("Hello"); // to be excluded
  const [cityPincode, setCityPincode] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [serviceImages, setServiceImages] = useState(null); // to be modified
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [userAltPhoneNumber, setUserAltPhoneNumber] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submitting form....");
  };

  return (
    <div className="servicepage-root">
      <form onSubmit={handleFormSubmit}>
        <div className="service-details-container">
          <label className="service-type">
            Type <br />
            <input
              type="text"
              value={serviceType}
              onChange={(e) => setServiceType(e.target.value)}
              readOnly={checkbox}
            />
          </label>

          <label className="service-description">
            Description <br />
            <textarea
              value={serviceDescription}
              onChange={(e) => setServiceDescription(e.target.value)}
            />
          </label>

          <label htmlFor="service-images" className="service-image">
            Upload files <br />
            <input
              multiple
              accept="image/*"
              type="file"
              id="service-images"
              onChange={(e) => setServiceImages(e.target.files)}
            />
          </label>

          <div className="images-preview-container">
            {serviceImages && serviceImages.length !== 0
              ? "Images"
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
            H.No/Flat No/Landmark <br />
            <input
              type="text"
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
          </label>

          <div>
            <label className="user-city">
              City <br />
              <input
                type="text"
                value={userCity}
                onChange={(e) => setUserCity(e.target.value)}
              />
            </label>
            <label className="user-city-pincode">
              Pincode <br />
              <input
                type="number"
                value={cityPincode}
                onChange={(e) => setCityPincode(e.target.value)}
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
              />
            </label>
            <label className="user-country">
              Country <br />
              <input
                type="text"
                value={userCountry}
                onChange={(e) => setUserCountry(e.target.value)}
              />
            </label>
          </div>

          <label className="user-phone">
            Phone number <br />
            <input
              type="tel"
              value={userPhoneNumber}
              onChange={(e) => setUserPhoneNumber(e.target.value)}
            />
          </label>

          <label className="user-phone-alt">
            Alternative Phone number <br />
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
