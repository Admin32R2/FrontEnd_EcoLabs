import "./DeliveryStatusTracker.css";

export default function DeliveryStatusTracker({
  currentStatus,
  statusUpdates = [],
  onStatusChange,
  onComplete
}) {
  const steps = [
    {
      id: "ACCEPTED",
      label: "Accepted",
      description: "Delivery accepted by rider"
    },
    {
      id: "PICKED_UP_OTW",
      label: "On the Way to Pickup",
      description: "Rider heading to pickup location"
    },
    {
      id: "PICKED_UP",
      label: "Picked Up",
      description: "Items picked up from sender"
    },
    {
      id: "OTW_TO_BUYER",
      label: "On the Way to Buyer",
      description: "Rider heading to delivery address"
    },
    {
      id: "ARRIVED",
      label: "Arrived at Buyer",
      description: "Rider arrived at destination"
    },
    {
      id: "COMPLETED",
      label: "Completed",
      description: "Delivery completed successfully"
    }
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStatus);

  const isStepCompleted = (stepId) => {
    const statusIds = [currentStatus, ...statusUpdates.map(u => u.status)];
    const stepIndex = steps.findIndex(s => s.id === stepId);
    const currentIndex = steps.findIndex(s => s.id === currentStatus);
    return stepIndex < currentIndex || stepId === currentStatus;
  };

  return (
    <div className="delivery-status-tracker">
      <h3>Delivery Progress</h3>
      
      <div className="steps-container">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`step ${
              step.id === currentStatus ? "active" : ""
            } ${isStepCompleted(step.id) ? "completed" : ""}`}
          >
            <div className="step-number">
              {isStepCompleted(step.id) ? (
                <span className="checkmark">✓</span>
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className="step-content">
              <div className="step-label">{step.label}</div>
              <div className="step-description">{step.description}</div>
            </div>
            {index < steps.length - 1 && (
              <div className={`step-line ${
                isStepCompleted(steps[index + 1].id) ? "completed" : ""
              }`} />
            )}
          </div>
        ))}
      </div>

      {currentStatus === "ARRIVED" && (
        <div className="complete-delivery-section">
          <p className="info-text">✓ You've arrived at the buyer's location</p>
          <button
            className="btn btn-primary btn-complete"
            onClick={onComplete}
          >
            ✓ Mark Delivery as Complete
          </button>
        </div>
      )}

      {currentStatus === "COMPLETED" && (
        <div className="completed-message">
          <p>🎉 Delivery completed successfully!</p>
        </div>
      )}

      {/* Status History */}
      {statusUpdates.length > 0 && (
        <div className="status-history">
          <h4>History</h4>
          <ul>
            {statusUpdates.map((update, index) => (
              <li key={index}>
                <span className="time">
                  {new Date(update.updated_at).toLocaleString()}
                </span>
                <span className="status-change">{update.status}</span>
                {update.notes && (
                  <span className="notes">{update.notes}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
