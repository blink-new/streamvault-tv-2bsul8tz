import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Crown, 
  Zap, 
  Shield, 
  Download, 
  Monitor, 
  Star,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { userPlans } from '../data/movies';

interface PremiumUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: () => void;
}

export function PremiumUpgradeModal({ isOpen, onClose, onUpgrade }: PremiumUpgradeModalProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSoftwareUpdate, setShowSoftwareUpdate] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
    }
  }, [isOpen]);

  const handleUpgrade = () => {
    setShowSoftwareUpdate(true);
    setTimeout(() => {
      onUpgrade();
      setShowSoftwareUpdate(false);
      onClose();
    }, 3000);
  };

  if (showSoftwareUpdate) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-md bg-black border-2 border-cyan-400 text-white overflow-hidden">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Software Update
            </DialogTitle>
          </DialogHeader>
          <div className="relative p-8 text-center">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-purple-900/20 to-pink-900/20 animate-pulse" />
            
            {/* Software Update Animation */}
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-6 relative">
                <div className="absolute inset-0 border-4 border-cyan-400 rounded-full animate-spin" />
                <div className="absolute inset-2 border-2 border-purple-400 rounded-full animate-ping" />
                <Zap className="absolute inset-0 m-auto w-6 h-6 text-cyan-400 animate-pulse" />
              </div>
              
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Upgrading to Premium...</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Removing advertisements...</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Unlocking Ultra HD...</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Activating premium features...</span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-6 w-full bg-gray-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full animate-pulse" style={{ width: '100%' }} />
              </div>
              
              <p className="mt-4 text-xs text-gray-400">
                Please wait while we upgrade your experience...
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-black border-2 border-purple-500 text-white overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Upgrade to Premium
          </DialogTitle>
        </DialogHeader>
        <div className="relative">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-pink-900/20 to-cyan-900/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]" />
          
          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-purple-400 rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 3}s`
                }}
              />
            ))}
          </div>

          <div className="relative z-10 p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <Crown className="w-8 h-8 text-yellow-400" />
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 text-lg font-bold">
                  PREMIUM
                </Badge>
                <Sparkles className="w-8 h-8 text-yellow-400" />
              </div>
              
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Experience StreamVaultTV like never before with our premium features and ad-free streaming
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Current Plan */}
              <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                    <Monitor className="w-5 h-5 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-300">Basic Plan</h3>
                    <p className="text-sm text-gray-500">Current</p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {userPlans.basic.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-400">
                      <div className="w-4 h-4 border border-gray-500 rounded-full" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium Plan */}
              <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-purple-500 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold">
                    RECOMMENDED
                  </Badge>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">Premium Plan</h3>
                    <p className="text-sm text-purple-300">Upgrade now</p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {userPlans.premium.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-white">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Premium Benefits */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center p-4 bg-gradient-to-b from-purple-900/30 to-transparent rounded-lg border border-purple-500/30">
                <Shield className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white mb-1">No Ads</h4>
                <p className="text-xs text-gray-400">Uninterrupted viewing</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-b from-cyan-900/30 to-transparent rounded-lg border border-cyan-500/30">
                <Monitor className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white mb-1">Ultra HD</h4>
                <p className="text-xs text-gray-400">4K streaming quality</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-b from-pink-900/30 to-transparent rounded-lg border border-pink-500/30">
                <Download className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white mb-1">Downloads</h4>
                <p className="text-xs text-gray-400">Unlimited offline viewing</p>
              </div>
              
              <div className="text-center p-4 bg-gradient-to-b from-yellow-900/30 to-transparent rounded-lg border border-yellow-500/30">
                <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h4 className="font-semibold text-white mb-1">Exclusive</h4>
                <p className="text-xs text-gray-400">Premium content</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center">
              <Button
                onClick={onClose}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800"
              >
                Maybe Later
              </Button>
              
              <Button
                onClick={handleUpgrade}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 text-lg font-semibold relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity" />
                <span className="relative flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Upgrade Now
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </div>
            
            <p className="text-center text-xs text-gray-500 mt-4">
              Cancel anytime • No commitment • Instant activation
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}