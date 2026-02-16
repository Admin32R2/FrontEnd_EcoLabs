import { useEffect, useState } from "react";
import { markNotificationAsRead } from "../api/orders";
import "./RiderNotifications.css";

export default function RiderNotifications({ notifications = [] }) {
  const [notificationsList, setNotificationsList] = useState(notifications);

  useEffect(() => {
    setNotificationsList(notifications);
  }, [notifications]);

  async function handleMarkAsRead(notificationId) {
    try {
      await markNotificationAsRead(notificationId);
      setNotificationsList(
        notificationsList.map(n =>
          n.id === notificationId ? { ...n, is_read: true } : n
        )
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  }

  const getNotificationIcon = (type) => {
    switch (type) {
      case "NEW_DELIVERY":
        return "📦";
      case "DELIVERY_EXPIRED":
        return "⏰";
      case "STATUS_UPDATE":
        return "📍";
      default:
        return "🔔";
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "NEW_DELIVERY":
        return "new-delivery";
      case "DELIVERY_EXPIRED":
        return "expired";
      case "STATUS_UPDATE":
        return "status-update";
      default:
        return "default";
    }
  };

  if (notificationsList.length === 0) {
    return (
      <div className="notifications-container">
        <div className="empty-state">
          <p>No notifications yet</p>
        </div>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <h2>Your Notifications</h2>
      <div className="notifications-list">
        {notificationsList.map((notification) => (
          <div
            key={notification.id}
            className={`notification-item ${
              notification.is_read ? "read" : "unread"
            } ${getNotificationColor(notification.notification_type)}`}
          >
            <div className="notification-icon">
              {getNotificationIcon(notification.notification_type)}
            </div>

            <div className="notification-content">
              <div className="notification-header">
                <h4>{notification.title}</h4>
                <span className="notification-time">
                  {new Date(notification.created_at).toLocaleString()}
                </span>
              </div>

              <p className="notification-message">{notification.message}</p>

              {!notification.is_read && (
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => handleMarkAsRead(notification.id)}
                >
                  Mark as Read
                </button>
              )}
            </div>

            <div className="notification-badge">
              {!notification.is_read && <span className="unread-dot"></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
