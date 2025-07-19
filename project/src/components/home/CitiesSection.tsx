import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Users, Store, Star } from 'lucide-react';
import Card from '../common/Card';

const CitiesSection: React.FC = () => {
  const cities = [
    {
      name: 'Tunis',
      merchants: 4500,
      rating: 4.8,
      image: '🏛️',
      color: 'from-blue-400 to-indigo-500',
      description: 'Capitale économique et culturelle'
    },
    {
      name: 'Sousse',
      merchants: 2800,
      rating: 4.7,
      image: '🏖️',
      color: 'from-cyan-400 to-blue-500',
      description: 'Perle du Sahel'
    },
    {
      name: 'Sfax',
      merchants: 2200,
      rating: 4.6,
      image: '🌊',
      color: 'from-emerald-400 to-teal-500',
      description: 'Capitale du Sud'
    },
    {
      name: 'Monastir',
      merchants: 1200,
      rating: 4.5,
      image: '⛵',
      color: 'from-purple-400 to-pink-500',
      description: 'Ville côtière historique'
    },
    {
      name: 'Hammamet',
      merchants: 1800,
      rating: 4.7,
      image: '🌺',
      color: 'from-pink-400 to-rose-500',
      description: 'Station balnéaire'
    },
    {
      name: 'Nabeul',
      merchants: 1500,
      rating: 4.6,
      image: '🏺',
      color: 'from-orange-400 to-red-500',
      description: 'Capitale de la poterie'
    }
  ];

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
            Découvrez par <span className="text-softui-primary">ville</span>
          </h2>
          <p className="text-lg text-softui-secondary/70 max-w-2xl mx-auto">
            Explorez les commerçants dans les principales villes de Tunisie
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Link to={`/merchants?city=${city.name}`}>
                <Card className="p-6 hover:shadow-softxl transition-all duration-300 group cursor-pointer">
                  {/* Header avec image et gradient */}
                  <div className={`h-32 bg-gradient-to-r ${city.color} rounded-softxl mb-4 flex items-center justify-center text-6xl shadow-soft group-hover:shadow-softxl transition-all duration-300`}>
                    {city.image}
                  </div>

                  {/* Contenu */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-softui-secondary mb-2 group-hover:text-softui-primary transition-colors">
                      {city.name}
                    </h3>
                    <p className="text-softui-secondary/70 text-sm mb-4">
                      {city.description}
                    </p>

                    {/* Statistiques */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Store className="w-4 h-4 text-softui-primary" />
                          <span className="text-sm font-semibold text-softui-secondary">
                            {city.merchants.toLocaleString()}
                          </span>
                        </div>
                        <span className="text-xs text-softui-secondary/60">Commerçants</span>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-amber-400 fill-current" />
                          <span className="text-sm font-semibold text-softui-secondary">
                            {city.rating}
                          </span>
                        </div>
                        <span className="text-xs text-softui-secondary/60">Note moyenne</span>
                      </div>
                    </div>

                    {/* Bouton d'exploration */}
                    <div className="mt-4 pt-4 border-t border-softui-border">
                      <div className="text-softui-primary text-sm font-medium group-hover:underline">
                        Explorer {city.name} →
                      </div>
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA pour toutes les villes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link to="/merchants">
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-softui-primary to-softui-secondary text-white rounded-soft font-semibold shadow-soft hover:shadow-softxl transform hover:scale-105 transition-all duration-200">
              <MapPin className="w-5 h-5" />
              Voir toutes les villes
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CitiesSection; 