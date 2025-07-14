import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Plus, ThumbsUp, ThumbsDown, Info, Heart, Ban, Star } from 'lucide-react';
import { Movie } from '../data/movies';

interface MovieCardProps {
  movie: Movie;
  onPlay: (movie: Movie) => void;
  onToggleFavorite?: (movieId: number) => void;
  onToggleBlocked?: (movieId: number) => void;
}

export function MovieCard({ movie, onPlay, onToggleFavorite, onToggleBlocked }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="group relative min-w-[200px] cursor-pointer transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-md">
        <img 
          src={movie.image} 
          alt={movie.title}
          className="w-full h-[300px] object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating Badge */}
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className="bg-black/70 text-white border-none">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
            {movie.rating}
          </Badge>
        </div>

        {/* Favorite/Blocked Status */}
        <div className="absolute top-2 right-2 flex gap-1">
          {movie.isFavorite && (
            <Badge variant="secondary" className="bg-red-600 text-white border-none">
              <Heart className="w-3 h-3 fill-current" />
            </Badge>
          )}
          {movie.isBlocked && (
            <Badge variant="secondary" className="bg-gray-600 text-white border-none">
              <Ban className="w-3 h-3" />
            </Badge>
          )}
        </div>
        
        {/* Movie Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1">{movie.title}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
            <span>{movie.year}</span>
            <span>•</span>
            <span>{movie.duration}</span>
            <span>•</span>
            <span>{movie.genre.slice(0, 2).join(', ')}</span>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button 
              size="sm" 
              onClick={() => onPlay(movie)}
              className="bg-white text-black hover:bg-gray-200 h-8 px-3 flex-1"
            >
              <Play className="w-3 h-3 mr-1" />
              Play
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-gray-400 text-white hover:bg-white/10 h-8 px-2"
              title="Add to My List"
            >
              <Plus className="w-3 h-3" />
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="border-gray-400 text-white hover:bg-white/10 h-8 px-2"
              title="More Info"
            >
              <Info className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Expanded Info Card (appears on hover) */}
      {isHovered && (
        <div className="absolute top-full left-0 right-0 bg-gray-900 border border-gray-700 rounded-md p-4 mt-2 z-10 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-300">
          <h4 className="font-semibold text-white mb-2">{movie.title}</h4>
          <p className="text-sm text-gray-300 mb-3 line-clamp-3">{movie.description}</p>
          
          <div className="flex items-center gap-2 mb-3 text-xs text-gray-400">
            <span>{movie.genre.join(' • ')}</span>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onToggleFavorite?.(movie.id)}
                className={`h-8 px-2 ${movie.isFavorite ? 'text-red-400' : 'text-gray-400'} hover:text-red-300`}
                title={movie.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Heart className={`w-4 h-4 ${movie.isFavorite ? 'fill-current' : ''}`} />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-gray-400 hover:text-green-300 h-8 px-2"
                title="Like"
              >
                <ThumbsUp className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="text-gray-400 hover:text-red-300 h-8 px-2"
                title="Dislike"
              >
                <ThumbsDown className="w-4 h-4" />
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => onToggleBlocked?.(movie.id)}
                className={`h-8 px-2 ${movie.isBlocked ? 'text-red-400' : 'text-gray-400'} hover:text-red-300`}
                title={movie.isBlocked ? "Unblock" : "Block"}
              >
                <Ban className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span>{movie.rating}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}