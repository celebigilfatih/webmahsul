import { NextResponse } from 'next/server'

type RateEntry = { count: number; windowStart: number }
type WmStatus = { lastSuccess?: string }
interface WmGlobal { __wmRate?: Map<string, RateEntry>; __wmStatus?: WmStatus }

export const runtime = 'nodejs'

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  let telegram: 'ok' | 'missing' | 'error' = token ? 'ok' : 'missing'
  let description: string | undefined
  if (token) {
    try {
      const res = await fetch(`https://api.telegram.org/bot${token}/getMe`)
      const data: { ok?: boolean; description?: string } = await res.json()
      if (!data?.ok) {
        telegram = 'error'
        description = data?.description
      }
    } catch (e: unknown) {
      telegram = 'error'
      description = String(e)
    }
  }
  const g = globalThis as unknown as WmGlobal
  const lastSuccess: string | undefined = g.__wmStatus?.lastSuccess
  return NextResponse.json({
    ok: Boolean(token),
    env: {
      TELEGRAM_BOT_TOKEN: token ? 'present' : 'missing',
      TELEGRAM_CHAT_ID: chatId ? 'present' : 'missing',
    },
    telegram,
    description,
    lastSuccess,
  })
}
