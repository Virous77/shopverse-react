import { useState, useEffect } from "react";
import "./App.css";
import {
  HomePage,
  CartPage,
  OrderPage,
  AdminPage,
  ProfilePage,
  SignUpPage,
  LoginPage,
  ErrorPage,
  Reset,
  ExplorePage,
  ProductDetailPage,
  CheckoutPage,
  CheckoutPaymentPage,
  CheckoutSuccessPage,
} from "./pages/index";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./Components/layout/Navbar";
import Footer from "./Components/layout/Footer";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase/Firebase.config";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "./Redux/authSlice";
import { selectEmail } from "./Redux/authSlice";

function App() {
  const [displayNames, setDisplayName] = useState("");
  const dispatch = useDispatch();

  const adminOnly = useSelector(selectEmail);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user?.displayName === null) {
          let u1 = user?.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }
      } else {
        dispatch(REMOVE_ACTIVE_USER());
      }

      dispatch(
        SET_ACTIVE_USER({
          email: user.email,
          userName: displayNames,
          userId: user.uid,
        })
      );
    });
  }, [displayNames, dispatch]);

  return (
    <section className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {adminOnly === process.env.REACT_APP_ADMIN_ID ? (
          <Route path="/admin/*" element={<AdminPage />} />
        ) : null}
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/product-detail/:id" element={<ProductDetailPage />} />
        <Route path="/orders-history" element={<OrderPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout-details" element={<CheckoutPage />} />
        <Route path="/checkout-payment" element={<CheckoutPaymentPage />} />
        <Route path="/checkout-success" element={<CheckoutSuccessPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="forget" element={<Reset />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <ToastContainer style={{ marginTop: "6rem" }} />
      <Footer />
    </section>
  );
}

export default App;
