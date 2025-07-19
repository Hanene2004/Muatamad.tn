import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ShoppingBag, Store, Users, Award } from 'lucide-react';
import Button from '../common/Button';
import Card from '../common/Card';

const CTASection: React.FC = () => {
  const benefits = [
    {
      icon: ShoppingBag,
      title: 'Découvrez',
      description: 'Trouvez les meilleurs commerçants de votre région',
      color: 'from-softui-primary to-softui-secondary'
    },
    {
      icon: Store,
      title: 'Rejoignez',
      description: 'Développez votre activité avec notre plateforme',
      color: 'from-softui-warning to-softui-danger'
    },
    {
      icon: Users,
      title: 'Connectez',
      description: 'Créez des liens durables avec vos clients',
      color: 'from-softui-success to-softui-info'
    },
    {
      icon: Award,
      title: 'Valorisez',
      description: 'Bénéficiez de notre système de recommandation',
      color: 'from-softui-info to-softui-primary'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-softui-primary via-softui-secondary to-softui-warning relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-40 right-1/3 w-20 h-20 bg-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à <span className="text-yellow-300">transformer</span> votre commerce ?
          </h2>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Rejoignez des milliers de commerçants qui ont déjà choisi Muatamad.tn pour développer leur activité et connecter avec leurs clients.
          </p>
        </motion.div>

        {/* Cartes des avantages */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <Card className="p-6 text-center bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-softxl mx-auto mb-4 flex items-center justify-center shadow-softxl`}>
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{benefit.title}</h3>
                <p className="text-white/80 text-sm">{benefit.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Boutons d'action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link to="/register">
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-softui-primary hover:bg-gray-100 shadow-softxl hover:shadow-softxl-lg transform hover:scale-105 transition-all duration-200"
            >
              Devenir commerçant
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          
          <Link to="/merchants">
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-softui-primary shadow-soft hover:shadow-softxl transition-all duration-200"
            >
              Explorer les commerçants
            </Button>
          </Link>
        </motion.div>

        {/* Statistiques rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '12K+', label: 'Commerçants' },
            { value: '45K+', label: 'Avis clients' },
            { value: '24', label: 'Villes' },
            { value: '98%', label: 'Satisfaction' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Message de confiance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-12 text-center"
        >
          <p className="text-white/70 text-sm">
            🛡️ <strong>100% sécurisé</strong> • 🔒 <strong>Données protégées</strong> • ⚡ <strong>Inscription rapide</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection; 