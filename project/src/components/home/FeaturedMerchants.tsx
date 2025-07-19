import React from 'react';
import { Link } from 'react-router-dom';
import MerchantCard from '../merchant/MerchantCard';
import Button from '../common/Button';

// Données des commerçants en vedette avec la nouvelle structure
const featuredMerchants = [
  {
    id: '1',
    name: 'Boulangerie du Centre',
    logo: '🥖',
    logoBg: 'bg-gradient-to-br from-amber-400 to-orange-500',
    description: 'Pains et pâtisseries artisanales au cœur de la ville.',
    address: '12 rue de Paris, Tunis',
    phone: '+216 71 123 456',
    website: 'https://boulangerie-centre.tn',
    hours: '6h30 - 19h',
    category: 'Boulangerie',
    rating: 4.7,
    reviews: 128,
    location: { city: 'Tunis', region: 'Tunis' },
    services: ['Pain frais', 'Pâtisseries', 'Sandwichs'],
    workingHours: { monday: { open: '06:30', close: '19:00', closed: false }, tuesday: { open: '06:30', close: '19:00', closed: false }, wednesday: { open: '06:30', close: '19:00', closed: false }, thursday: { open: '06:30', close: '19:00', closed: false }, friday: { open: '06:30', close: '19:00', closed: false }, saturday: { open: '06:30', close: '19:00', closed: false }, sunday: { open: '07:00', close: '13:00', closed: false } },
    verified: true,
    featured: true,
    delivery: true,
    pickup: true,
    theme: {
      primary: 'from-amber-400 to-orange-500',
      secondary: 'from-orange-300 to-red-400',
      accent: 'bg-amber-100',
      text: 'text-orange-800'
    }
  },
  {
    id: '3',
    name: 'Librairie Les Mots',
    logo: '📚',
    logoBg: 'bg-gradient-to-br from-blue-400 to-indigo-500',
    description: 'Livres, papeterie et cadeaux pour tous les âges.',
    address: '18 rue Ibn Khaldoun, Sfax',
    phone: '+216 74 321 654',
    website: 'https://librairie-lesmots.tn',
    hours: '9h - 18h',
    category: 'Librairie',
    rating: 4.8,
    reviews: 156,
    location: { city: 'Sfax', region: 'Sfax' },
    services: ['Livres', 'Papeterie', 'Cadeaux'],
    workingHours: { monday: { open: '09:00', close: '18:00', closed: false }, tuesday: { open: '09:00', close: '18:00', closed: false }, wednesday: { open: '09:00', close: '18:00', closed: false }, thursday: { open: '09:00', close: '18:00', closed: false }, friday: { open: '09:00', close: '18:00', closed: false }, saturday: { open: '09:00', close: '18:00', closed: false }, sunday: { open: '10:00', close: '14:00', closed: false } },
    verified: true,
    featured: true,
    delivery: false,
    pickup: true,
    theme: {
      primary: 'from-blue-400 to-indigo-500',
      secondary: 'from-indigo-300 to-purple-400',
      accent: 'bg-blue-100',
      text: 'text-blue-800'
    }
  },
  {
    id: '5',
    name: 'TechStore',
    logo: '💻',
    logoBg: 'bg-gradient-to-br from-cyan-400 to-blue-500',
    description: 'Matériel informatique, smartphones et accessoires high-tech.',
    address: '10 rue des Oliviers, Tunis',
    phone: '+216 71 112 233',
    website: 'https://techstore.tn',
    hours: '9h - 18h',
    category: 'Informatique',
    rating: 4.9,
    reviews: 342,
    location: { city: 'Tunis', region: 'Tunis' },
    services: ['Ordinateurs', 'Smartphones', 'Accessoires'],
    workingHours: { monday: { open: '09:00', close: '18:00', closed: false }, tuesday: { open: '09:00', close: '18:00', closed: false }, wednesday: { open: '09:00', close: '18:00', closed: false }, thursday: { open: '09:00', close: '18:00', closed: false }, friday: { open: '09:00', close: '18:00', closed: false }, saturday: { open: '09:00', close: '18:00', closed: false }, sunday: { open: '09:00', close: '18:00', closed: false } },
    verified: true,
    featured: true,
    delivery: true,
    pickup: true,
    theme: {
      primary: 'from-cyan-400 to-blue-500',
      secondary: 'from-blue-300 to-cyan-400',
      accent: 'bg-cyan-100',
      text: 'text-cyan-800'
    }
  },
  {
    id: '8',
    name: 'Pharmacie Centrale',
    logo: '💊',
    logoBg: 'bg-gradient-to-br from-emerald-400 to-green-500',
    description: 'Médicaments, parapharmacie et conseils santé.',
    address: '10 rue de la Liberté, Tunis',
    phone: '+216 71 123 456',
    website: 'https://pharmacie-centrale.tn',
    hours: '8h - 20h',
    category: 'Pharmacie',
    rating: 4.7,
    reviews: 267,
    location: { city: 'Tunis', region: 'Tunis' },
    services: ['Médicaments', 'Parapharmacie', 'Conseils santé'],
    workingHours: { monday: { open: '08:00', close: '20:00', closed: false }, tuesday: { open: '08:00', close: '20:00', closed: false }, wednesday: { open: '08:00', close: '20:00', closed: false }, thursday: { open: '08:00', close: '20:00', closed: false }, friday: { open: '08:00', close: '20:00', closed: false }, saturday: { open: '08:00', close: '20:00', closed: false }, sunday: { open: '08:00', close: '20:00', closed: false } },
    verified: true,
    featured: true,
    delivery: true,
    pickup: true,
    theme: {
      primary: 'from-emerald-400 to-green-500',
      secondary: 'from-green-300 to-emerald-400',
      accent: 'bg-emerald-100',
      text: 'text-emerald-800'
    }
  },
  {
    id: '2',
    name: 'Épicerie Bio Soleil',
    logo: '🌱',
    logoBg: 'bg-gradient-to-br from-green-400 to-emerald-500',
    description: 'Produits bio, locaux et responsables.',
    address: '5 avenue Habib Bourguiba, Sousse',
    phone: '+216 73 456 789',
    website: 'https://bio-soleil.tn',
    hours: '8h - 20h',
    category: 'Épicerie',
    rating: 4.5,
    reviews: 89,
    location: { city: 'Sousse', region: 'Sousse' },
    services: ['Produits bio', 'Livraison', 'Fruits & légumes'],
    workingHours: { monday: { open: '08:00', close: '20:00', closed: false }, tuesday: { open: '08:00', close: '20:00', closed: false }, wednesday: { open: '08:00', close: '20:00', closed: false }, thursday: { open: '08:00', close: '20:00', closed: false }, friday: { open: '08:00', close: '20:00', closed: false }, saturday: { open: '08:00', close: '20:00', closed: false }, sunday: { open: '09:00', close: '13:00', closed: false } },
    verified: true,
    featured: false,
    delivery: true,
    pickup: false,
    theme: {
      primary: 'from-green-400 to-emerald-500',
      secondary: 'from-emerald-300 to-teal-400',
      accent: 'bg-green-100',
      text: 'text-green-800'
    }
  },
  {
    id: '4',
    name: 'Boutique Mode Chic',
    logo: '👗',
    logoBg: 'bg-gradient-to-br from-pink-400 to-rose-500',
    description: 'Vêtements et accessoires tendance pour femmes.',
    address: '22 avenue de la Liberté, Tunis',
    phone: '+216 71 987 654',
    website: 'https://modechic.tn',
    hours: '10h - 19h',
    category: 'Vêtements',
    rating: 4.6,
    reviews: 203,
    location: { city: 'Tunis', region: 'Tunis' },
    services: ['Vêtements', 'Accessoires', 'Chaussures'],
    workingHours: { monday: { open: '10:00', close: '19:00', closed: false }, tuesday: { open: '10:00', close: '19:00', closed: false }, wednesday: { open: '10:00', close: '19:00', closed: false }, thursday: { open: '10:00', close: '19:00', closed: false }, friday: { open: '10:00', close: '19:00', closed: false }, saturday: { open: '10:00', close: '19:00', closed: false }, sunday: { open: '10:00', close: '19:00', closed: false } },
    verified: true,
    featured: false,
    delivery: true,
    pickup: true,
    theme: {
      primary: 'from-pink-400 to-rose-500',
      secondary: 'from-rose-300 to-pink-400',
      accent: 'bg-pink-100',
      text: 'text-pink-800'
    }
  }
];

const FeaturedMerchants: React.FC = () => {

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Commerçants Recommandés
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les commerçants les mieux notés et vérifiés de notre plateforme
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredMerchants.map((merchant) => (
            <MerchantCard key={merchant.id} merchant={merchant} />
          ))}
        </div>

        <div className="text-center">
          <Link to="/merchants">
            <Button variant="primary" size="lg">
              Voir tous les commerçants
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMerchants;