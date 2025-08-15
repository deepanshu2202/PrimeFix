import "../styles/pages/notfound.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-box">
        <h1>404</h1>
        <p>Oops! The page you're looking for doesn't exist.</p>
        <Link to="/" className="home-link">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
