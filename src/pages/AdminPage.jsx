import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  AddProduct,
  Dashboard,
  ViewProduct,
  Order,
  AdminNavbar,
} from "../Components/Admin/index";
import "../styles/Admin.css";

const AdminPage = () => {
  return (
    <section className="admin">
      <div className="adminNavbar">
        <AdminNavbar />
      </div>

      <div className="adminLinks">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Order />} />
          <Route path="add-product/:id" element={<AddProduct />} />
          <Route path="view-product" element={<ViewProduct />} />
        </Routes>
      </div>
    </section>
  );
};

export default AdminPage;
