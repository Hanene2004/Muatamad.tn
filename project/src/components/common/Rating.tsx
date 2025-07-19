import React from 'react';
import { Star } from 'lucide-react';

interface RatingProps {
  rating: number;
  maxRating?: number;
  showValue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const Rating: React.FC<RatingProps> = ({
  rating,
  maxRating = 5,
  showValue = true,
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex items-center">
        {[...Array(maxRating)].map((_, index) => (
          <Star
            key={index}
            className={`${sizeClasses[size]} ${
              index < Math.floor(rating)
                ? 'text-tunisian-gold fill-tunisian-gold'
                : index < rating
                ? 'text-tunisian-gold fill-tunisian-gold opacity-50'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      {showValue && (
        <span className={`ml-2 font-medium text-gray-700 ${textSizeClasses[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default Rating;