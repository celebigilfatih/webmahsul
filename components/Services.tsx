'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Users, PenTool, Trophy, Shield, Network, Code } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const services = [
    {
      icon: Users,
      title: 'Sporcu Takip Sistemi',
      description: 'Sporcuların performans, gelişim, sağlık ve antrenman süreçlerini tek panelden yönetmenizi sağlayan profesyonel bir yazılım çözümü.',
    },
    {
      icon: PenTool,
      title: 'Antrenman Çizim & Planlama',
      description: 'React-konva tabanlı gelişmiş saha çizim aracı ile antrenman yöntemleri oluşturun, oyuncu gruplarına atayın ve ilerlemelerini takip edin.',
    },
    {
      icon: Trophy,
      title: 'Turnuva Yönetim Yazılımı',
      description: 'Maç programı oluşturma,fikstür yönetimi, takımlar, oyuncular ve istatistiklerin tek merkezden yönetildiği modern turnuva yazılımı.',
    },
    {
      icon: Users,
      title: 'Aidat Takip Sistemi',
      description: 'Spor kulüpleri ve dernekler için üye aidatı takibi, otomatik hatırlatmalar, ödeme raporları ve finansal yönetim çözümü.',
    },
    {
      icon: Code,
      title: 'Spor Kulüpleri CMS',
      description: 'Spor kulüplerine özel içerik yönetim sistemi. Haber, galeri, fikstür, canlı skor ve kullanıcı yönetimini tek platformda gerçekleştirin.',
    },

    {
      icon: Code,
      title: 'Özel Yazılım Geliştirme',
      description: 'İşletmenizin ihtiyacına özel yazılımlar geliştiriyor, sıfırdan uçtan uca çözümler üretiyoruz.',
    },
  ];

  return (
    <section id="services" ref={ref} className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Hizmetlerimiz
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full" />
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-gradient-to-br from-gray-50 to-white border border-gray-200/50 rounded-2xl p-8 hover:shadow-xl hover:border-orange-200 transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
