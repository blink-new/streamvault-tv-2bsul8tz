import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X, SkipForward } from 'lucide-react';
import { advertisements } from '../data/movies';

interface AdvertisementProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export function Advertisement({ onComplete, onSkip }: AdvertisementProps) {
  const [currentAd] = useState(() => advertisements[Math.floor(Math.random() * advertisements.length)]);
  const [timeLeft, setTimeLeft] = useState(currentAd.duration);
  const [canSkip, setCanSkip] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const skipTimer = setTimeout(() => {
      setCanSkip(true);
    }, currentAd.skipAfter * 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(skipTimer);
    };
  }, [currentAd.skipAfter, onComplete]);

  const handleSkip = () => {
    if (canSkip && onSkip) {
      onSkip();
    }
  };

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Ad Content */}
      <div className="relative w-full h-full">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${currentAd.image})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Ad Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8">
          <div className="max-w-2xl">
            <div className="text-sm text-gray-300 mb-2">Advertisement</div>
            <h2 className="text-3xl font-bold text-white mb-2">{currentAd.title}</h2>
            <p className="text-lg text-gray-200 mb-4">{currentAd.description}</p>
            <div className="text-sm text-gray-400">Sponsored by {currentAd.brand}</div>
          </div>
        </div>

        {/* Controls */}
        <div className="absolute top-4 right-4 flex items-center gap-4">
          {/* Timer */}
          <div className="bg-black/60 px-3 py-1 rounded text-white text-sm">
            Ad ends in {timeLeft}s
          </div>
          
          {/* Skip Button */}
          {canSkip ? (
            <Button
              onClick={handleSkip}
              variant="outline"
              size="sm"
              className="bg-black/60 border-gray-400 text-white hover:bg-black/80"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip Ad
            </Button>
          ) : (
            <div className="bg-black/60 px-3 py-1 rounded text-gray-400 text-sm">
              Skip in {currentAd.skipAfter - (currentAd.duration - timeLeft)}s
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600">
          <div 
            className="h-full bg-netflix-red transition-all duration-1000"
            style={{ width: `${((currentAd.duration - timeLeft) / currentAd.duration) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}