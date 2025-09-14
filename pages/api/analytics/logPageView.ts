import type { NextApiRequest, NextApiResponse } from 'next';

// This endpoint simulates an analytics logger
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  // Pretend we log the event and respond quickly
  // In a real system, would send this off to analytics/
  // logging infra, maybe async.
  // No error thrown: non-blocking and fire-and-forget from client
  // Accepts: { event: string, timestamp: number }
  await new Promise(r => setTimeout(r, 30)); // artificial delay
  res.status(204).end();
}
