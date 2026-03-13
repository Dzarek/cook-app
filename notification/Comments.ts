"use client";

const CONFIG = {
  PUBLIC_KEY: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY!,
};

const registerServiceWorker = async () => {
  return navigator.serviceWorker.register("/sw.js");
};

const saveSubscription = async (
  subscription: PushSubscription,
  title: string,
  body: string,
  tag: string,
  recipeID: string,
) => {
  const ORIGIN = window.location.origin;
  const BACKEND_URL = `${ORIGIN}/api/comment`;

  return fetch(BACKEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ subscription, title, body, tag, recipeID }),
  });
};

export const subscribe = async (
  title: string,
  body: string,
  tag: string,
  userID: string | undefined,
  recipeID: string,
) => {
  if (!userID) return; // tylko zalogowani

  try {
    const permission = await Notification.requestPermission();
    if (permission !== "granted") return;

    const swRegistration = await registerServiceWorker();
    const existingSub = await swRegistration.pushManager.getSubscription();

    let subscription = existingSub;
    if (!subscription) {
      subscription = await swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: CONFIG.PUBLIC_KEY,
      });
    }

    await saveSubscription(subscription, title, body, tag, recipeID);
  } catch (err) {
    console.error("Błąd subskrypcji push:", err);
  }
};

export const unregisterServiceWorkers = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((r) => r.unregister()));
};
