import { useEffect, useState } from "react";
import { getOrders, confirmOrderReceived } from "../api/orders";
import "./OrdersView.css";

export default function OrdersView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [deliveryModal, setDeliveryModal] = useState({ isOpen: false, orderId: null });
  const [confirmingOrder, setConfirmingOrder] = useState(null);

  useEffect(() => {
    loadOrders();
    // Poll for order updates every 5 seconds
    const interval = setInterval(loadOrders, 5000);
    return () => clearInterval(interval);
  }, []);

  // Check for orders in SIMULATION_DELIVERY status that need confirmation
  useEffect(() => {
    const deliveryOrder = orders.find(order => order.status === 'SIMULATION_DELIVERY');
    if (deliveryOrder && !deliveryModal.isOpen) {
      setDeliveryModal({ isOpen: true, orderId: deliveryOrder.id });
    }
  }, [orders, deliveryModal.isOpen]);

  async function loadOrders() {
    try {
      const res = await getOrders();
      setOrders(res.data || []);
      setError("");
    } catch (err) {
      setError("Failed to load orders");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "IN_PROGRESS":
        return "status-in-progress";
      case "APPROVED":
        return "status-approved";
      case "REJECTED":
        return "status-rejected";
      case "COMPLETED":
        return "status-completed";
      default:
        return "status-pending";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "IN_PROGRESS":
        return "⏳";
      case "APPROVED":
        return "✅";
      case "SIMULATION_DELIVERY":
        return "🚚";
      case "REJECTED":
        return "❌";
      case "COMPLETED":
        return "🎉";
      default:
        return "📋";
    }
  };

  async function handleConfirmDelivery(orderId) {
    setConfirmingOrder(orderId);
    try {
      await confirmOrderReceived(orderId);
      setDeliveryModal({ isOpen: false, orderId: null });
      await loadOrders();
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to confirm delivery");
      console.log(err);
    } finally {
      setConfirmingOrder(null);
    }
  }

  if (loading) {
    return <div className="orders-view"><div className="loading">Loading orders...</div></div>;
  }

  return (
    <div className="orders-view">
      <h3>My Orders</h3>

      {error && <div className="orders-error">{error}</div>}

      {orders.length === 0 ? (
        <div className="empty-orders">
          <p>No orders yet</p>
          <p className="empty-orders-hint">Start shopping to place your first order!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`order-card ${getStatusColor(order.status)}`}
              onClick={() =>
                setExpandedOrder(expandedOrder === order.id ? null : order.id)
              }
            >
              <div className="order-header">
                <div className="order-info">
                  <h4>Order #{order.id}</h4>
                  <p className="order-date">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="order-status">
                  <span className={`status-badge ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status}
                  </span>
                  <p className="order-total">₱{(parseFloat(order.total_amount) || 0).toFixed(2)}</p>
                </div>
              </div>

              {expandedOrder === order.id && (
                <div className="order-details">
                  <div className="order-items">
                    <h5>Items:</h5>
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <div className="item-info">
                          <p className="item-title">{item.post.title}</p>
                          <p className="item-farmer">
                            From: {item.farmer_name}
                          </p>
                        </div>
                        <div className="item-details">
                          <span>
                            {parseFloat(item.quantity) || 0} {item.unit}
                          </span>
                          <span>₱{(parseFloat(item.total_price) || 0).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {order.status === "REJECTED" && order.rejection_reason && (
                    <div className="rejection-note">
                      <p>
                        <strong>Rejection Reason:</strong> {order.rejection_reason}
                      </p>
                      <p className="rejection-hint">
                        Items have been returned to your cart. You can modify quantities
                        and try again.
                      </p>
                    </div>
                  )}

                  {order.status === "APPROVED" && (
                    <div className="approved-note">
                      <p>✅ Your order has been approved by the farmer!</p>
                      <p className="delivery-note">Preparing for delivery...</p>
                    </div>
                  )}

                  {order.status === "SIMULATION_DELIVERY" && (
                    <div className="delivery-note">
                      <p>🚚 Your order is on its way! Please confirm when you have received it.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Delivery Confirmation Modal */}
      {deliveryModal.isOpen && deliveryModal.orderId && (
        <div className="delivery-modal-overlay">
          <div className="delivery-modal">
            <div className="modal-header">
              <h3>Order Delivery</h3>
              <button 
                className="modal-close" 
                onClick={() => setDeliveryModal({ isOpen: false, orderId: null })}
              >
                ✕
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-icon">🚚</p>
              <p className="modal-title">Have you received your order?</p>
              <p className="modal-message">
                Please confirm once you have received all items from Order #{deliveryModal.orderId}.
              </p>
            </div>
            <div className="modal-footer">
              <button 
                className="btn-confirm"
                onClick={() => handleConfirmDelivery(deliveryModal.orderId)}
                disabled={confirmingOrder === deliveryModal.orderId}
              >
                {confirmingOrder === deliveryModal.orderId ? 'Confirming...' : 'Yes, I Received It'}
              </button>
              <button 
                className="btn-cancel"
                onClick={() => setDeliveryModal({ isOpen: false, orderId: null })}
                disabled={confirmingOrder === deliveryModal.orderId}
              >
                Close
              </button>
            </div>
            {error && <div className="modal-error">{error}</div>}
          </div>
        </div>
      )}
    </div>
  );
}
