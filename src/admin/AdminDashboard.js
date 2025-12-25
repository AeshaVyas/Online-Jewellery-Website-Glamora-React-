import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers, FaBox, FaShoppingCart, FaList, FaCommentDots } from "react-icons/fa";

function AdminDashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    products: 0,
    orders: 0,
    categories: 0,
    feedbacks: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [userRes, productRes, orderRes, categoryRes, feedbackRes] =
          await Promise.all([
            axios.get("http://localhost:3001/user"),
            axios.get("http://localhost:3001/products"),
            axios.get("http://localhost:3001/order_t"),
            axios.get("http://localhost:3001/category"),
            axios.get("http://localhost:3001/feedback"),
          ]);

        setCounts({
          users: userRes.data.length,
          products: productRes.data.length,
          orders: orderRes.data.length,
          categories: categoryRes.data.length,
          feedbacks: feedbackRes.data.length,
        });
      } catch (err) {
        console.error("Error fetching counts:", err);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">📊 Admin Dashboard</h2>
      <div className="row g-4">

        {/* USERS */}
        <div className="col-md-4">
          <div className="card shadow text-center p-3 bg-primary text-white">
            <FaUsers size={40} className="mb-2" />
            <h4>Users</h4>
            <h2>{counts.users}</h2>
          </div>
        </div>

        {/* PRODUCTS */}
        <div className="col-md-4">
          <div className="card shadow text-center p-3 bg-success text-white">
            <FaBox size={40} className="mb-2" />
            <h4>Products</h4>
            <h2>{counts.products}</h2>
          </div>
        </div>

        {/* ORDERS */}
        <div className="col-md-4">
          <div className="card shadow text-center p-3 bg-warning text-white">
            <FaShoppingCart size={40} className="mb-2" />
            <h4>Orders</h4>
            <h2>{counts.orders}</h2>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="col-md-6">
          <div className="card shadow text-center p-3 bg-info text-white">
            <FaList size={40} className="mb-2" />
            <h4>Categories</h4>
            <h2>{counts.categories}</h2>
          </div>
        </div>

        {/* FEEDBACK */}
        <div className="col-md-6">
          <div className="card shadow text-center p-3 bg-danger text-white">
            <FaCommentDots size={40} className="mb-2" />
            <h4>Feedbacks</h4>
            <h2>{counts.feedbacks}</h2>
          </div>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;
