'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Lock, Headphones, Zap } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function WhyUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Users,
      title: 'Deneyimli Teknik Kadro',
      description: 'Siber güvenlikten yazılım geliştirmeye kadar geniş uzmanlığa sahip bir ekip.',
    },
    {
      icon: Award,
      title: 'Tamamen Özelleştirilebilir Çözümler',
      description: 'Her projeyi müşteri ihtiyaçlarına göre şekillendiriyoruz.',
    },
    {
      icon: Lock,
      title: 'Güvenlik Odaklı Yaklaşım',
      description: 'Geliştirdiğimiz tüm ürünler kurumsal güvenlik standartlarına uygundur.',
    },
    {
      icon: Headphones,
      title: 'Sürekli Destek & Bakım',
      description: 'Yazılımın yaşam döngüsünün her aşamasında yanınızdayız.',
    },
    {
      icon: Zap,
      title: 'Modern Teknolojiler',
      description: 'Next.js, Node.js, MySQL, Docker, CI/CD ve bulut teknolojileri ile yüksek performanslı mimariler.',
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
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
            Neden Webmahsul?
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full" />
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/50 rounded-2xl p-8 hover:shadow-xl hover:border-orange-200 transition-all">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-orange-50 to-orange-100/50 border border-orange-200/50 rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Projenizi Birlikte Hayata Geçirelim
            </h3>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              Dijital dönüşüm yolculuğunuzda size rehberlik edecek deneyimli ekibimizle tanışın
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-medium hover:shadow-xl transition-shadow">
              Ücretsiz Danışmanlık Alın
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
