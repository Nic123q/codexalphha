import { FC } from 'react';
import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const StarRating: FC<StarRatingProps> = ({ 
  rating, 
  showText = true, 
  size = 'md' 
}) => {
  const numericRating = parseFloat(rating);
  const fullStars = Math.floor(numericRating);
  const hasHalfStar = numericRating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  const starSize = {
    sm: 14,
    md: 16,
    lg: 20
  }[size];
  
  const classes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }[size];

  return (
    <div className="flex items-center">
      <div className="flex space-x-1">
        {[...Array(fullStars)].map((_, i) => (
          <Star 
            key={`full-${i}`} 
            className="text-yellow-500 fill-yellow-500" 
            size={starSize} 
          />
        ))}
        
        {hasHalfStar && (
          <StarHalf 
            className="text-yellow-500 fill-yellow-500" 
            size={starSize} 
          />
        )}
        
        {[...Array(emptyStars)].map((_, i) => (
          <Star 
            key={`empty-${i}`} 
            className="text-yellow-500" 
            size={starSize} 
          />
        ))}
      </div>
      
      {showText && <span className={`text-gray-400 ml-2 ${classes}`}>{rating}</span>}
    </div>
  );
};

export default StarRating;
