import "../styles/pages/loginpage.css";
import loginImg from "../assets/login-img.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginUser } from "../utils/api";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // functions
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      await loginUser(data);
      navigate('/');
    } catch (err) {
      console.log("LoginError:", err);
    }
  };

  return (
    <div className="login-root">
      {/* Left Side - Image */}
      <div className="login-image">
        <img src={loginImg} alt="Login" />
      </div>

      {/* Right Side - Form Card */}
      <div className="login-form-wrapper">
        <div className="login-card">
          <h2 className="login-heading">Welcome back!</h2>
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <label>
              Email <br />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>

            <label>
              Password <br />
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="login-btn">
              Login
            </button>

            <p className="signup-link">
              Don’t have an account?{" "}
              <a onClick={() => navigate("/register")}>Sign up</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
