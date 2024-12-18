"use client";

const CONFIG = {
  PUBLIC_KEY: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  PRIVATE_KEY: process.env.NEXT_PUBLIC_WEB_PUSH_PRIVATE_KEY,
};
export const unregisterServiceWorkers2 = async () => {
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((r) => r.unregister()));
};

const registerServiceWorker2 = async () => {
  return navigator.serviceWorker.register("/sw.js");
};

const saveSubscription2 = async (
  subscription: any,
  title: string,
  body: string,
  tag: string
) => {
  const ORIGIN = window.location.origin;
  const BACKEND_URL = `${ORIGIN}/api/comment`;

  const response = await fetch(BACKEND_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subscription,
      title,
      body,
      tag,
    }),
  });
  return response.json();
};

export const subscribe2 = async (
  title: string,
  body: string,
  tag: string,
  userID: string
) => {
  const ORIGIN = window.location.origin;
  const BACKEND_URL = `${ORIGIN}/api/comment`;

  const swRegistration = await registerServiceWorker2();
  await Notification.requestPermission();

  try {
    const options = {
      applicationServerKey: CONFIG.PUBLIC_KEY,
      userVisibleOnly: true,
    };
    const swRegistration = await registerServiceWorker2();
    await Notification.requestPermission();
    const subscription = await swRegistration.pushManager.subscribe(options);
    await saveSubscription2(subscription, title, body, tag);
    if (!userID || userID === undefined) {
      await unregisterServiceWorkers2();
    }
    await fetch(BACKEND_URL);
  } catch (err) {
    console.error("Error", err);
  }
};
