import React from 'react';
import { Search, MapPin, Star, Users } from 'lucide-react';
import Button from '../common/Button';
import SearchBar from '../search/SearchBar';

interface HeroProps {
  onSearch: (query: string, category: string, location: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const stats = [
    { icon: Users, label: 'Commerçants', value: '12,000+' },
    { icon: Star, label: 'Avis clients', value: '45,000+' },
    { icon: MapPin, label: 'Villes', value: '24' },
    { icon: Search, label: 'Recherches/jour', value: '8,500+' }
  ];

  return (
    <section className="relative bg-gradient-to-br from-tunisian-navy via-tunisian-red to-tunisian-gold text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-tunisian-navy/90 to-tunisian-red/90"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Découvrez le
            <span className="text-tunisian-gold"> Commerce Tunisien</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            La plateforme nationale qui connecte les consommateurs aux commerçants locaux partout en Tunisie
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" icon={Search}>
              Explorer les commerçants
            </Button>
            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-tunisian-navy">
              Devenir commerçant
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        {/* <div className="mb-16">
          <SearchBar onSearch={onSearch} />
        </div> */}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                <stat.icon className="w-6 h-6 text-tunisian-gold" />
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-300">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;