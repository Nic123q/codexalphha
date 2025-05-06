import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Game } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';

const GamePreview = ({ game, index }: { game: Game, index: number }) => {
  return (
    <motion.div
      className="flex-shrink-0 w-80 bg-card rounded-xl overflow-hidden shadow-lg shadow-accent/20 relative"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <img
        src={game.imageUrl}
        alt={game.title}
        className="w-full h-44 object-cover"
      />
      <div className="absolute top-4 right-4 bg-accent text-white px-3 py-1 rounded-full text-sm">
        {game.releaseDate}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
        <p className="text-gray-300 text-sm h-16 overflow-hidden">{game.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-secondary">{game.developer}</span>
          <a
            href="#"
            className="text-sm text-white bg-primary hover:bg-primary/80 px-4 py-2 rounded-full transition-colors"
          >
            {game.releaseDate && new Date(game.releaseDate).getTime() < Date.now()
              ? 'Reservar'
              : 'Acompanhar'}
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const UpcomingGames = () => {
  const {
    data: games,
    isLoading,
    isError,
  } = useQuery<Game[]>({
    queryKey: ['/api/games/upcoming'],
  });

  if (isLoading) {
    return (
      <section id="novidades" className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Próximos </span>
              <span className="text-accent">Lançamentos</span>
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Fique por dentro dos jogos mais aguardados que estão prestes a chegar.
            </p>
          </div>
          
          <div className="flex overflow-x-auto scrollbar-hide pb-6 space-x-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-80 bg-card rounded-xl overflow-hidden">
                <Skeleton className="w-full h-44" />
                <div className="p-5">
                  <Skeleton className="h-7 w-4/5 mb-3" />
                  <Skeleton className="h-16 w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-4 w-1/3" />
                    <Skeleton className="h-8 w-24 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError || !games || games.length === 0) {
    return (
      <section id="novidades" className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Próximos </span>
              <span className="text-accent">Lançamentos</span>
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          </div>
          <div className="text-center text-white">
            <p>Não há lançamentos futuros para exibir no momento.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="novidades" className="py-20 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Próximos </span>
            <span className="text-accent">Lançamentos</span>
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Fique por dentro dos jogos mais aguardados que estão prestes a chegar.
          </p>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide pb-6 space-x-6">
          {games.map((game, index) => (
            <GamePreview key={game.id} game={game} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingGames;
