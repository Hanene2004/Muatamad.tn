import React from 'react';
import { Shield, Search, MessageCircle, Star, MapPin, Clock } from 'lucide-react';
import Card from '../common/Card';

const Features: React.FC = () => {
  const features = [
    {
      icon: Shield,
      title: 'Commerçants Vérifiés',
      description: 'Tous nos commerçants sont vérifiés avec leurs documents officiels pour garantir votre sécurité.',
      color: 'text-tunisian-green'
    },
    {
      icon: Search,
      title: 'Recherche Intelligente',
      description: 'Trouvez facilement les commerçants par catégorie, localisation, note et disponibilité.',
      color: 'text-tunisian-red'
    },
    {
      icon: MessageCircle,
      title: 'Communication Directe',
      description: 'Contactez directement les commerçants via notre système de messagerie sécurisé.',
      color: 'text-tunisian-gold'
    },
    {
      icon: Star,
      title: 'Avis Authentiques',
      description: 'Consultez les avis vérifiés d\'autres clients pour faire le meilleur choix.',
      color: 'text-tunisian-navy'
    },
    {
      icon: MapPin,
      title: 'Couverture Nationale',
      description: 'Découvrez les commerçants dans toutes les régions et villes de Tunisie.',
      color: 'text-tunisian-green'
    },
    {
      icon: Clock,
      title: 'Horaires en Temps Réel',
      description: 'Consultez les horaires d\'ouverture et la disponibilité en temps réel.',
      color: 'text-tunisian-red'
    }
  ];

  return (
    <section className="py-16 bg-tunisian-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Pourquoi Choisir Souq Tunisia ?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Une plateforme conçue pour faciliter la découverte et la connexion avec les commerçants tunisiens
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} hover className="text-center p-8">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6 ${feature.color}`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;