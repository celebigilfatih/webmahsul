'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const contactInfo = [
    {
      icon: Mail,
      title: 'E-posta',
      value: 'info@webmahsul.com.tr',
      href: 'mailto:info@webmahsul.com.tr',
    },
    {
      icon: Phone,
      title: 'Telefon',
      value: '+90 (530) 575 83 77',
      href: 'tel:+905305758377',
    },
    {
      icon: MapPin,
      title: 'Adres',
      value: 'İstanbul, Türkiye',
      href: '#',
    },
  ];

  return (
    <section id="contact" ref={ref} className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            İletişim
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sorularınız, proje talepleriniz veya işbirlikleri için bizimle iletişime geçebilirsiniz.
          </p>
          <p className="text-2xl font-semibold text-orange-600 mt-4">
            Siz hayal edin, Webmahsul geliştirsin.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-1 gap-12">
          {/* Contact Info - Full Width */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto w-full"
          >
            <div className="grid md:grid-cols-3 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.a
                    key={index}
                    href={info.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200 hover:border-orange-500 transition-all group text-center"
                  >
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-sm text-gray-500 mb-2">{info.title}</div>
                    <div className="text-lg font-semibold text-gray-900">{info.value}</div>
                  </motion.a>
                );
              })}
            </div>

            {/* Decorative Element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white mt-8 text-center"
            >
              <h4 className="text-2xl font-bold mb-4">Hızlı İletişim</h4>
              <p className="leading-relaxed mb-6 max-w-2xl mx-auto">
                7/24 destek ekibimiz sizin için hazır. Projeleriniz için ücretsiz danışmanlık alın ve dijital dönüşüm yolculuğunuza hemen başlayın.
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Şu anda çevrimiçiyiz</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
