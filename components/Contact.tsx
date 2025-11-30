'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto w-full"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white mt-0 text-center"
            >
              <h4 className="text-2xl font-bold mb-4">Hızlı İletişim</h4>
              <p className="leading-relaxed mb-6 max-w-2xl mx-auto">
                7/24 destek ekibimiz sizin için hazır. Projeleriniz için ücretsiz danışmanlık alın ve Webmahsul Assistant ile hemen yazışın.
              </p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm">Şu anda çevrimiçiyiz</span>
              </div>
              <button
                onClick={() => window.__wmAssistantOpen?.()}
                className="mt-6 px-6 py-3 bg-white text-orange-700 rounded-full font-medium hover:shadow-lg"
              >
                Assistant&#39;ı Aç
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
