'use client';

import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: 'Ana Sayfa', href: '#home' },
  { name: 'Hakkımızda', href: '#about' },
  { name: 'Hizmetler', href: '#services', hasDropdown: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-24 relative">
          {/* Logo - Absolute Left */}
          <div className="absolute left-4 sm:left-6 lg:left-8 flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">WM</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Webmahsul</span>
          </div>

          {/* Desktop Menu - Centered */}
          <div className="hidden lg:flex items-center space-x-3 bg-gray-300/60 backdrop-blur-md rounded-full px-3 py-2">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="px-6 py-2.5 text-gray-700 hover:text-gray-900 hover:bg-white/60 transition-all rounded-full text-sm font-medium flex items-center gap-1"
              >
                {item.name}
                {item.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </a>
            ))}
          </div>

          {/* Right Side - Absolute Right */}
          <div className="absolute right-4 sm:right-6 lg:right-8 hidden lg:flex items-center">
            <button className="px-6 py-2.5 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors text-sm">
              İletişim
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden absolute right-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
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
                  className="block px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <button className="w-full px-4 py-2.5 bg-black text-white rounded-lg font-medium mt-4">
                İletişim
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
