'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, Mail, MousePointer, Smile, Zap, MessageCircle, Coffee, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Animation variants for better performance
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const floatAnimation = {
  y: [0, -20, 0],
};

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Hero slides data
  const slides = [
    {
      title: "Akıllı Yazılımlarla",
      subtitle: "İşinizi Güçlendiriyoruz",
      description: "Sporcu takibi, antrenman planlama, turnuva yönetimi ve Active Directory çözümlerinde uzman yazılım ekibimizle işletmenize özel dijital çözümler üretiyoruz."
    },
    {
      title: "Modern Teknoloji ile",
      subtitle: "Yenilikçi Çözümler",
      description: "Webmahsul, modern teknolojiyle şekillenmiş yenilikçi yazılımlar geliştiren bir yazılım şirketidir. Veriyi anlamlandıran, yönetimi kolaylaştıran ve süreçleri otomatikleştiren çözümler sunuyoruz."
    },
    {
      title: "Dijital Dönüşümünüzü",
      subtitle: "Hızlandırıyoruz",
      description: "Kurumların dijital dönüşüm süreçlerini hızlandıran, güvenli, ölçeklenebilir ve kullanıcı dostu yazılımlar geliştiriyoruz."
    },
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  // Floating icons data - Balanced positioning around the image
  const floatingIcons = [
    { Icon: Mail, position: 'top-10 left-[15%]', delay: 0, duration: 3.2 },
    { Icon: Smile, position: 'top-10 right-[15%]', delay: 0.5, duration: 3.8 },
    { Icon: MousePointer, position: 'top-1/2 left-[5%]', delay: 1, duration: 3.5 },
    { Icon: Coffee, position: 'top-1/2 right-[5%]', delay: 0.8, duration: 3 },
    { Icon: MessageCircle, position: 'bottom-10 left-[20%]', delay: 1.2, duration: 3.4 },
    { Icon: Zap, position: 'bottom-10 right-[20%]', delay: 0.3, duration: 3.6 },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 pt-24 scroll-mt-24">
      {/* Optimized background - static instead of animated */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-orange-100 rounded-full filter blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-50 rounded-full filter blur-3xl" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:pr-12">
            {/* Slider Navigation Dots */}
            <div className="flex gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                    index === currentSlide
                      ? 'bg-orange-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Animated Heading with Slider Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
                  {slides[currentSlide].title}
                  <br />
                  <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                    {slides[currentSlide].subtitle}
                  </span>
                </h1>
              </motion.div>
            </AnimatePresence>

            <div className="relative md:-mt-8">
              <h2 className="text-[48px] sm:text-[80px] md:text-[120px] lg:text-[160px] font-black text-gray-200/40 leading-none select-none pointer-events-none">
                WEBMAHSUL
              </h2>
            </div>

            {/* Description with Slider Content */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentSlide}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-base text-gray-600 max-w-md leading-relaxed -mt-8 relative z-10"
              >
                {slides[currentSlide].description}
              </motion.p>
            </AnimatePresence>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-medium hover:shadow-xl transition-shadow cursor-pointer">
                Hemen Başlayın
              </button>
              <button onClick={() => window.__wmAssistantOpen?.()} className="px-8 py-4 bg-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-400 transition-colors cursor-pointer">
                İletişime Geçin
              </button>
            </motion.div>

            {/* Slider Arrow Controls */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={prevSlide}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextSlide}
                className="w-12 h-12 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Content - 3D Computer */}
          <div className="relative lg:pl-12">
            {/* Floating Decorative Icons - Behind Image */}
            <div className="absolute inset-0 pointer-events-none z-0">
              {floatingIcons.map((item, index) => {
                const Icon = item.Icon;
                return (
                  <motion.div
                    key={index}
                    className={`absolute ${item.position} w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center opacity-50 shadow-lg`}
                    animate={{
                      y: [0, -30, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                      duration: item.duration,
                      repeat: Infinity,
                      delay: item.delay,
                      ease: "easeInOut"
                    }}
                  >
                    <Icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </motion.div>
                );
              })}
            </div>

            <div className="relative w-full max-w-3xl mx-auto">
              {/* Main Computer Image with optimized animation */}
              <motion.div
                animate={floatAnimation}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <Image
                  src="/images/hero.png"
                  alt="3D Computer Illustration"
                  width={900}
                  height={900}
                  className="w-full h-auto"
                  priority
                  quality={90}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-gray-400">
          <span className="text-sm">Aşağı kaydırın</span>
          <span className="text-sm mb-1">daha fazlasını keşfedin</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
