import "../styles/pages/servicepage.css";

const ServicePage = () => {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("submitting form....");
  };

  return (
    <div className="servicepage-root">
      <form onSubmit={handleFormSubmit}>
        <label className="service-type">
          Type <br />
          <input type="text" />
        </label>

        <label className="service-description">
          Description <br />
          <textarea />
        </label>

        <label className="address-checkbox">
          <input type="checkbox" />
          use saved address
        </label>

        <label className="user-address">
          Address <br />
          <input type="text" />
        </label>

        <div>
          <label className="user-city">
            City <br />
            <input type="text" />
          </label>
          <label className="user-city-pincode">
            Pincode <br />
            <input type="number" />
          </label>
        </div>

        <div>
          <label className="user-state">
            State <br />
            <input type="text" />
          </label>
          <label className="user-country">
            Country <br />
            <input type="text" />
          </label>
        </div>

        <label className="user-phone">
          Phone number <br />
          <input type="tel" />
        </label>

        <label className="user-phone-alt">
          Alternative Phone number <br />
          <input type="tel" />
        </label>

        <label className="service-image">
          Upload files <br />
          <input type="file" id="service-images" />
        </label>

        <button type="submit" className="submit-btn">
          submit
        </button>
      </form>
    </div>
  );
};

export default ServicePage;
