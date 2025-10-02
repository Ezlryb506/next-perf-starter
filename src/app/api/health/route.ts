export const revalidate = 10
export async function GET() {
  return Response.json({ ok: true, ts: Date.now() })
}
