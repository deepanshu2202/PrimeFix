import { useState } from "react";
import "../styles/pages/homepage.css";
import { FaTools } from "react-icons/fa";
import { useSelector } from "react-redux";
import { TbClockPin } from "react-icons/tb";
import { GrUserExpert } from "react-icons/gr";
import { MdOutlinePriceCheck } from "react-icons/md";

import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import heroImage from "../assets/hero-img.png";
import faqImg from "../assets/faq-new-removebg-preview.png";
import serviceImg from "../assets/service-img.jpeg";
import contactImg from "../assets/contact-img.jpeg";

const HomePage = () => {
  const services = useSelector((state) => state.services.services);
  const [contactText, setContactText] = useState("");
  const [toggleActiveButton, setToggleActiveButton] = useState(true);

  const handleServiceClick = (e) => {
    console.log(e.target.id);
  };

  const handleContactSubmit = () => {
    console.log("Text Entered:", contactText);
    setContactText("");
    console.log(window.scrollY);
  };

  const faqs = [
    {
      question: "What does each service include?",
      answer:
        "Each service comes with a detailed breakdown of deliverables, timelines, and cost.",
    },
    {
      question: "How long does it take to complete a service?",
      answer:
        "Completion time varies per service, but most are delivered within 5-7 business days.",
    },
    {
      question: "Can I customize the service according to my needs?",
      answer: "Yes, we offer customization options for all services.",
    },
    {
      question: "What does each service include?",
      answer:
        "Each service comes with a detailed breakdown of deliverables, timelines, and cost." +
        "Each service comes with a detailed ",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="home-root">
      {/* /* <============================== HERO SECTION ============================> */}

      <div className="hero-section">
        <span>
          <h1>One Platform.</h1>
          <h1>Every Service.</h1>
          <h1>Zero Hassle.</h1>
          <p>
            From leaky taps to tech support, <br />
            we bring skilled professionals to your doorstep <br />
            quick, easy, and reliable.
          </p>
        </span>
        <img src={heroImage} alt="hero-img" />
      </div>

      {/* /* <============================== ABOUT SECTION ============================> */}

      <div className="about-section">
        <span className="about-details">
          <h1>Our Services</h1>
          <p>
            We offer a complete range of professional household services, <br />
            ensuring your home stays in top condition. Whether it’s repairs,{" "}
            <br />
            installations, or maintenance, our verified experts provide fast,
            reliable,
            <br />
            and affordable solutions.
          </p>
          <img className="service-image" src={serviceImg} alt="service-img" />
        </span>
        <div className="about-cards">
          <div>
            <span className="about-card-icon">
              <FaTools size={32} />
            </span>

            <h3>Wide Range of Services</h3>
            <p>
              From plumbing to gardening, <br />
              all your household needs in one place.
            </p>
          </div>
          <div>
            <span className="about-card-icon">
              <GrUserExpert size={32} />
            </span>
            <h3>Skilled & Verified Professionals</h3>
            <p>
              Experienced, background-verified <br />
              experts for reliable service.
            </p>
          </div>
          <div>
            <span className="about-card-icon">
              <MdOutlinePriceCheck size={32} />
            </span>
            <h3>Transparent & Affordable Pricing</h3>
            <p>Clear, upfront costs with no hidden charges.</p>
          </div>
          <div>
            <span className="about-card-icon">
              <TbClockPin size={32} />
            </span>
            <h3>Quick & Hassle-Free Booking</h3>
            <p>
              Book in minutes and get services delivered at your convenience.
            </p>
          </div>
        </div>
      </div>

      <h1 className="all-service-heading">
        <u>All Services</u>
      </h1>

      {/* /* <============================== SERVICE SECTION ============================> */}

      <div className="service-section">
        {Object.entries(services).map(([id, { title, sub }]) => (
          <div
            key={id}
            id={id}
            className="service-item"
            onClick={handleServiceClick}
          >
            <h3 id={id}>{id +". "+ title}</h3>
            <ul>
              {sub.map((item, i) => (
                <li key={i} id={id}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* /* <============================== FAQ SECTION ============================> */}

      <div className="faq-section">
        <div className="faq-cards">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openIndex === index ? "open" : ""}`}
            >
              <h3 onClick={() => toggleFAQ(index)}>Q. {faq.question}</h3>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <img className="faq-image" src={faqImg} alt="faq-image" />
      </div>

      {/* /* <============================== CONTACT SECTION ============================> */}

      <div className="contact-section">
        <h1>FeedBack or Fix - We're Listening</h1>
        <div className="contact-section-bottom">
          <img className="contact-image" src={contactImg} alt="contact-image" />
          <div className="input-box">
            <div className="input-types">
              <button
                className={toggleActiveButton ? "active-btn" : ""}
                onClick={() => setToggleActiveButton(true)}
              >
                FeedBack
              </button>
              <button
                className={!toggleActiveButton ? "active-btn" : ""}
                onClick={() => setToggleActiveButton(false)}
              >
                Complaint
              </button>
            </div>
            <textarea
              value={contactText}
              placeholder="Enter text here...."
              onChange={(e) => setContactText(e.target.value)}
            />
            <button className="input-submit-btn" onClick={handleContactSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* /* <============================== FOOTER SECTION ============================> */}

      <footer className="footer">
        <div className="footer-container">
          {/* Brand */}
          <div className="footer-brand">
            <h2 className="footer-logo">PrimeFix</h2>
            <p>
              Your trusted partner for all home maintenance and repair services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/about">About</a>
              </li>
              <li>
                <a href="/contact">Contact</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h3>Contact Us</h3>
            <ul>
              <li>📍 123 Main Street, City</li>
              <li>📞 +91 870-893-1785</li>
              <li>✉️ support@primefix.com</li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="footer-social">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          © {new Date().getFullYear()} PrimeFix. All Rights Reserved. <br />
          create by <a className="name-link" href="#">Deepanshu</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
