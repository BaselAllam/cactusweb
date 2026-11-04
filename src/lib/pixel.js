export const pageview = () => {
  if (window.fbq) window.fbq('track', 'PageView');
};

export const track = (event, params = {}, eventId) => {
  if (!window.fbq) return;
  window.fbq('track', event, params, eventId ? { eventID: eventId } : undefined);
};