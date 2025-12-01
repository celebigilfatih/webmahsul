import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET() {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  return NextResponse.json({
    ok: Boolean(token),
    env: {
      TELEGRAM_BOT_TOKEN: token ? 'present' : 'missing',
      TELEGRAM_CHAT_ID: chatId ? 'present' : 'missing',
    },
  })
}
