// pages/api/subscribe.ts
import type { NextApiRequest, NextApiResponse } from "next";

const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY!;
const GROUP_ID = process.env.MAILERLITE_GROUP_ID!;
const API_BASE = "https://api.mailerlite.com/api/v2";

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
    // Add subscriber to group directly via API
    const response = await fetch(`${API_BASE}/groups/${GROUP_ID}/subscribers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-MailerLite-ApiKey': MAILERLITE_API_KEY
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('MailerLite API Error:', errorData);
      return res.status(response.status).json({ error: "Failed to subscribe." });
    }

    const subscriberData = await response.json();
    return res.status(201).json({ success: true, subscriber: subscriberData });

  } catch (error: any) {
    console.error("MailerLite API Error:", error);
    return res.status(500).json({ error: "Failed to subscribe. Please try again later." });
  }
}
