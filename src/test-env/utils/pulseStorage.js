export function savePulseAnswer(profileId, cardIndex, answerObj) {
  const key = `pulseAnswers_${profileId}`;
  const existing = JSON.parse(localStorage.getItem(key) || "{}");

  const updated = {
    ...existing,
    [cardIndex]: answerObj
  };

  localStorage.setItem(key, JSON.stringify(updated));
}

export function loadPulseAnswers(profileId) {
  const key = `pulseAnswers_${profileId}`;
  return JSON.parse(localStorage.getItem(key) || "{}");
}
