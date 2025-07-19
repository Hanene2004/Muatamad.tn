import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Utensils, 
  Coffee, 
  Palette, 
  Shirt, 
  Smartphone, 
  ShoppingCart, 
  Wrench, 
  Sparkles,
  Car,
  Home
} from 'lucide-react';
import Card from '../common/Card';

const Categories: React.FC = () => {
  const categories = [
    { name: 'Restaurant', icon: Utensils, count: 2340, color: 'bg-red-500' },
    { name: 'Café', icon: Coffee, count: 1567, color: 'bg-amber-500' },
    { name: 'Artisanat', icon: Palette, count: 892, color: 'bg-purple-500' },
    { name: 'Vêtements', icon: Shirt, count: 1234, color: 'bg-blue-500' },
    { name: 'Électronique', icon: Smartphone, count: 756, color: 'bg-green-500' },
    { name: 'Alimentation', icon: ShoppingCart, count: 1890, color: 'bg-orange-500' },
    { name: 'Services', icon: Wrench, count: 1123, color: 'bg-gray-500' },
    { name: 'Beauté', icon: Sparkles, count: 654, color: 'bg-pink-500' },
    { name: 'Automobile', icon: Car, count: 432, color: 'bg-indigo-500' },
    { name: 'Immobilier', icon: Home, count: 289, color: 'bg-teal-500' }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explorer par Catégorie
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Découvrez les meilleurs commerçants tunisiens dans chaque secteur d'activité
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/merchants?category=${category.name}`}
              className="group"
            >
              <Card hover className="text-center p-6 h-full">
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.count.toLocaleString()} commerçants
                </p>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/categories"
            className="inline-flex items-center text-tunisian-red hover:text-tunisian-navy font-medium transition-colors duration-200"
          >
            Voir toutes les catégories
            <span className="ml-2">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Categories;