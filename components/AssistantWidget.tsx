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
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [hp, setHp] = useState('')

  useEffect(() => {
    if (open && thread.length === 0) {
      setThread([{ from: 'assistant', text: 'Size nasıl yardımcı olabilirim?' }])
    }
  }, [open, thread.length])

  useEffect(() => {
    window.__wmAssistantOpen = () => setOpen(true)
    window.__wmAssistantToggle = () => setOpen((v) => !v)
  }, [])

  const suggestions: { text: string; Icon: React.ComponentType<{ className?: string }>; type: 'offer' | 'info' | 'support' }[] = [
    { text: 'Hızlı fiyat teklifi', Icon: Sparkles, type: 'offer' },
    { text: 'Proje planı hakkında bilgi', Icon: HelpCircle, type: 'info' },
    { text: 'Destek talebi oluştur', Icon: MessageSquare, type: 'support' },
  ]
  const topicPlaceholders: Record<string, string> = {
    'Hızlı fiyat teklifi': 'Ürün/hizmet, kapsam, zaman ve bütçe bilgilerini yazın',
    'Proje planı hakkında bilgi': 'Hedefler, zaman çizelgesi ve teknoloji beklentilerini yazın',
    'Destek talebi oluştur': 'Hata, etkilenen sistem ve aciliyet bilgilerini yazın',
  }
  const chipTypeClass: Record<'offer' | 'info' | 'support', string> = {
    offer: 'bg-orange-50 text-orange-700 border border-orange-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    support: 'bg-rose-50 text-rose-700 border border-rose-200',
  }
  const chipAnimClass: Record<'offer' | 'info' | 'support', string> = {
    offer: 'animate-glow',
    info: '',
    support: 'animate-wiggle',
  }
  const reorderTopics = (from: number, to: number) => {
    setSelectedTopics((prev) => {
      const arr = [...prev]
      const [m] = arr.splice(from, 1)
      arr.splice(to, 0, m)
      return arr
    })
  }

  const pickSuggestion = (text: string) => {
    setSelectedTopics((prev) => (prev.includes(text) ? prev : [...prev, text]))
    setStep('chat')
  }

  const sendUserMessage = async () => {
    const raw = userMessage.trim()
    const topicsText = selectedTopics.join(', ')
    const composed = raw || topicsText
    if (!composed) return
    setThread((t) => [...t, { from: 'user', text: composed }])
    if (raw) setFirstMessage((prev) => prev || raw)
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
        body: JSON.stringify({
          name,
          email,
          phone,
          message: [
            selectedTopics.length ? `[Konular] ${selectedTopics.join(', ')}` : null,
            (firstMessage || userMessage) ? `[Mesaj] ${firstMessage || userMessage}` : null,
          ].filter(Boolean).join('\n')
          , honeypot: hp
        })
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
                  <div className="font-semibold">Webmahsul Asistan</div>
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
                  {selectedTopics.length > 0 && (
                    <div className="mb-3 flex items-center gap-2 flex-wrap">
                      {selectedTopics.map((topic, idx) => {
                        const found = suggestions.find((s) => s.text === topic)
                        const Ico = found?.Icon || MessageSquare
                        const type = found?.type || 'info'
                        const cls = chipTypeClass[type]
                        const anim = chipAnimClass[type]
                        return (
                          <span
                            key={idx}
                            draggable
                            onDragStart={(e) => {
                              setDragIndex(idx)
                              e.dataTransfer.effectAllowed = 'move'
                              e.dataTransfer.setData('text/plain', String(idx))
                            }}
                            onDragEnd={() => setDragIndex(null)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault()
                              const from = parseInt(e.dataTransfer.getData('text/plain'), 10)
                              if (!Number.isNaN(from) && from !== idx) reorderTopics(from, idx)
                              setDragIndex(null)
                            }}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${cls} ${anim} ${dragIndex === idx ? 'opacity-70' : ''} cursor-move`}
                          >
                            <Ico className="w-4 h-4" />
                            {topic}
                            <button
                              aria-label="Konu kaldır"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedTopics((prev) => prev.filter((t) => t !== topic))
                              }}
                              className="ml-1 p-1 rounded hover:bg-white/40"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        )
                      })}
                      <button aria-label="Tüm konuları temizle" onClick={() => setSelectedTopics([])} className="px-2 py-1 text-xs rounded bg-gray-100 text-gray-700 hover:bg-gray-200">
                        Temizle
                      </button>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      value={userMessage}
                      onChange={(e) => setUserMessage(e.target.value)}
                      placeholder={selectedTopics.length === 0 ? 'Mesajınızı yazın' : selectedTopics.length === 1 ? (topicPlaceholders[selectedTopics[0]] || 'Seçilen konu için ayrıntı yazın') : 'Seçilen konular için ayrıntı yazın'}
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
                  <input value={hp} onChange={(e) => setHp(e.target.value)} placeholder="Web sitesi" className="hidden" />
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Adınız" className={`w-full px-4 py-2 rounded-xl border ${errors.name ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:outline-none`} />
                  {errors.name && <div className="text-xs text-red-600">{errors.name}</div>}
                  <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E-posta" className={`w-full px-4 py-2 rounded-xl border ${errors.email || errors.contact ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:outline-none`} />
                  {errors.email && <div className="text-xs text-red-600">{errors.email}</div>}
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Telefon" className={`w-full px-4 py-2 rounded-xl border ${errors.phone || errors.contact ? 'border-red-500' : 'border-gray-200'} focus:border-orange-500 focus:outline-none`} />
                  {errors.phone && <div className="text-xs text-red-600">{errors.phone}</div>}
                  {errors.contact && <div className="text-xs text-red-600">{errors.contact}</div>}
                  <button onClick={submitContact} disabled={sending} className="w-full px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:shadow-lg disabled:opacity-60">
                    Gönder
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
