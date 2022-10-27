import React, { useState } from "react";
import "../styles/Auth.css";
import signupImage from "../assest/register.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../UI/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/Firebase.config";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPass, setCPass] = useState("");
  const [isloading, setIsLoading] = useState(false);

  //Sign Up from
  const registerForm = (e) => {
    e.preventDefault();

    setIsLoading(true);

    if (password !== cPass) {
      toast.error(`Password do not match!`);
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          toast.success("Registration successful!!");
          navigate("/login");
          setIsLoading(false);
        })
        .catch((error) => {
          toast.error(error.message);
          setIsLoading(false);
        });
    }
  };

  if (isloading) {
    return <Loader />;
  }

  return (
    <section className="loginSection">
      <div className="loginForm">
        <h1>Sign Up</h1>

        <form onSubmit={registerForm}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm password"
            value={cPass}
            onChange={(e) => setCPass(e.target.value)}
          />
          <button className="loginButton" type="submmit">
            Sign Up
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

      <div className="imgConta">
        <img src={signupImage} alt="signup" />
      </div>
    </section>
  );
};

export default SignUpPage;
