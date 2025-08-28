// src/utils/notify.js
export function ensureNotificationPermission() {
  try {
    if (!("Notification" in window)) return false;
    if (Notification.permission === "granted") return true;
    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
    return Notification.permission === "granted";
  } catch {
    return false;
  }
}

function beep() {
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    const ctx = new Ctx();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = 880;
    o.connect(g);
    g.connect(ctx.destination);
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + 0.01);
    o.start();
    setTimeout(() => {
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      o.stop(ctx.currentTime + 0.16);
    }, 10);
  } catch {}
}

function flashTitle() {
  try {
    const orig = document.title;
    let i = 0;
    const id = setInterval(() => {
      document.title = i++ % 2 ? orig : `🔔 ${orig}`;
      if (i > 6) {
        clearInterval(id);
        document.title = orig;
      }
    }, 500);
  } catch {}
}

export function notifyNewMessage({ title = "New message", body = "", tag = "chat" } = {}) {
  try {
    if ("Notification" in window && Notification.permission === "granted") {
      const n = new Notification(title, { body, tag });
      if (navigator.vibrate) navigator.vibrate(100);
      return;
    }
  } catch {}
  // Fallbacks
  beep();
  flashTitle();
}
