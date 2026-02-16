
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { me } from "../api/auth";
import { setAuthToken, clearAuthToken } from "../api/client";
import PostFeed from "../components/PostFeed";
import FarmerPostForm from "../components/FarmerPostForm";
import FarmerOrdersManagement from "../components/FarmerOrdersManagement";
import OrdersView from "../components/OrdersView";
import CartView from "../components/CartView";
import AdminDashboard from "../components/AdminDashboard";
import RiderDashboard from "../components/RiderDashboard";
import "./Dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("Loading...");
  const [activeTab, setActiveTab] = useState("feed"); // "feed" | "myPosts" | "orders" | "cart" | "profile" | "admin"
  const [refreshFeed, setRefreshFeed] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuthToken(token);
      me()
        .then((res) => {
          setUser(res.data);
          setStatus("");
        })
        .catch((err) => {
          console.log(err);
          // token invalid/expired -> clear auth
          clearAuthToken();
          setUser(null);
          setStatus("");
        });
    } else {
      // No token - user is browsing as guest
      setStatus("");
    }
  }, []);

  function handleLogout() {
    clearAuthToken();
    navigate("/login");
  }

  function handlePostCreated() {
    setRefreshFeed((prev) => prev + 1);
    setActiveTab("feed");
  }

  if (status) return <div className="dashboard-loading">{status}</div>;

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Farmers Market</h1>
          {user ? (
            <div className="header-user">
              <span className="user-avatar">{user.username.charAt(0).toUpperCase()}</span>
              <div className="user-info">
                <p className="user-name">{user.username}</p>
                <p className="user-role">{user.role === "FARMER" ? "Farmer" : user.role === "RIDER" ? "Rider" : "Customer"}</p>
              </div>
            </div>
          ) : (
            <div className="header-actions">
              <button className="login-header-btn" onClick={() => navigate("/login")}>
                Login / Sign Up
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="dashboard-tabs">
        <button
          className={`tab-btn ${activeTab === "feed" ? "active" : ""}`}
          onClick={() => setActiveTab("feed")}
          title="Browse all posts"
        >
          Feed
        </button>

        {user?.role === "FARMER" && (
          <>
            <button
              className={`tab-btn ${activeTab === "myPosts" ? "active" : ""}`}
              onClick={() => setActiveTab("myPosts")}
              title="Manage your posts"
            >
              My Posts
            </button>
            <button
              className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
              onClick={() => setActiveTab("orders")}
              title="Manage customer orders"
            >
              Orders
            </button>
          </>
        )}

        {user && (
          <button
            className={`tab-btn ${activeTab === "cart" ? "active" : ""}`}
            onClick={() => setActiveTab("cart")}
            title="View shopping cart"
          >
            Cart
          </button>
        )}

        {user?.role === "CUSTOMER" && (
          <button
            className={`tab-btn ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
            title="View your orders"
          >
            My Orders
          </button>
        )}

        {user?.role === "RIDER" && (
          <button
            className={`tab-btn ${activeTab === "deliveries" ? "active" : ""}`}
            onClick={() => setActiveTab("deliveries")}
            title="Manage deliveries"
          >
            Deliveries
          </button>
        )}

        {user?.role === "ADMIN" && (
          <button
            className={`tab-btn ${activeTab === "admin" ? "active" : ""}`}
            onClick={() => setActiveTab("admin")}
            title="Admin dashboard"
          >
            Admin
          </button>
        )}

        {user && (
          <button
            className={`tab-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
            title="Account settings"
          >
            Profile
          </button>
        )}
      </nav>

      {/* Tab Content */}
      <main className="dashboard-content">
        {/* Feed Tab - For all users (including guests) */}
        {activeTab === "feed" && (
          <PostFeed user={user} refreshTrigger={refreshFeed} />
        )}

        {/* My Posts Tab - For farmers only */}
        {activeTab === "myPosts" && user?.role === "FARMER" && (
          <div className="tab-content">
            <FarmerPostForm onPostCreated={handlePostCreated} />
            <PostFeed user={user} refreshTrigger={refreshFeed} />
          </div>
        )}

        {/* Orders Tab - For farmers only */}
        {activeTab === "orders" && user?.role === "FARMER" && (
          <div className="tab-content">
            <FarmerOrdersManagement />
          </div>
        )}

        {/* Cart Tab - For authenticated users only */}
        {activeTab === "cart" && user && (
          <CartView />
        )}

        {/* My Orders Tab - For customers only */}
        {activeTab === "orders" && user?.role === "CUSTOMER" && (
          <div className="tab-content">
            <OrdersView />
          </div>
        )}

        {/* Deliveries Tab - For riders only */}
        {activeTab === "deliveries" && user?.role === "RIDER" && (
          <RiderDashboard />
        )}

        {/* Admin Dashboard - For admins only */}
        {activeTab === "admin" && user?.role === "ADMIN" && (
          <AdminDashboard user={user} />
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && user && (
          <div className="profile-view">
            <div className="profile-card">
              <div className="profile-avatar-large">
                {user.username.charAt(0).toUpperCase()}
              </div>
              <h2>{user.username}</h2>
              <p className="profile-role">
                {user.role === "FARMER" ? "🚜 Farmer" : user.role === "RIDER" ? "🏍️ Rider" : "👤 Customer"}
              </p>

              <div className="profile-details">
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{user.email}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Account Type</span>
                  <span className="detail-value">
                    {user.role === "FARMER" ? "Farmer Account" : user.role === "RIDER" ? "Rider Account" : "Customer Account"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Member Since</span>
                  <span className="detail-value">
                    {new Date(user.date_joined).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
