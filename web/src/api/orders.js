import { api } from "./client";

// Order endpoints
export function getOrders() {
  return api.get("/api/orders/my_orders/");
}

export function getPendingOrders() {
  return api.get("/api/orders/my_pending_orders/");
}

export function getOrderDetail(orderId) {
  return api.get(`/api/orders/${orderId}/`);
}

export function checkoutCart() {
  return api.post("/api/orders/checkout/");
}

export function approveOrder(orderId) {
  return api.post(`/api/orders/${orderId}/approve/`);
}

export function rejectOrder(orderId, reason = "") {
  return api.post(`/api/orders/${orderId}/reject/`, { reason });
}
export function confirmOrderReceived(orderId) {
  return api.post(`/api/orders/${orderId}/confirm_received/`);
}

// Rider Delivery endpoints
export function getAvailableDeliveries() {
  return api.get("/api/deliveries/available/");
}

export function getMyDeliveries() {
  return api.get("/api/deliveries/my_deliveries/");
}

export function getMyPendingDeliveries() {
  return api.get("/api/deliveries/my_pending/");
}

export function acceptDelivery(deliveryId) {
  return api.post(`/api/deliveries/${deliveryId}/accept/`);
}

export function rejectDelivery(deliveryId, reason = "") {
  return api.post(`/api/deliveries/${deliveryId}/reject/`, { reason });
}

export function updateDeliveryStatus(deliveryId, status, notes = "") {
  return api.post(`/api/deliveries/${deliveryId}/update_status/`, {
    status,
    notes
  });
}

export function completeDelivery(deliveryId) {
  return api.post(`/api/deliveries/${deliveryId}/complete/`);
}

// Rider Notification endpoints
export function getMyNotifications() {
  return api.get("/api/notifications/my_notifications/");
}

export function getUnreadNotifications() {
  return api.get("/api/notifications/unread/");
}

export function markNotificationAsRead(notificationId) {
  return api.patch(`/api/notifications/${notificationId}/mark_as_read/`);
}
