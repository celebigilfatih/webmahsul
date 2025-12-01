import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

type RateEntry = { count: number; windowStart: number }
type WmStatus = { lastSuccess?: string }
interface WmGlobal { __wmRate?: Map<string, RateEntry>; __wmStatus?: WmStatus }

export async function POST(req: Request) {
  try {
    const body = await req.json() as { name?: string; email?: string; phone?: string; message?: string; honeypot?: string }
    const { name, email, phone, message, honeypot } = body
    const g = globalThis as unknown as WmGlobal
    g.__wmRate = g.__wmRate || new Map<string, RateEntry>()
    const rateStore: Map<string, RateEntry> = g.__wmRate
    const ipHeader = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || ''
    const ip = (ipHeader.split(',')[0] || 'unknown').trim()
    const now = Date.now()
    const WINDOW_MS = 60_000
    const LIMIT = 5
    const current = rateStore.get(ip) || { count: 0, windowStart: now }
    if (now - current.windowStart > WINDOW_MS) {
      current.count = 0
      current.windowStart = now
    }
    current.count += 1
    rateStore.set(ip, current)
    if (current.count > LIMIT) {
      const retryAfterMs = current.windowStart + WINDOW_MS - now
      return NextResponse.json({ error: 'Çok fazla istek', retryAfterMs }, { status: 429 })
    }
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Mesaj gerekli' }, { status: 400 })
    }
    if (typeof honeypot === 'string' && honeypot.trim().length > 0) {
      return NextResponse.json({ ok: true })
    }
    const token = process.env.TELEGRAM_BOT_TOKEN
    let chatId = process.env.TELEGRAM_CHAT_ID
    if (!token) {
      return NextResponse.json({ error: 'Sunucu yapılandırılmamış', missingEnv: ['TELEGRAM_BOT_TOKEN'] }, { status: 500 })
    }
    if (!chatId) {
      try {
        const uRes = await fetch(`https://api.telegram.org/bot${token}/getUpdates`)
        const uData: {
          ok?: boolean
          description?: string
          result?: Array<{
            message?: { chat?: { id?: number }, from?: { id?: number } }
            my_chat_member?: { chat?: { id?: number } }
          }>
        } = await uRes.json()
        const updates = Array.isArray(uData?.result) ? uData.result : []
        const last = [...updates].reverse().find((u) =>
          (u.message && (u.message.chat?.id || u.message.from?.id)) || u.my_chat_member?.chat?.id
        )
        const found = last?.message?.chat?.id || last?.message?.from?.id || last?.my_chat_member?.chat?.id
        chatId = found ? found.toString() : undefined
        if (!chatId && uData?.ok === false && uData?.description?.toLowerCase().includes('conflict')) {
          return NextResponse.json({ error: 'Chat ID alınamadı', description: uData.description, hint: 'Webhook açık olabilir, TELEGRAM_CHAT_ID ayarlayın veya deleteWebhook çağırın' }, { status: 500 })
        }
      } catch {}
    }
    if (!chatId) {
      return NextResponse.json({ error: 'Chat ID bulunamadı. Lütfen bota bir mesaj gönderin.', missingEnv: ['TELEGRAM_CHAT_ID'] }, { status: 500 })
    }
    const text = `Yeni mesaj\nİsim: ${name || '-'}\nE-posta: ${email || '-'}\nTelefon: ${phone || '-'}\nMesaj: ${message}`
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    })
    const data: { ok?: boolean; description?: string } = await res.json()
    if (!data.ok) {
      return NextResponse.json({ error: 'Telegram gönderimi başarısız', description: data?.description }, { status: 502 })
    }
    g.__wmStatus = g.__wmStatus || {}
    g.__wmStatus.lastSuccess = new Date().toISOString()
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'İstek hatalı' }, { status: 400 })
  }
}
