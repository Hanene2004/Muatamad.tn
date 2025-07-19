import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Utensils, Coffee, Palette, Shirt, Smartphone, ShoppingCart, Wrench, Sparkles, Car, Home, Heart, TrendingUp, Star, Users, BookOpen
} from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const allCategories = [
  {
    name: 'Restaurant',
    icon: Utensils,
    color: 'bg-tunisian-red',
    count: 2340,
    description: 'Cuisine traditionnelle et moderne',
    trend: '+12%',
    isTrending: true,
    isPopular: true,
    isNew: false
  },
  {
    name: 'Café',
    icon: Coffee,
    color: 'bg-tunisian-gold',
    count: 1567,
    description: 'Cafés et salons de thé',
    trend: '+9%',
    isTrending: true,
    isPopular: true,
    isNew: false
  },
  {
    name: 'Artisanat',
    icon: Palette,
    color: 'bg-purple-500',
    count: 892,
    description: 'Art traditionnel tunisien',
    trend: '+5%',
    isTrending: false,
    isPopular: false,
    isNew: false
  },
  {
    name: 'Vêtements',
    icon: Shirt,
    color: 'bg-blue-500',
    count: 1234,
    description: 'Mode et textile',
    trend: '+8%',
    isTrending: false,
    isPopular: true,
    isNew: false
  },
  {
    name: 'Électronique',
    icon: Smartphone,
    color: 'bg-green-500',
    count: 756,
    description: 'Technologie et gadgets',
    trend: '+7%',
    isTrending: true,
    isPopular: false,
    isNew: false
  },
  {
    name: 'Alimentation',
    icon: ShoppingCart,
    color: 'bg-orange-500',
    count: 1890,
    description: 'Épiceries et produits frais',
    trend: '+6%',
    isTrending: false,
    isPopular: true,
    isNew: false
  },
  {
    name: 'Services',
    icon: Wrench,
    color: 'bg-gray-500',
    count: 1123,
    description: 'Services professionnels',
    trend: '+3%',
    isTrending: false,
    isPopular: false,
    isNew: true
  },
  {
    name: 'Beauté',
    icon: Sparkles,
    color: 'bg-pink-500',
    count: 654,
    description: 'Soins et cosmétiques',
    trend: '+4%',
    isTrending: true,
    isPopular: false,
    isNew: false
  },
  {
    name: 'Automobile',
    icon: Car,
    color: 'bg-indigo-500',
    count: 432,
    description: 'Véhicules et pièces',
    trend: '+2%',
    isTrending: false,
    isPopular: false,
    isNew: false
  },
  {
    name: 'Immobilier',
    icon: Home,
    color: 'bg-teal-500',
    count: 289,
    description: 'Biens immobiliers',
    trend: '+4%',
    isTrending: false,
    isPopular: false,
    isNew: true
  },
  // Ajoutez d'autres catégories pour la démo
  {
    name: 'Santé',
    icon: Heart,
    color: 'bg-tunisian-navy',
    count: 367,
    description: 'Services médicaux',
    trend: '+10%',
    isTrending: true,
    isPopular: false,
    isNew: false
  },
  {
    name: 'Éducation',
    icon: BookOpen,
    color: 'bg-purple-400',
    count: 312,
    description: 'Formation et cours',
    trend: '+8%',
    isTrending: false,
    isPopular: false,
    isNew: false
  },
  {
    name: 'Sport',
    icon: TrendingUp,
    color: 'bg-red-400',
    count: 234,
    description: 'Fitness et équipements',
    trend: '+11%',
    isTrending: true,
    isPopular: false,
    isNew: true
  },
  {
    name: 'Photographie',
    icon: Star,
    color: 'bg-gray-400',
    count: 178,
    description: 'Studios et services photo',
    trend: '+6%',
    isTrending: false,
    isPopular: false,
    isNew: false
  },
  {
    name: 'Musique',
    icon: Star,
    color: 'bg-pink-400',
    count: 156,
    description: 'Instruments et cours',
    trend: '+4%',
    isTrending: false,
    isPopular: false,
    isNew: false
  },
  {
    name: 'Divertissement',
    icon: Users,
    color: 'bg-blue-400',
    count: 123,
    description: 'Jeux et loisirs',
    trend: '+8%',
    isTrending: false,
    isPopular: false,
    isNew: false
  },
  {
    name: 'Coiffure',
    icon: Heart,
    color: 'bg-tunisian-red',
    count: 463,
    description: 'Salons de coiffure',
    trend: '+5%',
    isTrending: true,
    isPopular: false,
    isNew: false
  },
  {
    name: 'Bricolage',
    icon: Wrench,
    color: 'bg-gray-600',
    count: 267,
    description: 'Outils et matériaux',
    trend: '+2%',
    isTrending: false,
    isPopular: false,
    isNew: false
  },
  {
    name: 'Jardinage',
    icon: Sparkles,
    color: 'bg-green-400',
    count: 98,
    description: 'Plantes et jardin',
    trend: '+3%',
    isTrending: false,
    isPopular: false,
    isNew: false
  },
  {
    name: 'Enfants',
    icon: Users,
    color: 'bg-blue-300',
    count: 354,
    description: 'Produits pour enfants',
    trend: '+15%',
    isTrending: true,
    isPopular: false,
    isNew: false
  }
];

