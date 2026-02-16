import { useState } from "react";
import DeliveryStatusTracker from "./DeliveryStatusTracker";
import "./DeliveryCard.css";

export default function DeliveryCard({
  delivery,
  onAccept,
  onReject,
  onUpdateStatus,
  onComplete,
  showAcceptReject = false,
  showStatusUpdate = false
}) {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [showStatusForm, setShowStatusForm] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [statusNotes, setStatusNotes] = useState("");

  const handleReject = () => {
    if (rejectReason.trim()) {
      onReject(rejectReason);
      setRejectReason("");
      setShowRejectForm(false);
    }
  };

  const handleUpdateStatus = () => {
    if (selectedStatus) {
      onUpdateStatus(selectedStatus, statusNotes);
      setSelectedStatus("");
      setStatusNotes("");
      setShowStatusForm(false);
    }
  };

  const statusSteps = ["PICKED_UP_OTW", "PICKED_UP", "OTW_TO_BUYER", "ARRIVED"];
  const currentStatusIndex = statusSteps.indexOf(delivery.status);

  return (
    <div className="delivery-card">
      <div className="delivery-header">
        <h3>Order #{delivery.order}</h3>
        <span className={`status-badge status-${delivery.status.toLowerCase()}`}>
          {delivery.status}
        </span>
      </div>

      <div className="delivery-info">
        <div className="info-group">
          <label>Order Details:</label>
          <div className="order-items">
            {delivery.order_details?.items?.map((item) => (
              <div key={item.id} className="order-item">
                <span>{item.post.title}</span>
                <span className="quantity">×{item.quantity} {item.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {delivery.rider_name && (
          <div className="info-group">
            <label>Assigned Rider:</label>
            <p>{delivery.rider_name}</p>
          </div>
        )}

        <div className="info-group">
          <label>Customer:</label>
          <p>{delivery.order_details?.customer_name}</p>
        </div>

        <div className="info-group">
          <label>Total Amount:</label>
          <p className="amount">${delivery.order_details?.total_amount || "0.00"}</p>
        </div>

        {delivery.rejection_reason && (
          <div className="info-group rejection-reason">
            <label>Rejection Reason:</label>
            <p>{delivery.rejection_reason}</p>
          </div>
        )}
      </div>

      {showStatusUpdate && delivery.status !== "COMPLETED" && (
        <DeliveryStatusTracker
          currentStatus={delivery.status}
          statusUpdates={delivery.status_updates}
          onStatusChange={handleUpdateStatus}
          onComplete={onComplete}
        />
      )}

      <div className="delivery-actions">
        {showAcceptReject && (
          <>
            <button
              className="btn btn-accept"
              onClick={onAccept}
            >
              ✓ Accept Delivery
            </button>
            <button
              className="btn btn-reject"
              onClick={() => setShowRejectForm(!showRejectForm)}
            >
              ✗ Reject Delivery
            </button>
          </>
        )}

        {showRejectForm && (
          <div className="reject-form">
            <textarea
              placeholder="Reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows="3"
            />
            <div className="form-actions">
              <button
                className="btn btn-primary"
                onClick={handleReject}
                disabled={!rejectReason.trim()}
              >
                Confirm Rejection
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setShowRejectForm(false);
                  setRejectReason("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {showStatusUpdate && delivery.status !== "COMPLETED" && (
        <div className="status-update-section">
          <button
            className="btn btn-secondary"
            onClick={() => setShowStatusForm(!showStatusForm)}
          >
            📍 Update Delivery Status
          </button>

          {showStatusForm && (
            <div className="status-form">
              <div className="form-group">
                <label>Next Status:</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">-- Select Status --</option>
                  {statusSteps.map((step) => (
                    <option key={step} value={step}>
                      {step}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Notes (Optional):</label>
                <textarea
                  placeholder="Add any notes about this delivery..."
                  value={statusNotes}
                  onChange={(e) => setStatusNotes(e.target.value)}
                  rows="2"
                />
              </div>

              <div className="form-actions">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateStatus}
                  disabled={!selectedStatus}
                >
                  Update Status
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setShowStatusForm(false);
                    setSelectedStatus("");
                    setStatusNotes("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
