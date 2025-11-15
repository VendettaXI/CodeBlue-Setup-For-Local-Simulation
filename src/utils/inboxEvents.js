export function addHeartCheckInboxEvent(targetUserId, fromUserName) {
  const existing = JSON.parse(localStorage.getItem("inboxEvents") || "[]");

  const newEvent = {
    id: Date.now(),
    type: "heart-check",
    from: fromUserName,
    to: targetUserId,
    message: `${fromUserName} Heart-Checked you 💙`,
    timestamp: new Date().toISOString(),
    unread: true
  };

  localStorage.setItem("inboxEvents", JSON.stringify([newEvent, ...existing]));

  return newEvent;
}
