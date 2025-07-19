import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock, CheckCircle, Heart } from 'lucide-react';
import { Merchant } from '../../types';
import Card from '../common/Card';
import Rating from '../common/Rating';
import Badge from '../common/Badge';
import Button from '../common/Button';

interface MerchantCardProps {
  merchant: Merchant;
  showActions?: boolean;
}

const MerchantCard: React.FC<MerchantCardProps> = ({ merchant, showActions = true }) => {
  const isOpen = () => {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
    const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    
    const todayHours = merchant.workingHours[currentDay];
    if (!todayHours || todayHours.closed) return false;
    
    return currentTime >= todayHours.open && currentTime <= todayHours.close;
  };

  return (
    <Card hover className="h-full flex flex-col">
      {/* Logo Header */}
      <div className={`relative h-32 mb-4 -m-6 mt-0 bg-gradient-to-r ${merchant.theme?.primary || 'from-softui-primary to-softui-secondary'} p-6 flex items-center justify-between`}>
        {/* Logo */}
        <div className={`w-16 h-16 ${merchant.logoBg || 'bg-gradient-to-br from-softui-primary to-softui-secondary'} rounded-softxl flex items-center justify-center shadow-softxl text-3xl`}>
          {merchant.logo || '🏪'}
        </div>
        
        {/* Badges */}
        <div className="flex flex-col gap-2">
          {merchant.verified && (
            <Badge
              variant="success"
              icon={CheckCircle}
              className="bg-white/20 text-white border-white/30"
            >
              Vérifié
            </Badge>
          )}
          {merchant.featured && (
            <Badge
              variant="warning"
              className="bg-white/20 text-white border-white/30"
            >
              En vedette
            </Badge>
          )}
        </div>
        
        {/* Actions */}
        {showActions && (
          <Button
            variant="ghost"
            size="sm"
            icon={Heart}
            className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 text-white border-white/30"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {merchant.name}
            </h3>
            <Badge variant="secondary" className="text-xs">
              {merchant.category}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isOpen() ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className={`text-xs font-medium ${isOpen() ? 'text-green-600' : 'text-red-600'}`}>
              {isOpen() ? 'Ouvert' : 'Fermé'}
            </span>
          </div>
        </div>

        {/* Rating */}
        <Rating rating={merchant.rating} size="sm" className="mb-3" />

        {/* Location */}
        <div className="flex items-center text-gray-600 mb-2">
          <MapPin className="w-4 h-4 mr-2" />
          <span className="text-sm">
            {merchant.address}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
          {merchant.description}
        </p>

        {/* Services */}
        <div className="flex flex-wrap gap-1 mb-4">
          {merchant.services.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {service}
            </span>
          ))}
          {merchant.services.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              +{merchant.services.length - 3} autres
            </span>
          )}
        </div>

        {/* Actions */}
        {showActions && (
          <div className="flex space-x-2 mt-auto">
            <Link to={`/merchants/${merchant.id}`} className="flex-1">
              <Button variant="primary" size="sm" className="w-full">
                Voir le profil
              </Button>
            </Link>
            <Button variant="outline" size="sm" icon={Phone} className="flex-shrink-0">
              Contacter
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MerchantCard;