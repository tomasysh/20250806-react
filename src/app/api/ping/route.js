export function GET() {
  return Response.json({ ok: true, time: Date.now() });
}
