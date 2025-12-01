import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { name, email, phone, message } = await req.json()
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Mesaj gerekli' }, { status: 400 })
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
    const data = await res.json()
    if (!data.ok) {
      return NextResponse.json({ error: 'Telegram gönderimi başarısız', description: data?.description }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'İstek hatalı' }, { status: 400 })
  }
}
