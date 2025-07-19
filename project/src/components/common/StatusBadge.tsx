import React from 'react';

const statusColors = {
  signale: 'bg-red-500 text-white',
  nouveau: 'bg-blue-500 text-white',
  valide: 'bg-green-500 text-white',
  en_attente: 'bg-yellow-400 text-white',
  default: 'bg-gray-300 text-gray-700',
};

const StatusBadge = ({ status, children }) => {
  const color = statusColors[status] || statusColors.default;
  return (
    <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${color}`}>{children}</span>
  );
};

export default StatusBadge; 