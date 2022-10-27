import React, { useState } from "react";
import "../styles/Auth.css";
import resetImg from "../assest/forgot.png";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/Firebase.config";
import { toast } from "react-toastify";
import Loader from "../UI/Loader";

const Reset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isloading, setIsLoading] = useState(false);

  //Forgot password from
  const forgetPasswordForm = (e) => {
    e.preventDefault();

    setIsLoading(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });

    setEmail("");
  };

  if (isloading) {
    return <Loader />;
  }

  return (
    <section className="loginSection">
      <div className="imgConta">
        <img src={resetImg} alt="forgot" />
      </div>

      <div className="loginForm">
        <h1>Reset Your Password</h1>

        <form onSubmit={forgetPasswordForm}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="loginButton" type="submmit">
            Reset Password
          </button>
        </form>

        <div className="signup">
          <p>
            Already an account?
            <span className="goSignUp" onClick={() => navigate("/login")}>
              Log In
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reset;
