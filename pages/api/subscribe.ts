// pages/api/subscribe.ts
import type { NextApiRequest, NextApiResponse } from "next";
import MailerLite from "@mailerlite/mailerlite-nodejs";

const mailerlite = new MailerLite({ api_key: process.env.MAILERLITE_API_KEY! });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const subscriber = await mailerlite.subscribers.createOrUpdate({ email });
    // manually extract just the JSON-safe fields you need
    const safeSubscriber = {
      id: subscriber.id,
      email: subscriber.email,
      status: subscriber.status,       // if these exist
      subscribed_at: subscriber.subscribed_at
    };
    return res.status(201).json({ success: true, subscriber: safeSubscriber });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal error." });
  }
}
