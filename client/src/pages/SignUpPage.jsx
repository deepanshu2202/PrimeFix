import "../styles/pages/signuppage.css";
import signupImg from "../assets/signup-img.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../utils/api";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // functions
  const handleSignupSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password should contain atleast 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords should be the same");
      return;
    }

    try {
      const data = {name, email, password};
      await signUpUser(data);
      navigate('/');
      toast.success("Account created successfully");
    } catch (err) {
      const msg = err.response.data.message;
      // console.log("SignUpError: ", err.response);
      toast.error(msg);
    }
  };

  return (
    <div className="signup-root">
      {/* Left Side - Form Card */}
      <div className="signup-form-wrapper">
        <div className="signup-card">
          <h2 className="signup-heading">Create Account</h2>
          <form className="signup-form" onSubmit={handleSignupSubmit}>
            <label>
              Name <br />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

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

            <label>
              Confirm Password <br />
              <input
                type="password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            <button type="submit" className="signup-btn">
              Sign Up
            </button>

            <p className="login-link">
              Already have an account?{" "}
              <a onClick={() => navigate("/login")}>Login</a>
            </p>
          </form>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="signup-image">
        <img src={signupImg} alt="Sign Up" />
      </div>
    </div>
  );
};

export default SignUpPage;
