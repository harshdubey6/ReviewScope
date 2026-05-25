// GitHub webhook proxy for the Next.js dashboard app.
// The dashboard receives GitHub deliveries at /api/webhooks/github and forwards
// them to the real API service, which performs DB sync and review job enqueueing.

const API_WEBHOOK_URL = process.env.API_WEBHOOK_URL || 'http://127.0.0.1:3001/webhooks/github';

export async function GET() {
  return new Response(JSON.stringify({ status: 'ok', message: 'GitHub webhook proxy is active' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.arrayBuffer();

    const forwardHeaders = new Headers();
    for (const headerName of [
      'content-type',
      'x-github-event',
      'x-github-delivery',
      'x-hub-signature-256',
      'user-agent',
    ]) {
      const headerValue = req.headers.get(headerName);
      if (headerValue) forwardHeaders.set(headerName, headerValue);
    }

    const response = await fetch(API_WEBHOOK_URL, {
      method: 'POST',
      headers: forwardHeaders,
      body,
    });

    const responseText = await response.text();
    return new Response(responseText, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('content-type') || 'application/json',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const dynamic = 'force-dynamic';
