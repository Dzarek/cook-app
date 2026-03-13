"use client";

const CONFIG = {
  PUBLIC_KEY: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY!,
};

const registerServiceWorker = async () => {
  return navigator.serviceWorker.register("/sw.js");
};

export const subscribePush = async () => {
  const swRegistration = await registerServiceWorker();

  const existingSub = await swRegistration.pushManager.getSubscription();
  if (existingSub) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const subscription = await swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: CONFIG.PUBLIC_KEY,
  });

  await fetch("/api/push", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "subscribe",
      subscription,
    }),
  });
};
