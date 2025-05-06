import { FC } from 'react';
import { motion } from 'framer-motion';
import { Game } from '@shared/schema';
import StarRating from '@/components/ui/star-rating';

interface GameCardProps {
  game: Game;
  delay?: number;
}

const GameCard: FC<GameCardProps> = ({ game, delay = 0 }) => {
  const {
    id,
    title,
    description,
    category,
    imageUrl,
    rating,
  } = game;

  return (
    <motion.div
      className="game-card bg-card rounded-xl overflow-hidden shadow-lg shadow-primary/20 relative group"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      viewport={{ once: true }}
    >
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-60 object-cover object-center transition-transform duration-500 group-hover:scale-110" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
        <div className="p-5">
          <span className="inline-block px-3 py-1 bg-primary rounded-full text-sm text-white mb-3">
            {category}
          </span>
          <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
          <p className="text-gray-300 mb-3 text-sm">{description}</p>
          <a 
            href={`#game-${id}`} 
            className="inline-block text-secondary hover:underline"
          >
            Ver detalhes
          </a>
        </div>
      </div>
      
      <div className="p-5">
        <h3 className="text-2xl font-bold text-white mb-1">{title}</h3>
        <div className="flex items-center space-x-1 mb-4">
          <StarRating rating={rating} />
        </div>
      </div>
    </motion.div>
  );
};

export default GameCard;
