import React from "react";
import { auth } from "../firebase/Firebase.config";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { AiOutlineUserDelete } from "react-icons/ai";
import "../styles/Profile.css";
import { useSelector } from "react-redux";
import { selectEmail, selectUserName, selectUserId } from "../Redux/authSlice";

const ProfilePage = () => {
  const navigate = useNavigate();

  const email = useSelector(selectEmail);
  const name = useSelector(selectUserName);
  const userId = useSelector(selectUserId);

  //Logout User
  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout SuccessFul!");
        navigate("/login");
      })
      .catch((error) => {
        toast.error("Something went wrong");
      });
  };

  return (
    <section className="profile">
      <div className="userInfo">
        <div className="userDetails">
          <h1>{name}</h1>
          <div className="emailId">
            <p className="userEmail"> Email : {email}</p>
            <p className="userId"> UserId : {userId}</p>
          </div>
        </div>

        <div className="logout">
          <button type="button" onClick={logoutUser}>
            <span>Logout</span>
            <AiOutlineUserDelete />
          </button>
        </div>
      </div>

      <div className="passwordChange">
        <button onClick={() => navigate("/forget")}>Change Password</button>
      </div>
    </section>
  );
};

export default ProfilePage;
