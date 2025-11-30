'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: 'Ana Sayfa', href: '#home' },
  { name: 'Hakkımızda', href: '#about' },
  { name: 'Hizmetler', href: '#services' },
  { name: 'İletişim', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-24">
          {/* Logo - Absolute Left */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">WM</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Webmahsul</span>
          </div>

          <div className={`hidden lg:flex items-center gap-5 ml-auto`}>
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-5 py-2.5 text-gray-700 hover:text-orange-600 transition-colors rounded-full text-sm md:text-base font-medium cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </div>

          

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden ml-auto p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-gray-800 hover:bg-gray-100 rounded-lg transition-colors text-base font-medium"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
