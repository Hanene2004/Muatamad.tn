import React from 'react';
import { Merchant } from '../../types';
import MerchantCard from './MerchantCard';

interface MerchantGridProps {
  merchants: Merchant[];
  loading?: boolean;
  emptyMessage?: string;
}

const MerchantGrid: React.FC<MerchantGridProps> = ({ 
  merchants, 
  loading = false, 
  emptyMessage = "Aucun commerçant trouvé" 
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-48 rounded-xl mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (merchants.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-lg mb-2">🔍</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">{emptyMessage}</h3>
        <p className="text-gray-500">
          Essayez de modifier vos critères de recherche ou explorez d'autres catégories.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {merchants.map((merchant) => (
        <MerchantCard key={merchant.id} merchant={merchant} />
      ))}
    </div>
  );
};

export default MerchantGrid;