'use client';

import { motion } from 'framer-motion';
import { Instagram, Linkedin, Twitter, Github, Mail } from 'lucide-react';

export default function Footer() {
  const footerLinks = {
    'Şirket': [
      { name: 'Hakkımızda', href: '#about' },
      { name: 'Hizmetler', href: '#services' },
      { name: 'Blog', href: '#' },
      { name: 'Kariyer', href: '#' },
    ],
    'Hizmetler': [
      { name: 'Sporcu Takip Sistemi', href: '#services' },
      { name: 'Antrenman Planlama', href: '#services' },
      { name: 'Turnuva Yönetimi', href: '#services' },
      { name: 'Aidat Takip', href: '#services' },
      { name: 'Spor Kulüpleri CMS', href: '#services' },
    ],
    'Destek': [
      { name: 'İletişim', href: '#contact' },
      { name: 'SSS', href: '#' },
      { name: 'Dokümantasyon', href: '#' },
      { name: 'Gizlilik Politikası', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: 'mailto:info@webmahsul.com.tr', label: 'Email' },
  ];

  const slogans = [
    'Geleceği yazılımla şekillendirin. Webmahsul ile.',
    'Akıllı çözümler, güçlü dönüşümler.',
    'Yazılımın en verimli hali.',
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">W</span>
              </div>
              <span className="text-2xl font-bold">Webmahsul</span>
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              Modern teknolojiyle şekillenmiş yenilikçi yazılımlar geliştiren Ar-Ge merkeziniz. 
              Dijital dönüşüm yolculuğunuzda yanınızdayız.
            </p>
            
            {/* Rotating Slogan */}
            <div className="bg-gradient-to-r from-orange-900/50 to-orange-800/50 rounded-xl p-4 border border-orange-700/50">
              <p className="text-orange-200 text-sm italic">
                {slogans[0]}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-gray-800 hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-600 rounded-lg flex items-center justify-center transition-all"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-orange-500 transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}


        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Webmahsul. Tüm hakları saklıdır.
            </div>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-orange-500 transition-colors">
                Gizlilik Politikası
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Kullanım Şartları
              </a>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Çerez Politikası
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500"></div>
    </footer>
  );
}
