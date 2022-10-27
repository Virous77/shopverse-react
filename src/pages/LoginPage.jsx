import React, { useState } from "react";
import "../styles/Auth.css";
import login from "../assest/login.png";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase/Firebase.config";
import { toast } from "react-toastify";
import Loader from "../UI/Loader";
import { useSelector } from "react-redux";
import { selectPrevurl } from "../Redux/cartSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const prevURL = useSelector(selectPrevurl);

  const [isloading, setIsLoading] = useState(false);

  const redirectUser = () => {
    if (prevURL.includes("cart")) {
      return navigate("/cart");
    } else {
      navigate("/");
    }
  };

  //Login with Email & Pass
  const loginForm = (e) => {
    e.preventDefault();
    setIsLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  //Login With Google
  const googleAuth = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        toast.success("Login Successfully!");
        redirectUser();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (isloading) {
    return <Loader />;
  }

  return (
    <section className="loginSection">
      <div className="imgConta">
        <img src={login} alt="login" />
      </div>

      <div className="loginForm">
        <h1>Login</h1>

        <form onSubmit={loginForm}>
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
          <button className="loginButton" type="submmit">
            Login
          </button>
        </form>

        <div className="forget">
          <p onClick={() => navigate("/forget")}>Forget Password</p>
        </div>

        <p>-- OR --</p>

        <button className="googleButton" type="button" onClick={googleAuth}>
          <FcGoogle />
          <span>Login With Google</span>
        </button>

        <div className="signup">
          <p>
            Don't have an account?{" "}
            <span className="goSignUp" onClick={() => navigate("/signup")}>
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
