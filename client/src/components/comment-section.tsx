import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  ThumbsUp, 
  MessageSquare, 
  User
} from 'lucide-react';
import { Comment, Game, InsertComment } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import StarRating from '@/components/ui/star-rating';

interface GameCommentsProps {
  game: Game;
  comments: Comment[];
  isLoading: boolean;
}

const generateInitials = (name: string) => {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};

const getTimeAgo = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  
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

const CommentItem = ({ comment }: { comment: Comment }) => {
  const queryClient = useQueryClient();
  const initials = generateInitials(comment.author);
  const timeAgo = getTimeAgo(new Date(comment.date));
  
  const likeMutation = useMutation({
    mutationFn: () => apiRequest('PATCH', `/api/comments/${comment.id}/like`, undefined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/games/${comment.gameId}/comments`] });
    }
  });

  const handleLike = () => {
    likeMutation.mutate();
  };
  
  return (
    <div className="border-b border-muted pb-4">
      <div className="flex items-start">
        <Avatar className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center">
          <span className="text-white font-medium">{initials}</span>
        </Avatar>
        <div className="ml-4 flex-1">
          <div className="flex justify-between">
            <h4 className="text-white font-bold">{comment.author}</h4>
            <span className="text-gray-400 text-sm">{timeAgo}</span>
          </div>
          <p className="text-gray-300 mt-2 text-sm">
            {comment.content}
          </p>
          <div className="flex items-center mt-3 space-x-4">
            <button 
              className="text-gray-400 hover:text-secondary text-sm flex items-center"
              onClick={handleLike}
              disabled={likeMutation.isPending}
            >
              <ThumbsUp className="mr-1" size={14} /> {comment.likes}
            </button>
            <button className="text-gray-400 hover:text-secondary text-sm flex items-center">
              <MessageSquare className="mr-1" size={14} /> Responder
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const GameComments = ({ game, comments, isLoading }: GameCommentsProps) => {
  const [newComment, setNewComment] = useState('');
  const queryClient = useQueryClient();
  
  const commentMutation = useMutation({
    mutationFn: (data: InsertComment) => 
      apiRequest('POST', `/api/games/${game.id}/comments`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/games/${game.id}/comments`] });
      setNewComment('');
    }
  });
  
  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    commentMutation.mutate({
      gameId: game.id,
      author: 'Usuário Anônimo', // In a real app, this would be the logged-in user
      content: newComment,
    });
  };

  if (isLoading) {
    return (
      <div className="bg-card rounded-xl overflow-hidden shadow-lg p-6">
        <div className="flex items-center mb-6">
          <Skeleton className="w-16 h-16 rounded-lg" />
          <div className="ml-4">
            <Skeleton className="h-6 w-40 mb-2" />
            <Skeleton className="h-4 w-28" />
          </div>
        </div>

        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
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
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-lg p-6">
      <div className="flex items-center mb-6">
        <img 
          src={game.imageUrl} 
          alt={game.title} 
          className="w-16 h-16 rounded-lg object-cover" 
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://placehold.co/200x200/313131/e2e2e2?text=Game";
          }}
        />
        <div className="ml-4">
          <h3 className="text-2xl font-bold text-white">{game.title}</h3>
          <div className="flex items-center">
            <StarRating rating={game.rating} />
            <span className="text-gray-400 text-sm ml-2">
              {comments.length} avaliações
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <p className="text-center text-gray-400 py-4">
            Seja o primeiro a comentar sobre este jogo!
          </p>
        )}
      </div>

      <div className="mt-6 pt-4 border-t border-muted">
        <form className="flex items-start space-x-4" onSubmit={handleCommentSubmit}>
          <Avatar className="w-10 h-10 rounded-full bg-primary/50 flex items-center justify-center flex-shrink-0">
            <User className="text-white" size={18} />
          </Avatar>
          <div className="flex-1">
            <Textarea
              className="w-full bg-muted border border-muted rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:border-secondary transition-colors"
              placeholder="Adicione seu comentário..."
              rows={2}
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/80 text-white py-2 px-4 rounded-lg transition-colors"
                disabled={commentMutation.isPending || !newComment.trim()}
              >
                {commentMutation.isPending ? 'Enviando...' : 'Comentar'}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const CommentSection = () => {
  const {
    data: featuredGames,
    isLoading: isLoadingGames,
  } = useQuery<Game[]>({
    queryKey: ['/api/games/featured'],
  });
  
  // Get first two games for comments display
  const displayGames = featuredGames?.slice(0, 2) || [];
  
  // Fetch comments for each game
  const gameOneId = displayGames[0]?.id;
  const {
    data: gameOneComments,
    isLoading: isLoadingGameOneComments,
  } = useQuery<Comment[]>({
    queryKey: gameOneId ? [`/api/games/${gameOneId}/comments`] : [],
    enabled: !!gameOneId,
  });
  
  const gameTwoId = displayGames[1]?.id;
  const {
    data: gameTwoComments,
    isLoading: isLoadingGameTwoComments,
  } = useQuery<Comment[]>({
    queryKey: gameTwoId ? [`/api/games/${gameTwoId}/comments`] : [],
    enabled: !!gameTwoId,
  });

  return (
    <section id="comentarios" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Comentários da </span>
            <span className="text-primary">Comunidade</span>
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Veja o que outros gamers estão dizendo sobre os jogos mais populares.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {isLoadingGames || displayGames.length < 2 ? (
            // Loading or not enough games
            <>
              <div className="bg-card rounded-xl overflow-hidden shadow-lg p-6">
                <Skeleton className="h-64 w-full" />
              </div>
              <div className="bg-card rounded-xl overflow-hidden shadow-lg p-6">
                <Skeleton className="h-64 w-full" />
              </div>
            </>
          ) : (
            // Display comments for two games
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <GameComments 
                  game={displayGames[0]} 
                  comments={gameOneComments || []} 
                  isLoading={isLoadingGameOneComments} 
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <GameComments 
                  game={displayGames[1]} 
                  comments={gameTwoComments || []} 
                  isLoading={isLoadingGameTwoComments} 
                />
              </motion.div>
            </>
          )}
        </div>

        <div className="text-center">
          <a
            href="#"
            className="inline-block px-8 py-3 bg-card border border-primary text-primary text-lg rounded-full hover:bg-primary hover:text-background transition-all duration-300 transform hover:scale-105"
          >
            Ver mais comentários
          </a>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
