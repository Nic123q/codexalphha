import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { Search } from 'lucide-react';
import { Game } from '@shared/schema';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import GameCard from '@/components/game-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';

const AllGamesPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  
  // Fetch all games
  const {
    data: games,
    isLoading,
    isError,
    error
  } = useQuery<Game[]>({
    queryKey: ['/api/games'],
  });
  
  // Fetch search results if search query exists
  const {
    data: searchResults,
    isLoading: isSearchLoading,
  } = useQuery<Game[]>({
    queryKey: ['/api/search', searchQuery],
    queryFn: () => {
      if (!searchQuery.trim()) return [];
      return fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
        .then(res => res.json());
    },
    enabled: !!searchQuery,
  });
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchInput);
  };
  
  // Determine which games to display
  const displayGames = searchQuery ? searchResults || [] : games || [];
  
  // Loading state
  if (isLoading || (searchQuery && isSearchLoading)) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Todos os Jogos</h1>
                <p className="text-gray-400">Explore nossa coleção completa de jogos</p>
              </div>
              
              <form className="mt-4 md:mt-0 relative">
                <input
                  type="text"
                  placeholder="Buscar jogos..."
                  className="w-full md:w-64 bg-muted text-white rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search size={18} />
                </button>
              </form>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-card rounded-xl overflow-hidden shadow-lg">
                  <Skeleton className="w-full h-60" />
                  <div className="p-5">
                    <Skeleton className="h-8 w-4/5 mb-3" />
                    <Skeleton className="h-4 w-1/3 mb-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Error state
  if (isError) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-12">
          <div className="container mx-auto px-4 text-center py-20">
            <h2 className="text-3xl font-bold text-white mb-4">Erro ao carregar jogos</h2>
            <p className="text-gray-400 mb-8">Não foi possível carregar a lista de jogos. Por favor, tente novamente mais tarde.</p>
            {error instanceof Error && <p className="text-red-500">{error.message}</p>}
            <Link href="/">
              <Button className="bg-primary hover:bg-primary/80 text-white">
                Voltar para a Página Inicial
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Header and search */}
          <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {searchQuery ? 'Resultados da Busca' : 'Todos os Jogos'}
              </h1>
              <p className="text-gray-400">
                {searchQuery 
                  ? `${displayGames.length} ${displayGames.length === 1 ? 'jogo encontrado' : 'jogos encontrados'} para "${searchQuery}"`
                  : 'Explore nossa coleção completa de jogos'}
              </p>
            </div>
            
            <form onSubmit={handleSearch} className="mt-4 md:mt-0 relative">
              <input
                type="text"
                placeholder="Buscar jogos..."
                className="w-full md:w-64 bg-muted text-white rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-secondary"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <Search size={18} />
              </button>
            </form>
          </div>
          
          {/* No results message */}
          {searchQuery && displayGames.length === 0 && (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-white mb-4">Nenhum jogo encontrado</h2>
              <p className="text-gray-400 mb-6">Não encontramos nenhum jogo para sua busca "{searchQuery}"</p>
              <Button 
                className="bg-primary hover:bg-primary/80 text-white"
                onClick={() => setSearchQuery('')}
              >
                Ver todos os jogos
              </Button>
            </div>
          )}
          
          {/* Games grid */}
          {displayGames.length > 0 && (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {displayGames.map((game, index) => (
                <GameCard key={game.id} game={game} delay={index % 8} />
              ))}
            </motion.div>
          )}
          
          {/* Back button for search results */}
          {searchQuery && (
            <div className="mt-8 text-center">
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchQuery('');
                  setSearchInput('');
                }}
              >
                Voltar para todos os jogos
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllGamesPage;