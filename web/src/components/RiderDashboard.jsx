import { useEffect, useState } from "react";
import {
  getAvailableDeliveries,
  getMyPendingDeliveries,
  getMyNotifications,
  acceptDelivery,
  rejectDelivery,
  updateDeliveryStatus,
  completeDelivery
} from "../api/orders";
import DeliveryCard from "./DeliveryCard";
import RiderNotifications from "./RiderNotifications";
import "./RiderDashboard.css";

export default function RiderDashboard() {
  const [activeTab, setActiveTab] = useState("available"); // "available" | "pending" | "notifications"
  const [availableDeliveries, setAvailableDeliveries] = useState([]);
  const [pendingDeliveries, setPendingDeliveries] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refreshCount, setRefreshCount] = useState(0);

  // Load available deliveries
  useEffect(() => {
    if (activeTab === "available") {
      loadAvailableDeliveries();
    }
  }, [activeTab, refreshCount]);

  // Load pending deliveries
  useEffect(() => {
    if (activeTab === "pending") {
      loadPendingDeliveries();
    }
  }, [activeTab, refreshCount]);

  // Load notifications
  useEffect(() => {
    if (activeTab === "notifications") {
      loadNotifications();
    }
  }, [activeTab, refreshCount]);

  async function loadAvailableDeliveries() {
    setLoading(true);
    setError("");
    try {
      const response = await getAvailableDeliveries();
      setAvailableDeliveries(response.data || []);
    } catch (err) {
      setError("Failed to load available deliveries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadPendingDeliveries() {
    setLoading(true);
    setError("");
    try {
      const response = await getMyPendingDeliveries();
      setPendingDeliveries(response.data || []);
    } catch (err) {
      setError("Failed to load pending deliveries");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function loadNotifications() {
    setLoading(true);
    setError("");
    try {
      const response = await getMyNotifications();
      setNotifications(response.data || []);
    } catch (err) {
      setError("Failed to load notifications");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleAcceptDelivery(deliveryId) {
    try {
      await acceptDelivery(deliveryId);
      setRefreshCount(prev => prev + 1);
    } catch (err) {
      setError("Failed to accept delivery: " + err.response?.data?.error || err.message);
    }
  }

  async function handleRejectDelivery(deliveryId, reason) {
    try {
      await rejectDelivery(deliveryId, reason);
      setRefreshCount(prev => prev + 1);
    } catch (err) {
      setError("Failed to reject delivery: " + err.response?.data?.error || err.message);
    }
  }

  async function handleUpdateStatus(deliveryId, newStatus, notes) {
    try {
      await updateDeliveryStatus(deliveryId, newStatus, notes);
      setRefreshCount(prev => prev + 1);
    } catch (err) {
      setError("Failed to update delivery status: " + err.response?.data?.error || err.message);
    }
  }

  async function handleCompleteDelivery(deliveryId) {
    try {
      await completeDelivery(deliveryId);
      setRefreshCount(prev => prev + 1);
    } catch (err) {
      setError("Failed to complete delivery: " + err.response?.data?.error || err.message);
    }
  }

  return (
    <div className="rider-dashboard">
      <div className="rider-header">
        <h1>🏍️ Rider Dashboard</h1>
        <p>Manage your deliveries and earn money</p>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="rider-tabs">
        <button
          className={`tab-button ${activeTab === "available" ? "active" : ""}`}
          onClick={() => setActiveTab("available")}
        >
          📍 Available Deliveries ({availableDeliveries.length})
        </button>
        <button
          className={`tab-button ${activeTab === "pending" ? "active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          🚚 Active Deliveries ({pendingDeliveries.length})
        </button>
        <button
          className={`tab-button ${activeTab === "notifications" ? "active" : ""}`}
          onClick={() => setActiveTab("notifications")}
        >
          🔔 Notifications
        </button>
      </div>

      <div className="rider-content">
        {loading && <div className="loading">Loading...</div>}

        {activeTab === "available" && (
          <div className="available-deliveries-container">
            <h2>Available Deliveries</h2>
            {availableDeliveries.length === 0 ? (
              <div className="empty-state">
                <p>No available deliveries at the moment</p>
              </div>
            ) : (
              <div className="deliveries-grid">
                {availableDeliveries.map(delivery => (
                  <DeliveryCard
                    key={delivery.id}
                    delivery={delivery}
                    onAccept={() => handleAcceptDelivery(delivery.id)}
                    onReject={(reason) => handleRejectDelivery(delivery.id, reason)}
                    showAcceptReject={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "pending" && (
          <div className="pending-deliveries-container">
            <h2>Active Deliveries</h2>
            {pendingDeliveries.length === 0 ? (
              <div className="empty-state">
                <p>You have no active deliveries</p>
              </div>
            ) : (
              <div className="deliveries-list">
                {pendingDeliveries.map(delivery => (
                  <DeliveryCard
                    key={delivery.id}
                    delivery={delivery}
                    onUpdateStatus={(status, notes) => handleUpdateStatus(delivery.id, status, notes)}
                    onComplete={() => handleCompleteDelivery(delivery.id)}
                    showStatusUpdate={true}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "notifications" && (
          <RiderNotifications notifications={notifications} />
        )}
      </div>
    </div>
  );
}
