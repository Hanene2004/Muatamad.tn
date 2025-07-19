import React, { useState, useEffect } from 'react';
import { Users, ShoppingBag, MapPin, Star, TrendingUp, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsSection: React.FC = () => {
  const [counts, setCounts] = useState({
    merchants: 0,
    cities: 0,
    categories: 0,
    reviews: 0,
    searches: 0,
    satisfaction: 0
  });

  const stats = [
    {
      icon: ShoppingBag,
      value: 12000,
      label: 'Commerçants',
      suffix: '+',
      color: 'from-softui-primary to-softui-secondary'
    },
    {
      icon: MapPin,
      value: 24,
      label: 'Villes',
      suffix: '',
      color: 'from-softui-warning to-softui-danger'
    },
    {
      icon: Award,
      value: 45,
      label: 'Catégories',
      suffix: '',
      color: 'from-softui-success to-softui-info'
    },
    {
      icon: Star,
      value: 45000,
      label: 'Avis clients',
      suffix: '+',
      color: 'from-softui-primary to-softui-warning'
    },
    {
      icon: TrendingUp,
      value: 8500,
      label: 'Recherches/jour',
      suffix: '+',
      color: 'from-softui-info to-softui-primary'
    },
    {
      icon: Users,
      value: 98,
      label: 'Satisfaction',
      suffix: '%',
      color: 'from-softui-success to-softui-warning'
    }
  ];

  useEffect(() => {
    const animateCounts = () => {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.value / steps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            current = stat.value;
            clearInterval(timer);
          }

          setCounts(prev => ({
            ...prev,
            [Object.keys(counts)[index]]: Math.floor(current)
          }));
        }, duration / steps);
      });
    };

    // Démarrer l'animation après un délai
    const timer = setTimeout(animateCounts, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-br from-softui-light via-white to-softui-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-softui-secondary mb-4">
            Muatamad.tn en <span className="text-softui-primary">Chiffres</span>
          </h2>
          <p className="text-lg text-softui-secondary/70 max-w-2xl mx-auto">
            Découvrez l'impact de notre plateforme sur le commerce tunisien
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="text-center group"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-softxl mx-auto mb-4 flex items-center justify-center shadow-softxl group-hover:shadow-softxl-lg transition-all duration-300`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <motion.div
                className="text-3xl font-bold text-softui-secondary mb-2"
                key={counts[Object.keys(counts)[index] as keyof typeof counts]}
              >
                {counts[Object.keys(counts)[index] as keyof typeof counts].toLocaleString()}{stat.suffix}
              </motion.div>
              <div className="text-sm text-softui-secondary/70 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Barre de progression animée */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 bg-white rounded-softxl shadow-soft p-6"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-softui-secondary mb-2">
              Croissance de la plateforme
            </h3>
            <p className="text-softui-secondary/70">
              Notre évolution au cours de l'année 2024
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              { label: 'Nouveaux commerçants', value: 85, color: 'bg-gradient-to-r from-softui-primary to-softui-secondary' },
              { label: 'Avis clients', value: 92, color: 'bg-gradient-to-r from-softui-warning to-softui-danger' },
              { label: 'Satisfaction utilisateurs', value: 98, color: 'bg-gradient-to-r from-softui-success to-softui-info' },
              { label: 'Couverture géographique', value: 76, color: 'bg-gradient-to-r from-softui-info to-softui-primary' }
            ].map((item, index) => (
              <div key={item.label} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-softui-secondary font-medium">{item.label}</span>
                  <span className="text-softui-secondary/70">{item.value}%</span>
                </div>
                <div className="w-full bg-softui-accent rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full ${item.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection; 