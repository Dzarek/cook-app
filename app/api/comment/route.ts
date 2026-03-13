import webpush from "web-push";
import { query } from "../../../notification/db";

webpush.setVapidDetails(
  process.env.NEXT_PUBLIC_WEB_PUSH_EMAIL!,
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY!,
  process.env.WEB_PUSH_PRIVATE_KEY!,
);

type SubscriptionKeys = { p256dh: string; auth: string };
type PushSubscriptionDB = {
  id: number;
  endpoint: string;
  expirationTime: number | null;
  p256dh: string;
  auth: string;
};

export const POST = async (request: Request) => {
  try {
    const bodyData = (await request.json()) as {
      title: string;
      body: string;
      tag: string;
      subscription?: {
        endpoint: string;
        expirationTime: number | null;
        keys: SubscriptionKeys;
      };
      recipeID: string;
    };
    const { title, body, tag, subscription, recipeID } = bodyData;

    if (!title || !body) {
      return new Response(JSON.stringify({ error: "Brak tytułu lub treści" }), {
        status: 400,
      });
    }
    // jeśli jest subskrypcja, zapisz w DB
    if (subscription) {
      const { endpoint, expirationTime, keys } = subscription;
      const { p256dh, auth } = keys;

      await query({
        query: "DELETE FROM comments WHERE endpoint = ?",
        values: [endpoint],
      });

      await query({
        query:
          "INSERT INTO comments (tag, title, body, endpoint, expirationTime, p256dh, auth, recipeID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        values: [
          tag,
          title,
          body,
          endpoint,
          expirationTime,
          p256dh,
          auth,
          recipeID,
        ] as any[],
      });
    }
    // pobierz wszystkie subskrypcje
    const subscriptions = (await query({
      query: "SELECT * FROM comments",
      values: [],
    })) as PushSubscriptionDB[];

    // wyślij powiadomienie każdemu subskrybentowi
    await Promise.all(
      subscriptions.map(async (s) => {
        try {
          await webpush.sendNotification(
            {
              endpoint: s.endpoint,
              expirationTime: s.expirationTime,
              keys: { p256dh: s.p256dh, auth: s.auth },
            },
            JSON.stringify({ title, body, tag, recipeID }),
          );
        } catch (err: any) {
          // jeśli subskrypcja wygasła
          if (err.statusCode === 404 || err.statusCode === 410) {
            await query({
              query: "DELETE FROM comments WHERE id = ?",
              values: [s.id],
            });
          } else {
            console.error("Błąd wysyłki push:", err);
          }
        }
      }),
    );

    return new Response(JSON.stringify({ message: "Powiadomienia wysłane" }), {
      status: 200,
    });
  } catch (err) {
    console.error("Błąd API push:", err);
    return new Response(
      JSON.stringify({ error: "Nie udało się wysłać powiadomienia" }),
      {
        status: 500,
      },
    );
  }
};