const filters = [
  { label: 'Toutes', value: 'all' },
  { label: 'Tendances', value: 'trending' },
  { label: 'Populaires', value: 'popular' },
  { label: 'Nouveautés', value: 'new' }
];

const Categories: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCategories = allCategories.filter(cat => {
    if (activeFilter === 'trending' && !cat.isTrending) return false;
    if (activeFilter === 'popular' && !cat.isPopular) return false;
    if (activeFilter === 'new' && !cat.isNew) return false;
    if (search && !cat.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  // Statistiques fictives pour la démo
  const stats = [
    { label: 'Commerçants Total', value: '14 015', icon: Users },
    { label: 'Catégories', value: '20', icon: BookOpen },
    { label: 'Gouvernorats', value: '24', icon: Home },
    { label: 'Note Moyenne', value: '4.8', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-2 md:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-tunisian-navy mb-2">Explorer les Catégories</h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">Découvrez tous les secteurs d'activité disponibles sur notre plateforme et trouvez les meilleurs commerçants tunisiens</p>
        </div>
        {/* Barre de recherche */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher une catégorie..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red bg-white shadow-sm"
          />
          <Button variant="primary" className="w-full sm:w-auto">Rechercher</Button>
        </div>
        {/* Filtres */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(f => (
            <Button
              key={f.value}
              variant={activeFilter === f.value ? 'primary' : 'outline'}
              size="sm"
              className={activeFilter === f.value ? '' : 'border-tunisian-red text-tunisian-red'}
              onClick={() => setActiveFilter(f.value)}
            >
              {f.label} {f.value === 'all' && <span className="ml-1">{allCategories.length}</span>}
              {f.value === 'trending' && <span className="ml-1">{allCategories.filter(c => c.isTrending).length}</span>}
              {f.value === 'popular' && <span className="ml-1">{allCategories.filter(c => c.isPopular).length}</span>}
              {f.value === 'new' && <span className="ml-1">{allCategories.filter(c => c.isNew).length}</span>}
            </Button>
          ))}
        </div>
        {/* Grille de catégories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {filteredCategories.map(cat => (
            <Link
              key={cat.name}
              to={`/merchants?category=${encodeURIComponent(cat.name)}`}
              className="group"
            >
              <Card hover className="h-full flex flex-col justify-between p-6 text-center group-hover:shadow-lg transition-all duration-200">
                <div>
                  <div className={`w-14 h-14 mx-auto mb-4 rounded-xl flex items-center justify-center ${cat.color} group-hover:scale-110 transition-transform duration-200`}>
                    <cat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-tunisian-navy mb-1">{cat.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{cat.description}</p>
                </div>
                <div className="flex flex-col items-center gap-1 mt-2">
                  <span className="text-xs text-gray-400">{cat.count.toLocaleString()} commerçants</span>
                  <span className="text-xs text-green-600 font-semibold">{cat.trend}</span>
                  <div className="flex gap-1 justify-center mt-1">
                    {cat.isTrending && <span className="px-2 py-0.5 bg-tunisian-gold/10 text-tunisian-gold text-xs rounded-full flex items-center gap-1"><TrendingUp className="w-3 h-3" />Tendance</span>}
                    {cat.isPopular && <span className="px-2 py-0.5 bg-tunisian-red/10 text-tunisian-red text-xs rounded-full flex items-center gap-1"><Star className="w-3 h-3" />Populaire</span>}
                    {cat.isNew && <span className="px-2 py-0.5 bg-tunisian-navy/10 text-tunisian-navy text-xs rounded-full flex items-center gap-1"><BookOpen className="w-3 h-3" />Nouveau</span>}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        {/* Statistiques */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-8">
          {stats.map(stat => (
            <div key={stat.label} className="flex flex-col items-center flex-1">
              <stat.icon className="w-7 h-7 mb-2 text-tunisian-gold" />
              <div className="text-2xl font-bold text-tunisian-navy">{stat.value}</div>
              <div className="text-gray-500 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories; 