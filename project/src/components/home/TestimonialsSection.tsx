import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Card from '../common/Card';
import Badge from '../common/Badge';

const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Ahmed Ben Salem',
      role: 'Client fidèle',
      city: 'Tunis',
      rating: 5,
      content: 'Muatamad.tn m\'a permis de découvrir des commerçants exceptionnels dans ma région. La qualité des services et la transparence des avis m\'ont vraiment convaincu.',
      avatar: '👨‍💼',
      category: 'Alimentation'
    },
    {
      id: 2,
      name: 'Fatma Mansouri',
      role: 'Entrepreneuse',
      city: 'Sousse',
      rating: 5,
      content: 'En tant que commerçante, cette plateforme m\'a aidée à développer ma clientèle. Les clients peuvent facilement me trouver et me contacter.',
      avatar: '👩‍💼',
      category: 'Mode'
    },
    {
      id: 3,
      name: 'Mohamed Karray',
      role: 'Étudiant',
      city: 'Sfax',
      rating: 4,
      content: 'Parfait pour trouver des commerçants de confiance. J\'ai trouvé une excellente librairie grâce aux avis et recommandations.',
      avatar: '👨‍🎓',
      category: 'Éducation'
    },
    {
      id: 4,
      name: 'Leila Trabelsi',
      role: 'Mère de famille',
      city: 'Monastir',
      rating: 5,
      content: 'Je recommande vivement ! J\'ai trouvé des commerçants sérieux pour mes courses quotidiennes. Très pratique et fiable.',
      avatar: '👩‍👧‍👦',
      category: 'Famille'
    },
    {
      id: 5,
      name: 'Youssef Hammami',
      role: 'Chef d\'entreprise',
      city: 'Hammamet',
      rating: 5,
      content: 'Une plateforme qui valorise vraiment le commerce local. Les commerçants sont vérifiés et les services de qualité.',
      avatar: '👨‍💻',
      category: 'Services'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-softui-primary/5 via-white to-softui-secondary/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-softui-secondary mb-4">
            Ce que disent nos <span className="text-softui-primary">utilisateurs</span>
          </h2>
          <p className="text-lg text-softui-secondary/70 max-w-2xl mx-auto">
            Découvrez les témoignages de nos clients et commerçants satisfaits
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Témoignage principal */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="p-8 text-center relative">
                {/* Quote icon */}
                <div className="absolute top-6 left-6 text-softui-primary/20">
                  <Quote className="w-12 h-12" />
                </div>

                {/* Avatar et infos */}
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-softui-primary to-softui-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-3xl shadow-softxl">
                    {testimonials[currentIndex].avatar}
                  </div>
                  <h3 className="text-xl font-semibold text-softui-secondary mb-1">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="text-softui-secondary/70 mb-2">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].city}
                  </p>
                  <div className="flex items-center justify-center gap-1 mb-3">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-current" />
                    ))}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {testimonials[currentIndex].category}
                  </Badge>
                </div>

                {/* Contenu du témoignage */}
                <blockquote className="text-lg text-softui-secondary/80 italic leading-relaxed mb-6">
                  "{testimonials[currentIndex].content}"
                </blockquote>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Contrôles de navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-soft flex items-center justify-center hover:shadow-softxl transition-all duration-200 group"
            >
              <ChevronLeft className="w-5 h-5 text-softui-secondary group-hover:text-softui-primary transition-colors" />
            </button>

            {/* Indicateurs */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex
                      ? 'bg-softui-primary w-8'
                      : 'bg-softui-secondary/30 hover:bg-softui-secondary/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white rounded-full shadow-soft flex items-center justify-center hover:shadow-softxl transition-all duration-200 group"
            >
              <ChevronRight className="w-5 h-5 text-softui-secondary group-hover:text-softui-primary transition-colors" />
            </button>
          </div>
        </div>

        {/* Statistiques de satisfaction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            { label: 'Clients satisfaits', value: '98%', icon: '😊' },
            { label: 'Commerçants actifs', value: '12K+', icon: '🏪' },
            { label: 'Avis positifs', value: '45K+', icon: '⭐' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-softui-primary mb-1">{stat.value}</div>
              <div className="text-softui-secondary/70">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection; 