'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ArrowUp, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const menuItems = [
  { name: 'Ana Sayfa', href: '#home' },
  { name: 'Hakkımızda', href: '#about' },
  { name: 'Hizmetler', href: '#services' },
  { name: 'İletişim', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handler = () => {
      const scrollPos = window.scrollY + 140;
      let current = 'home';
      ['home', 'about', 'services', 'contact'].forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) current = id;
      });
      setActive(current);
    };
    handler();
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 10);
      setShowTop(y > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all ${
      scrolled ? 'bg-white/85 backdrop-blur-md border-b border-gray-200 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-24">
          {/* Logo - Absolute Left */}
          <div className="flex items-center space-x-3">
            <div className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-1">
              <Image src="/logo.png" alt="Webmahsul Logo" width={20} height={20} className="h-5 w-auto" priority />
            </div>
            
            <span className="text-xl font-bold text-gray-900">Webmahsul</span>
          </div>

          <div className={`hidden lg:flex items-center gap-5 flex-1 justify-center`}>
            {menuItems.map((item) => {
              const isContact = item.name === 'İletişim'
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={isContact ? (e) => { e.preventDefault(); window.__wmAssistantOpen?.(); } : undefined}
                  className={`px-5 py-2.5 rounded-full text-sm md:text-base font-medium cursor-pointer transition duration-200 transform hover:scale-105 ${
                    active === item.href.slice(1)
                      ? 'text-orange-700 bg-orange-50 shadow-sm ring-1 ring-orange-200 ring-offset-2 ring-offset-orange-50'
                      : 'text-gray-700 hover:text-orange-600 hover:underline underline-offset-4 hover:shadow-sm'
                  }`}
                >
                  {item.name}
                </a>
              )
            })}
          </div>

          <div className="hidden lg:flex items-center ml-auto">
            <button
              onClick={() => window.__wmAssistantOpen?.()}
              className="px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium hover:shadow-lg"
            >
              <span className="inline-flex items-center gap-2"><Bot className="w-5 h-5" /> Asistan</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <button
            onClick={() => window.__wmAssistantOpen?.()}
            className="lg:hidden ml-2 p-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg hover:shadow-xl transition-all animate-pulse"
            aria-label="Asistan"
            title="Asistan"
          >
            <Bot className="w-7 h-7" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed top-24 left-0 right-0 z-[60] bg-white text-gray-900 border-t border-gray-200 shadow-lg"
            >
              <div className="px-4 py-4 space-y-2 max-h-[calc(100vh-6rem)] overflow-y-auto">
                {menuItems.map((item) => {
                  const isContact = item.name === 'İletişim'
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        if (isContact) {
                          e.preventDefault();
                          window.__wmAssistantOpen?.()
                        }
                        setIsOpen(false)
                      }}
                      className={`block px-4 py-3 rounded-lg transition-colors text-base font-medium ${
                        active === item.href.slice(1)
                          ? 'bg-orange-50 text-orange-700'
                          : 'text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      {item.name}
                    </a>
                  )
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
    {showTop && !isOpen && (
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-20 right-6 z-50 px-4 py-3 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
        aria-label="Yukarı çık"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    )}
  </>
  );
}
