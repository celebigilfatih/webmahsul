'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Send, Bot, Sparkles, MessageSquare, HelpCircle } from 'lucide-react'

declare global {
  interface Window {
    __wmAssistantOpen?: () => void
    __wmAssistantToggle?: () => void
  }
}

export default function AssistantWidget() {
  const [open, setOpen] = useState(false)
  const [thread, setThread] = useState<{ from: 'assistant' | 'user'; text: string }[]>([])
  const [userMessage, setUserMessage] = useState('')
  const [step, setStep] = useState<'chat' | 'contact' | 'done'>('chat')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [sending, setSending] = useState(false)
  const [firstMessage, setFirstMessage] = useState<string>('')
  const [errors, setErrors] = useState<{ name?: string; contact?: string; email?: string; phone?: string }>({})
  const [countdown, setCountdown] = useState<number | null>(null)
  const [errorText, setErrorText] = useState<string | null>(null)

  useEffect(() => {
    if (open && thread.length === 0) {
      setThread([{ from: 'assistant', text: 'Size nasıl yardımcı olabilirim?' }])
    }
  }, [open, thread.length])

  useEffect(() => {
    window.__wmAssistantOpen = () => setOpen(true)
    window.__wmAssistantToggle = () => setOpen((v) => !v)
  }, [])

  const suggestions: { text: string; Icon: React.ComponentType<{ className?: string }> }[] = [
    { text: 'Hızlı fiyat teklifi', Icon: Sparkles },
    { text: 'Proje planı hakkında bilgi', Icon: HelpCircle },
    { text: 'Destek talebi oluştur', Icon: MessageSquare },
  ]

  const pickSuggestion = (text: string) => {
    setThread((t) => [
      ...t,
      { from: 'user', text },
      { from: 'assistant', text: 'Talebiniz alındı, size en kısa zamanda dönüş yapacağız. İletişim için adınızı ve e‑posta/telefonunuzu paylaşır mısınız?' },
    ])
    setFirstMessage((prev) => prev || text)
    setStep('contact')
  }

  const sendUserMessage = async () => {
    const msg = userMessage.trim()
    if (!msg) return
    setThread((t) => [...t, { from: 'user', text: msg }])
    setFirstMessage((prev) => prev || msg)
    setUserMessage('')
    setThread((t) => [
      ...t,
      { from: 'assistant', text: 'Talebiniz alındı, size en kısa zamanda dönüş yapacağız. İletişim için adınızı ve e‑posta/telefonunuzu paylaşır mısınız?' },
    ])
    setStep('contact')
  }

  const submitContact = async () => {
    const nextErrors: { name?: string; contact?: string; email?: string; phone?: string } = {}
    if (!name.trim()) nextErrors.name = 'Lütfen adınızı girin'
    if (!(email.trim() || phone.trim())) nextErrors.contact = 'E-posta veya telefon zorunlu'
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) nextErrors.email = 'Geçerli bir e-posta girin'
    if (phone.trim() && phone.replace(/\D/g, '').length < 10) nextErrors.phone = 'Geçerli bir telefon girin'
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setSending(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message: firstMessage || userMessage })
      })
      const data = await res.json()
      if (res.ok && data.ok) {
        setThread((t) => [...t, { from: 'assistant', text: 'Teşekkür ederiz! Mesajınız bize ulaştı.' }])
        setStep('done')
        setCountdown(5)
        setErrorText(null)
      } else {
        const desc = data?.description || data?.error || 'bilinmiyor'
        setErrorText(typeof desc === 'string' ? desc : 'bilinmiyor')
        setThread((t) => [...t, { from: 'assistant', text: `Gönderim sırasında bir hata oluştu: ${desc}` }])
      }
    } catch {
      setThread((t) => [...t, { from: 'assistant', text: 'Ağ hatası oluştu.' }])
      setErrorText('Ağ hatası oluştu')
    } finally {
      setSending(false)
    }
  }

  useEffect(() => {
    if (step === 'done' && open) {
      setCountdown((c) => (c == null ? 5 : c))
      const tick = setInterval(() => {
        setCountdown((c) => (typeof c === 'number' && c > 0 ? c - 1 : c))
      }, 1000)
      const to = setTimeout(() => {
        setOpen(false)
        setCountdown(null)
      }, 5000)
      return () => {
        clearInterval(tick)
        clearTimeout(to)
      }
    }
  }, [step, open])

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[70]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center p-4"
          >
            <div className="w-[840px] max-w-[95vw] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  <div className="font-semibold">Webmahsul Assistant</div>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Kapat" className="p-1 rounded hover:bg-white/20">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-5 space-y-3 max-h-[60vh] overflow-y-auto">
                {thread.map((m, i) => (
                  <div key={i} className={`${m.from === 'user' ? 'text-right' : 'text-left'}`}>
                    <span className={`${m.from === 'user' ? 'inline-block bg-orange-50 text-orange-700' : 'inline-block bg-gray-100 text-gray-800'} px-4 py-2 rounded-2xl`}>{m.text}</span>
                  </div>
                ))}
                {step === 'chat' && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {suggestions.map(({ text, Icon }, idx) => (
                      <button
                        key={idx}
                        onClick={() => pickSuggestion(text)}
                        className="px-3 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200 flex items-center gap-2"
                      >
                        <Icon className="w-4 h-4" />
                        {text}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {step === 'chat' && (
                <div className="p-5 border-t border-gray-200">
                  <div className="flex gap-2">
                    <input
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder="Mesajınızı yazın"
                      className="flex-1 px-4 py-2 rounded-xl border border-gray-200 focus:border-orange-500 focus:outline-none"
                    />
                    <button
                      onClick={sendUserMessage}
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Gönder
                    </button>
                  </div>
                </div>
              )}
              {step === 'contact' && (
                <div className="p-5 border-t border-gray-200 space-y-2">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Adınız" className={`w-full px-4 py-2 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:outline-none`} />
                  {errors.name && <div className="text-xs text-red-600">{errors.name}</div>}
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta" className={`w-full px-4 py-2 rounded-xl border ${errors.email || errors.contact ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:outline-none`} />
                  {errors.email && <div className="text-xs text-red-600">{errors.email}</div>}
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefon" className={`w-full px-4 py-2 rounded-xl border ${errors.phone || errors.contact ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:outline-none`} />
                  {errors.phone && <div className="text-xs text-red-600">{errors.phone}</div>}
                  {errors.contact && <div className="text-xs text-red-600">{errors.contact}</div>}
                  <button onClick={submitContact} disabled={sending} className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:shadow-lg disabled:opacity-60">
                    İlet
                  </button>
                  {errorText && (
                    <div className="mt-2 text-xs text-red-600">
                      {errorText.includes('Chat ID') ? (
                        <div className="space-y-2">
                          <div>Telegram’da botu başlatın ve bir mesaj gönderin.</div>
                          <div className="flex gap-2">
                            <a href="https://t.me/WebmahsulBot" target="_blank" rel="noreferrer" className="px-3 py-2 rounded-full bg-gray-100 text-gray-800 hover:bg-gray-200">Telegram’ı Aç</a>
                            <button onClick={submitContact} className="px-3 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600">Yeniden Dene</button>
                          </div>
                        </div>
                      ) : (
                        <div>{errorText}</div>
                      )}
                    </div>
                  )}
                </div>
              )}
              {step === 'done' && (
                <div className="p-5 border-t border-gray-200 text-center text-sm text-gray-600">
                  Teşekkür ederiz! Mesajınız bize ulaştı.
                  {typeof countdown === 'number' && (
                    <div className="mt-2 text-xs text-gray-500">Pencere {countdown}s içinde kapanacak</div>
                  )}
                  <button onClick={() => { setOpen(false); setCountdown(null) }} className="mt-3 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-lg">
                    Şimdi Kapat
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
