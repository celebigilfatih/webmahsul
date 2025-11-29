'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, Shield, Zap, CheckCircle2, TrendingUp } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const features = [
    {
      icon: Target,
      title: 'Deneyimli Teknik Kadro',
      description: 'Siber güvenlikten yazılım geliştirmeye kadar geniş uzmanlığa sahip bir ekip.',
    },
    {
      icon: Zap,
      title: 'Tamamen Özelleştirilebilir',
      description: 'Her projeyi müşteri ihtiyaçlarına göre şekillendiriyoruz.',
    },
    {
      icon: Shield,
      title: 'Güvenlik Odaklı',
      description: 'Geliştirdiğimiz tüm ürünler kurumsal güvenlik standartlarına uygundur.',
    },
    {
      icon: Users,
      title: 'Sürekli Destek & Bakım',
      description: 'Yazılımın yaşam döngüsünün her aşamasında yanınızdayız.',
    },
  ];

  const expertiseAreas = [
    'Sporcu takip ve performans yönetimi yazılımları',
    'Antrenman çizim ve planlama araçları',
    'Turnuva yönetimi ve istatistik sistemleri',
    'Aidat takip ve finansal yönetim çözümleri',
    'Spor kulüpleri için CMS sistemleri',
    'Özel entegrasyon ve kurumsal yazılım projeleri',
  ];

  return (
    <section id="about" ref={ref} className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 scroll-mt-24">
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
            Hakkımızda
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-orange-600 mx-auto rounded-full" />
        </motion.div>

        {/* Hero Content */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-6">
            <strong className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Webmahsul</strong>, 
            modern teknolojiyle şekillenmiş yenilikçi yazılımlar geliştiren bir <strong className="text-gray-900">yazılım şirketi</strong>dir.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            Spor kulüplerinden kurumsal işletmelere, kamu kurumlarından özel sektör firmalarına kadar geniş bir yelpazede; 
            veriyi anlamlandıran, yönetimi kolaylaştıran ve süreçleri otomatikleştiren çözümler sunuyoruz.
          </p>
        </motion.div>

        {/* Vision Box */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-12 mb-20 overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <TrendingUp className="w-5 h-5" />
              <span className="font-semibold">Vizyonumuz</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold leading-relaxed max-w-3xl mx-auto">
              Kurumların dijital dönüşüm süreçlerini hızlandıran, güvenli, ölçeklenebilir ve kullanıcı dostu yazılımlar geliştirmek
            </h3>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="group bg-white rounded-2xl p-6 border border-gray-200/50 hover:border-orange-500 hover:shadow-xl transition-all"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Expertise Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-white rounded-3xl p-10 md:p-12 border border-gray-200/50 shadow-lg"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Uzmanlık Alanlarımız
            </h3>
            <p className="text-gray-600">Modern teknolojilerle geliştirdiğimiz çözümler</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            {expertiseAreas.map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.7 + index * 0.05, duration: 0.5 }}
                className="flex items-start gap-3 group p-3 rounded-xl hover:bg-orange-50 transition-colors"
              >
                <CheckCircle2 className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                <p className="text-gray-700 leading-relaxed group-hover:text-gray-900 transition-colors">
                  {area}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate={isInView ? 'animate' : 'initial'}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
        >
          {[
            { value: '50+', label: 'Başarılı Proje' },
            { value: '100+', label: 'Mutlu Müşteri' },
            { value: '%99', label: 'Memnuniyet' },
            { value: '7/24', label: 'Destek' },
          ].map((stat, idx) => (
            <div key={idx} className="text-center p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-200/50 hover:shadow-lg hover:scale-105 transition-all">
              <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
