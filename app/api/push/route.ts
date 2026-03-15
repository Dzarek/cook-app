import webpush from "web-push";
import { query } from "@/notification/db";

webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_WEB_PUSH_EMAIL!,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY!,
  process.env.WEB_PUSH_PRIVATE_KEY!,
);

type PushSubscriptionDB = {
  id: number;
  endpoint: string;
  expirationTime: number | null;
  p256dh: string;
  auth: string;
};

export const POST = async (request: Request) => {
  const body = await request.json();

  try {
    // zapis subskrypcji
    if (body.action === "subscribe") {
      const { endpoint, expirationTime, keys } = body.subscription;
      const { p256dh, auth } = keys;

      // await query({
      //   query: "DELETE FROM push_subscriptions WHERE endpoint = ?",
      //   values: [endpoint] as any[],
      // });

      await query({
        query:
          "INSERT INTO push_subscriptions (endpoint, expirationTime, p256dh, auth) VALUES (?, ?, ?, ?)",
        values: [endpoint, expirationTime, p256dh, auth] as any[],
      });

      return Response.json({ success: true });
    }

    // wysyłanie powiadomień
    if (body.action === "notify") {
      const { title, body: text, tag, recipeID, type } = body;

      const subscriptions = (await query({
        query: "SELECT * FROM push_subscriptions",
        values: [],
      })) as PushSubscriptionDB[];

      if (!subscriptions.length) {
        return Response.json({ message: "Brak subskrypcji" });
      }

      await Promise.all(
        subscriptions.map(async (s: any) => {
          try {
            await webpush.sendNotification(
              {
                endpoint: s.endpoint,
                expirationTime: s.expirationTime,
                keys: {
                  p256dh: s.p256dh,
                  auth: s.auth,
                },
              },
              JSON.stringify({
                title,
                body: text,
                tag,
                recipeID,
                type,
              }),
            );
          } catch (err: any) {
            if (err.statusCode === 404 || err.statusCode === 410) {
              await query({
                query: "DELETE FROM push_subscriptions WHERE id = ?",
                values: [s.id] as any[],
              });
            }
          }
        }),
      );

      return Response.json({ success: true });
    }
  } catch (err) {
    console.error(err);
    return Response.json({ error: "push error" }, { status: 500 });
  }
};
