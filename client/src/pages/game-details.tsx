import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRoute } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronLeft, Share2, Heart, MessageSquare, Star } from 'lucide-react';
import { Link } from 'wouter';
import { Game, Comment, InsertComment } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import StarRating from '@/components/ui/star-rating';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

interface GameScreenshotProps {
  image: string;
  alt: string;
  onClick: () => void;
}

const GameScreenshot = ({ image, alt, onClick }: GameScreenshotProps) => {
  return (
    <div 
      className="cursor-pointer overflow-hidden rounded-lg"
      onClick={onClick}
    >
      <img 
        src={image} 
        alt={alt} 
        className="w-full h-40 object-cover transform transition-transform duration-300 hover:scale-110" 
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "https://placehold.co/800x450/313131/e2e2e2?text=Screenshot";
        }}
      />
    </div>
  );
};

const GameDetailPage = () => {
  const [match, params] = useRoute<{ id: string }>('/game/:id');
  const [comment, setComment] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const queryClient = useQueryClient();
  
  // Get the game ID from the URL
  const gameId = match ? parseInt(params.id) : null;
  
  // Fetch game details
  const { 
    data: game, 
    isLoading: isLoadingGame,
    error: gameError
  } = useQuery<Game>({
    queryKey: gameId ? [`/api/games/${gameId}`] : [],
    enabled: !!gameId,
  });
  
  // Fetch comments for the game
  const { 
    data: comments, 
    isLoading: isLoadingComments
  } = useQuery<Comment[]>({
    queryKey: gameId ? [`/api/games/${gameId}/comments`] : [],
    enabled: !!gameId,
  });
  
  // Add comment mutation
  const commentMutation = useMutation({
    mutationFn: (data: InsertComment) => 
      apiRequest('POST', `/api/games/${gameId}/comments`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/games/${gameId}/comments`] });
      setComment('');
    }
  });
  
  // Like comment mutation
  const likeMutation = useMutation({
    mutationFn: (commentId: number) => 
      apiRequest('PATCH', `/api/comments/${commentId}/like`, undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/games/${gameId}/comments`] });
    }
  });
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !gameId) return;
    
    commentMutation.mutate({
      gameId,
      author: 'Usuário Anônimo', // In a real app, this would be the logged-in user
      content: comment,
    });
  };
  
  const handleLikeComment = (commentId: number) => {
    likeMutation.mutate(commentId);
  };
  
  // Get time ago
  const getTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(date).getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    
    if (weeks > 0) return `${weeks} semana${weeks === 1 ? '' : 's'} atrás`;
    if (days > 0) return `${days} dia${days === 1 ? '' : 's'} atrás`;
    if (hours > 0) return `${hours} hora${hours === 1 ? '' : 's'} atrás`;
    if (minutes > 0) return `${minutes} minuto${minutes === 1 ? '' : 's'} atrás`;
    return 'agora mesmo';
  };

  // Generate initials
  const generateInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };
  
  // Loading state
  if (isLoadingGame) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-12">
          <div className="container mx-auto px-4">
            <div className="bg-card rounded-xl shadow-xl overflow-hidden">
              <Skeleton className="w-full h-96" />
              <div className="p-6">
                <Skeleton className="h-10 w-2/3 mb-4" />
                <div className="flex items-center mb-6">
                  <Skeleton className="h-5 w-40 mr-4" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-24 w-full mb-6" />
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                </div>
                <Skeleton className="h-60 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Error state
  if (gameError || !game) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-12">
          <div className="container mx-auto px-4 text-center py-20">
            <h2 className="text-3xl font-bold text-white mb-4">Jogo não encontrado</h2>
            <p className="text-gray-400 mb-8">Não foi possível encontrar o jogo solicitado.</p>
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
          {/* Back button */}
          <div className="mb-6">
            <Link href="/">
              <button className="flex items-center text-gray-400 hover:text-white transition-colors">
                <ChevronLeft size={20} className="mr-1" />
                <span>Voltar para a página inicial</span>
              </button>
            </Link>
          </div>
          
          {/* Hero section with game image and basic info */}
          <div className="bg-card rounded-xl shadow-xl overflow-hidden mb-10">
            <div className="h-96 w-full relative overflow-hidden">
              <img 
                src={game.imageUrl} 
                alt={game.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/1280x720/313131/e2e2e2?text=Game";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{game.title}</h1>
                    <div className="flex items-center mb-2">
                      <StarRating rating={game.rating} size="lg" />
                      <span className="text-gray-300 ml-4">{game.category}</span>
                    </div>
                    <div className="flex items-center text-gray-300 text-sm">
                      <span className="mr-4">Desenvolvedor: {game.developer}</span>
                      {game.publisher && <span>Publicadora: {game.publisher}</span>}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4 md:mt-0">
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Share2 size={16} className="mr-2" />
                      Compartilhar
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-full">
                      <Heart size={16} className="mr-2" />
                      Favorito
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              {/* Game details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-4 border-b border-muted pb-2">Sobre o Jogo</h2>
                    <p className="text-gray-300 leading-relaxed">{game.description}</p>
                  </div>
                  
                  {game.features && game.features.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4 border-b border-muted pb-2">Principais Características</h2>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {game.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <Star className="text-yellow-500 mr-2" size={16} />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Screenshots gallery */}
                  {game.screenshots && game.screenshots.length > 0 && (
                    <div className="mb-8">
                      <h2 className="text-2xl font-bold text-white mb-4 border-b border-muted pb-2">Screenshots</h2>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {game.screenshots.map((screenshot, index) => (
                          <GameScreenshot
                            key={index}
                            image={screenshot}
                            alt={`${game.title} screenshot ${index + 1}`}
                            onClick={() => setSelectedImage(screenshot)}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Comments section */}
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-4 border-b border-muted pb-2">
                      Comentários {comments && <span className="text-sm text-gray-400">({comments.length})</span>}
                    </h2>
                    
                    {/* Comment form */}
                    <div className="mb-8">
                      <form onSubmit={handleCommentSubmit} className="flex items-start space-x-4">
                        <Avatar className="w-10 h-10 rounded-full bg-primary/50 flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-medium">UA</span>
                        </Avatar>
                        <div className="flex-1">
                          <Textarea
                            placeholder="Adicione seu comentário sobre este jogo..."
                            className="w-full bg-muted border border-muted rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-secondary transition-colors"
                            rows={3}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                          <div className="flex justify-end mt-2">
                            <Button 
                              type="submit"
                              className="bg-primary hover:bg-primary/80 text-white" 
                              disabled={commentMutation.isPending || !comment.trim()}
                            >
                              {commentMutation.isPending ? "Enviando..." : "Comentar"}
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                    
                    {/* Comments list */}
                    <div className="space-y-6">
                      {isLoadingComments ? (
                        // Loading comments
                        [...Array(3)].map((_, i) => (
                          <div key={i} className="border-b border-muted pb-4">
                            <div className="flex items-start">
                              <Skeleton className="w-10 h-10 rounded-full" />
                              <div className="ml-4 flex-1">
                                <div className="flex justify-between">
                                  <Skeleton className="h-5 w-32 mb-2" />
                                  <Skeleton className="h-4 w-20" />
                                </div>
                                <Skeleton className="h-16 w-full mb-2" />
                                <div className="flex items-center mt-3 space-x-4">
                                  <Skeleton className="h-5 w-16" />
                                  <Skeleton className="h-5 w-24" />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : comments && comments.length > 0 ? (
                        // Show comments
                        comments.map((comment) => (
                          <div key={comment.id} className="border-b border-muted pb-4">
                            <div className="flex items-start">
                              <Avatar className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
                                <span className="text-white font-medium">{generateInitials(comment.author)}</span>
                              </Avatar>
                              <div className="ml-4 flex-1">
                                <div className="flex justify-between">
                                  <h4 className="text-white font-bold">{comment.author}</h4>
                                  <span className="text-gray-400 text-sm">{getTimeAgo(new Date(comment.date))}</span>
                                </div>
                                <p className="text-gray-300 mt-2 text-sm">
                                  {comment.content}
                                </p>
                                <div className="flex items-center mt-3 space-x-4">
                                  <button 
                                    className="text-gray-400 hover:text-secondary text-sm flex items-center"
                                    onClick={() => handleLikeComment(comment.id)}
                                    disabled={likeMutation.isPending}
                                  >
                                    <Heart className="mr-1" size={14} /> {comment.likes}
                                  </button>
                                  <button className="text-gray-400 hover:text-secondary text-sm flex items-center">
                                    <MessageSquare className="mr-1" size={14} /> Responder
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        // No comments
                        <div className="text-center py-6">
                          <p className="text-gray-400">Seja o primeiro a comentar sobre este jogo!</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Sidebar with additional info */}
                <div className="lg:col-span-1">
                  <div className="bg-muted rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-muted pb-2">Informações</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-gray-400 block">Desenvolvedor:</span>
                        <span className="text-white">{game.developer}</span>
                      </div>
                      {game.publisher && (
                        <div>
                          <span className="text-gray-400 block">Publicadora:</span>
                          <span className="text-white">{game.publisher}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-400 block">Categoria:</span>
                        <span className="text-white">{game.category}</span>
                      </div>
                      {game.platform && (
                        <div>
                          <span className="text-gray-400 block">Plataformas:</span>
                          <span className="text-white">{game.platform}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-400 block">Avaliação:</span>
                        <div className="mt-1">
                          <StarRating rating={game.rating} size="sm" />
                        </div>
                      </div>
                      {game.releaseDate && (
                        <div>
                          <span className="text-gray-400 block">Lançamento:</span>
                          <span className="text-white">{game.releaseDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="bg-muted rounded-lg p-6">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-muted pb-2">Disponível em</h3>
                    <div className="space-y-3">
                      <Button className="w-full bg-primary hover:bg-primary/80 text-white">
                        Comprar na Steam
                      </Button>
                      <Button variant="outline" className="w-full">
                        Epic Games Store
                      </Button>
                      <Button variant="outline" className="w-full">
                        Xbox Store
                      </Button>
                      <Button variant="outline" className="w-full">
                        PlayStation Store
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Fullscreen image viewer */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            onClick={() => setSelectedImage(null)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <img 
            src={selectedImage} 
            alt="Screenshot em tela cheia" 
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default GameDetailPage;