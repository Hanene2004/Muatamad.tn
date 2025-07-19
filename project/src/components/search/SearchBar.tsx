import React, { useState } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import Button from '../common/Button';
import { categories, tunisianCities } from '../../data/mockData';

interface SearchBarProps {
  onSearch: (query: string, category: string, location: string) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, className = '' }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, category, location);
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher des commerçants, produits..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red focus:border-transparent"
              />
            </div>
          </div>

          {/* Category Select */}
          <div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full py-3 px-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red focus:border-transparent"
            >
              <option value="">Toutes catégories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Location Select */}
          <div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-tunisian-red focus:border-transparent"
              >
                <option value="">Toute la Tunisie</option>
                {tunisianCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Button and Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 space-y-4 sm:space-y-0">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            icon={Search}
            className="w-full sm:w-auto"
          >
            Rechercher
          </Button>

          <Button
            type="button"
            variant="outline"
            size="md"
            icon={Filter}
            onClick={() => setShowFilters(!showFilters)}
            className="w-full sm:w-auto"
          >
            Filtres avancés
          </Button>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filtres avancés</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note minimum
                </label>
                <select className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tunisian-red">
                  <option value="">Toutes les notes</option>
                  <option value="4">4 étoiles et plus</option>
                  <option value="3">3 étoiles et plus</option>
                  <option value="2">2 étoiles et plus</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vérification
                </label>
                <select className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-tunisian-red">
                  <option value="">Tous les commerçants</option>
                  <option value="verified">Commerçants vérifiés</option>
                  <option value="unverified">Non vérifiés</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ouvert maintenant
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-tunisian-red focus:ring-tunisian-red"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Afficher uniquement les commerçants ouverts
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;