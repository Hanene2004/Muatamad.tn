import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, MapPin, Phone, Clock, Globe, Star, Users, Award, ShoppingBag, Heart, Share2, Eye } from 'lucide-react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

// Données mock de commerçants avec logos et designs uniques
export const merchants = [
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
    id: '6',
    name: 'Café du Parc',
    logo: '☕',
    logoBg: 'bg-gradient-to-br from-amber-500 to-brown-600',
    description: 'Café convivial, terrasse et pâtisseries maison.',
    address: '20 avenue de la République, Tunis',
    phone: '+216 71 445 566',
    website: 'https://cafeduparc.tn',
    hours: '7h - 22h',
    category: 'Café',
    rating: 4.4,
    reviews: 178,
    location: { city: 'Tunis', region: 'Tunis' },
    services: ['Café', 'Terrasse', 'Pâtisseries'],
    workingHours: { monday: { open: '07:00', close: '22:00', closed: false }, tuesday: { open: '07:00', close: '22:00', closed: false }, wednesday: { open: '07:00', close: '22:00', closed: false }, thursday: { open: '07:00', close: '22:00', closed: false }, friday: { open: '07:00', close: '22:00', closed: false }, saturday: { open: '07:00', close: '22:00', closed: false }, sunday: { open: '07:00', close: '22:00', closed: false } },
    verified: true,
    featured: false,
    delivery: false,
    pickup: true,
    theme: {
      primary: 'from-amber-500 to-brown-600',
      secondary: 'from-brown-400 to-amber-500',
      accent: 'bg-amber-50',
      text: 'text-brown-800'
    }
  },
  {
    id: '7',
    name: 'Fleuriste RoseBlanche',
    logo: '🌹',
    logoBg: 'bg-gradient-to-br from-rose-400 to-pink-500',
    description: 'Bouquets, plantes et décoration florale.',
    address: '15 rue de la Paix, Sousse',
    phone: '+216 73 778 899',
    website: 'https://fleuriste-roseblanche.tn',
    hours: '8h - 18h',
    category: 'Fleuriste',
    rating: 4.6,
    reviews: 95,
    location: { city: 'Sousse', region: 'Sousse' },
    services: ['Bouquets', 'Plantes', 'Décoration'],
    workingHours: { monday: { open: '08:00', close: '18:00', closed: false }, tuesday: { open: '08:00', close: '18:00', closed: false }, wednesday: { open: '08:00', close: '18:00', closed: false }, thursday: { open: '08:00', close: '18:00', closed: false }, friday: { open: '08:00', close: '18:00', closed: false }, saturday: { open: '08:00', close: '18:00', closed: false }, sunday: { open: '08:00', close: '18:00', closed: false } },
    verified: true,
    featured: false,
    delivery: true,
    pickup: false,
    theme: {
      primary: 'from-rose-400 to-pink-500',
      secondary: 'from-pink-300 to-rose-400',
      accent: 'bg-rose-100',
      text: 'text-rose-800'
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
];

const Merchants: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);



  // Catégories uniques
  const categories = ['all', ...new Set(merchants.map(m => m.category))];
  const cities = ['all', ...new Set(merchants.map(m => m.location.city))];

  // Filtrage et tri
  const filteredMerchants = useMemo(() => {
    let filtered = merchants.filter(merchant => {
      const matchesSearch = merchant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           merchant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           merchant.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || merchant.category === selectedCategory;
      const matchesCity = selectedCity === 'all' || merchant.location.city === selectedCity;
      
      return matchesSearch && matchesCategory && matchesCity;
    });

    // Tri
    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'featured':
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedCity, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-softui-light via-white to-softui-accent/20">
      {/* Header avec statistiques */}
      <div className="bg-white shadow-soft border-b border-softui-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-softui-secondary mb-4">
              Annuaire des <span className="text-softui-primary">Commerçants</span>
            </h1>
            <p className="text-lg text-softui-secondary/80 max-w-2xl mx-auto">
              Découvrez les meilleurs commerçants tunisiens, vérifiés et recommandés par notre communauté
            </p>
          </div>

          
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Card className="p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Barre de recherche */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-softui-secondary/50 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un commerçant, catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-softui-border rounded-soft focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-colors"
              />
            </div>

            {/* Bouton filtres */}
            <Button
              variant="outline"
              icon={Filter}
              onClick={() => setShowFilters(!showFilters)}
              className="border-softui-primary text-softui-primary hover:bg-softui-primary hover:text-white"
            >
              Filtres
            </Button>

            {/* Tri */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-softui-border rounded-soft focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-colors"
            >
              <option value="rating">Trier par note</option>
              <option value="name">Trier par nom</option>
              <option value="reviews">Trier par avis</option>
              <option value="featured">Mettre en avant</option>
            </select>
          </div>

          {/* Filtres avancés */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-softui-border">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-softui-secondary mb-2">Catégorie</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-softui-border rounded-soft focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-colors"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === 'all' ? 'Toutes les catégories' : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-softui-secondary mb-2">Ville</label>
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="w-full px-4 py-2 border border-softui-border rounded-soft focus:ring-2 focus:ring-softui-primary/20 focus:border-softui-primary transition-colors"
                  >
                    {cities.map(city => (
                      <option key={city} value={city}>
                        {city === 'all' ? 'Toutes les villes' : city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Résultats */}
        <div className="mb-4">
          <p className="text-softui-secondary/70">
            {filteredMerchants.length} commerçant{filteredMerchants.length > 1 ? 's' : ''} trouvé{filteredMerchants.length > 1 ? 's' : ''}
          </p>
        </div>

                 {/* Grille des commerçants */}
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           {filteredMerchants.map((merchant) => (
             <Card key={merchant.id} className={`overflow-hidden hover:shadow-softxl transition-all duration-300 group border-l-amber-400`}>
               {/* Header avec logo et badges */}
               <div className={`relative h-32 bg-gradient-to-r ${merchant.theme.primary} p-6 flex items-center justify-between`}>
                 {/* Logo */}
                 <div className={`w-16 h-16 ${merchant.logoBg} rounded-softxl flex items-center justify-center shadow-softxl text-3xl`}>
                   {merchant.logo}
                 </div>
                 
                 {/* Badges */}
                 <div className="flex flex-col gap-2">
                   {merchant.verified && (
                     <Badge variant="success" className="bg-white/20 text-white border-white/30">
                       Vérifié
                     </Badge>
                   )}
                   {merchant.featured && (
                     <Badge variant="warning" className="bg-white/20 text-white border-white/30">
                       En vedette
                     </Badge>
                   )}
                 </div>
                 
                 {/* Actions */}
                 <div className="absolute top-4 right-4 flex gap-2">
                   <Button
                     variant="ghost"
                     size="sm"
                     icon={Heart}
                     className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                   >{null}</Button>
                   <Button
                     variant="ghost"
                     size="sm"
                     icon={Share2}
                     className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                   >{null}</Button>
                 </div>
               </div>

               {/* Contenu */}
               <div className="p-6">
                 <div className="flex items-start justify-between mb-4">
                   <div className="flex-1">
                     <h3 className={`text-xl font-bold text-orange-800 mb-1`}>{merchant.name}</h3>
                     <p className="text-softui-secondary/70 text-sm mb-2">{merchant.description}</p>
                   </div>
                   <div className="text-right ml-4">
                     <div className="flex items-center gap-1 mb-1">
                       <Star className="w-4 h-4 text-amber-400 fill-current" />
                       <span className={`font-semibold text-orange-800`}>{merchant.rating}</span>
                     </div>
                     <span className="text-xs text-softui-secondary/60">({merchant.reviews} avis)</span>
                   </div>
                 </div>

                 {/* Services avec couleurs du thème */}
                 <div className="flex flex-wrap gap-2 mb-4">
                   {merchant.services.slice(0, 2).map((service, index) => (
                     <Badge 
                       key={index} 
                       variant="secondary" 
                       className={`text-xs border-amber-300 text-orange-700 bg-amber-50`}
                     >
                       {service}
                     </Badge>
                   ))}
                   {merchant.services.length > 2 && (
                     <Badge 
                       variant="secondary" 
                       className={`text-xs border-amber-300 text-orange-700 bg-amber-50`}
                     >
                       +{merchant.services.length - 2}
                     </Badge>
                   )}
                 </div>

                 {/* Informations de contact avec couleurs du thème */}
                 <div className="space-y-2 mb-4">
                   <div className="flex items-center gap-2 text-sm text-softui-secondary/70">
                     <MapPin className={`w-4 h-4 text-amber-500`} />
                     <span>{merchant.address}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-softui-secondary/70">
                     <Phone className={`w-4 h-4 text-amber-500`} />
                     <span>{merchant.phone}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-softui-secondary/70">
                     <Clock className={`w-4 h-4 text-amber-500`} />
                     <span>{merchant.hours}</span>
                   </div>
                   <div className="flex items-center gap-2 text-sm text-softui-secondary/70">
                     <Globe className={`w-4 h-4 text-amber-500`} />
                     <a 
                       href={merchant.website} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className={`text-amber-600 hover:underline`}
                     >
                       {merchant.website.replace('https://', '')}
                     </a>
                   </div>
                 </div>

                 {/* Options de livraison avec couleurs du thème */}
                 <div className="flex gap-2 mb-4">
                   {merchant.delivery && (
                     <Badge 
                       variant="success" 
                       className={`text-xs bg-amber-100 text-orange-800 border-amber-200`}
                     >
                       Livraison
                     </Badge>
                   )}
                   {merchant.pickup && (
                     <Badge 
                       variant="primary" 
                       className={`text-xs bg-orange-100 text-orange-800 border-orange-200`}
                     >
                       Retrait
                     </Badge>
                   )}
                 </div>

                 {/* Boutons d'action avec couleurs du thème */}
                 <div className="flex gap-2">
                   <Button
                     variant="primary"
                     icon={Eye}
                     onClick={() => navigate(`/commercant/${merchant.id}`)}
                     className={`flex-1 bg-gradient-to-r from-amber-400 to-orange-500 hover:shadow-lg transform hover:scale-105 transition-all duration-200`}
                   >
                     Voir la boutique
                   </Button>
                   <Button
                     variant="secondary"
                     icon={Users}
                     className={`border-amber-400 text-amber-600 hover:bg-amber-50`}
                   >
                     Contacter
                   </Button>
                 </div>
               </div>
             </Card>
           ))}
         </div>

        {/* Message si aucun résultat */}
        {filteredMerchants.length === 0 && (
          <Card className="text-center py-12">
            <div className="text-softui-secondary/50 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-softui-secondary mb-2">
              Aucun commerçant trouvé
            </h3>
            <p className="text-softui-secondary/70 mb-4">
              Essayez de modifier vos critères de recherche ou vos filtres
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedCity('all');
              }}
              className="border-softui-primary text-softui-primary hover:bg-softui-primary hover:text-white"
            >
              Réinitialiser les filtres
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Merchants;