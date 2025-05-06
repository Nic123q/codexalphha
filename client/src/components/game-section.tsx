import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import GameCard from '@/components/game-card';
import { Game } from '@shared/schema';
import { Skeleton } from '@/components/ui/skeleton';

const GameSection = () => {
  const {
    data: games,
    isLoading,
    isError,
    error
  } = useQuery<Game[]>({
    queryKey: ['/api/games/featured'],
  });

  if (isLoading) {
    return (
      <section id="jogos" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Jogos em </span>
              <span className="text-secondary">Destaque</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Confira os games mais populares e imperdíveis do momento em nossa curadoria especial.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-card rounded-xl overflow-hidden shadow-lg">
                <Skeleton className="w-full h-60" />
                <div className="p-5">
                  <Skeleton className="h-8 w-4/5 mb-3" />
                  <Skeleton className="h-4 w-1/3 mb-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section id="jogos" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-white">Jogos em </span>
              <span className="text-secondary">Destaque</span>
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          </div>
          <div className="text-center text-white">
            <p>Não foi possível carregar os jogos. Por favor, tente novamente mais tarde.</p>
            {error instanceof Error && <p className="text-red-500">{error.message}</p>}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="jogos" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Jogos em </span>
            <span className="text-secondary">Destaque</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Confira os games mais populares e imperdíveis do momento em nossa curadoria especial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {games?.map((game, index) => (
            <GameCard key={game.id} game={game} delay={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-block px-8 py-3 bg-muted border border-secondary text-secondary text-lg rounded-full hover:bg-secondary hover:text-background transition-all duration-300 transform hover:scale-105"
          >
            Ver todos os jogos
          </a>
        </div>
      </div>
    </section>
  );
};

export default GameSection;
