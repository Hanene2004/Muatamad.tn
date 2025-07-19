import React from 'react';

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-tunisian-gold border-opacity-70"></div>
    <span className="mt-4 text-tunisian-navy font-semibold">Chargement...</span>
  </div>
);

export default Loader; 