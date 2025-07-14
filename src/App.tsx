import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog'
import { Badge } from './components/ui/badge'
import { Play, Search, User, Bell, ChevronDown, Info, Settings, Crown } from 'lucide-react'
import { VideoPlayer } from './components/VideoPlayer'
import { SettingsModal } from './components/SettingsModal'
import { MovieCard } from './components/MovieCard'
import { PremiumUpgradeModal } from './components/PremiumUpgradeModal'
import { movies, categories, featuredContent, Movie, userPlans } from './data/movies'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
  const [showSettings, setShowSettings] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([1, 2, 3, 51, 52, 55])
  const [blockedMovies, setBlockedMovies] = useState<number[]>([])
  const [filteredMovies, setFilteredMovies] = useState(movies)
  const [userPlan, setUserPlan] = useState<'basic' | 'premium'>('basic')
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const handleUpgrade = () => {
    setUserPlan('premium')
    setShowUpgradeModal(false)
  }

  // Update movies with favorite/blocked status
  const moviesWithStatus = movies.map(movie => ({
    ...movie,
    isFavorite: favoriteMovies.includes(movie.id),
    isBlocked: blockedMovies.includes(movie.id)
  }))

  // Filter movies based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredMovies(moviesWithStatus)
    } else {
      const filtered = moviesWithStatus.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())) ||
        movie.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredMovies(filtered)
    }
  }, [searchQuery, favoriteMovies, blockedMovies, moviesWithStatus])

  const handleAuth = () => {
    setIsLoggedIn(true)
    setShowAuthModal(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowSettings(false)
  }

  const handlePlayMovie = (movie: Movie) => {
    setCurrentMovie(movie)
  }

  const handleClosePlayer = () => {
    setCurrentMovie(null)
  }

  const toggleFavorite = (movieId: number) => {
    setFavoriteMovies(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    )
  }

  const toggleBlocked = (movieId: number) => {
    setBlockedMovies(prev => 
      prev.includes(movieId) 
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    )
  }

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
    // In a real app, this would persist to localStorage
  }

  // Filter categories based on search and blocked content
  const filteredCategories = categories.map(category => ({
    ...category,
    movies: category.movies
      .map(movie => moviesWithStatus.find(m => m.id === movie.id)!)
      .filter(movie => 
        !movie.isBlocked && 
        (searchQuery === '' || 
         movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
         movie.genre.some(g => g.toLowerCase().includes(searchQuery.toLowerCase())))
      )
  })).filter(category => category.movies.length > 0)

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-netflix-darker' : 'bg-white'} text-white transition-colors duration-300 ${userPlan === 'premium' ? 'premium-glow' : ''}`}>
      {/* Video Player Modal */}
      {currentMovie && (
        <VideoPlayer movie={currentMovie} onClose={handleClosePlayer} userPlan={userPlan} />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        onLogout={handleLogout}
        darkMode={darkMode}
        onDarkModeToggle={handleDarkModeToggle}
      />

      {/* Premium Upgrade Modal */}
      <PremiumUpgradeModal
        isOpen={showUpgradeModal}
        onClose={() => setShowUpgradeModal(false)}
        onUpgrade={handleUpgrade}
      />

      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent ${userPlan === 'premium' ? 'premium-border' : ''}`}>
        <div className="flex items-center justify-between px-4 md:px-8 py-4">
          <div className="flex items-center gap-8">
            {/* StreamVaultTV Logo */}
            <div className="flex items-center gap-2">
              <div className={`bg-netflix-red px-3 py-1 rounded font-bold text-xl ${userPlan === 'premium' ? 'animate-pulse-glow' : ''}`}>
                STREAMVAULT
              </div>
              <span className={`text-xl font-bold ${userPlan === 'premium' ? 'premium-text' : ''}`}>TV</span>
              {userPlan === 'premium' && (
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white ml-2 animate-float">
                  <Crown className="w-3 h-3 mr-1" />
                  PREMIUM
                </Badge>
              )}
            </div>
            
            {isLoggedIn && (
              <nav className="hidden md:flex items-center gap-6 text-sm">
                <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
                <a href="#" className="hover:text-gray-300 transition-colors">TV Shows</a>
                <a href="#" className="hover:text-gray-300 transition-colors">Movies</a>
                <a href="#" className="hover:text-gray-300 transition-colors">New & Popular</a>
                <a href="#" className="hover:text-gray-300 transition-colors">My List</a>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {isLoggedIn ? (
              <>
                <div className="relative hidden md:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder="Search titles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-black/50 border-gray-600 text-white placeholder-gray-400 w-64"
                  />
                </div>
                
                {/* Upgrade Button for Basic Users */}
                {userPlan === 'basic' && (
                  <Button
                    onClick={() => setShowUpgradeModal(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white animate-shimmer"
                  >
                    <Crown className="w-4 h-4 mr-2" />
                    Upgrade
                  </Button>
                )}
                
                <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
                <div className="relative">
                  <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300 group">
                    <div className={`w-8 h-8 bg-netflix-red rounded flex items-center justify-center ${userPlan === 'premium' ? 'premium-glow' : ''}`}>
                      <User className="w-4 h-4" />
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                  
                  {/* User Dropdown Menu */}
                  <div className="absolute right-0 top-full mt-2 w-48 bg-black/95 border border-gray-700 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-2">
                      {/* Plan Status */}
                      <div className="px-4 py-2 border-b border-gray-700">
                        <div className="text-xs text-gray-400">Current Plan</div>
                        <div className={`text-sm font-semibold ${userPlan === 'premium' ? 'premium-text' : 'text-white'}`}>
                          {userPlan === 'premium' ? 'Premium' : 'Basic'}
                          {userPlan === 'premium' && <Crown className="w-3 h-3 inline ml-1" />}
                        </div>
                        {userPlan === 'premium' && (
                          <div className="text-xs text-green-400">✓ Ad-free experience</div>
                        )}
                        {userPlan === 'basic' && (
                          <div className="text-xs text-yellow-400">⚠ Includes advertisements</div>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => setShowSettings(true)}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-800 flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Settings
                      </button>
                      <button 
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-800"
                      >
                        Sign Out
                      </button>
                      {userPlan === 'basic' && (
                        <button 
                          onClick={() => setShowUpgradeModal(true)}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-gray-800 flex items-center gap-2 text-purple-400"
                        >
                          <Crown className="w-4 h-4" />
                          Upgrade to Premium
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
                <DialogTrigger asChild>
                  <Button className="bg-netflix-red hover:bg-netflix-red/90">
                    Sign In
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/95 border-gray-800 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">
                      {authMode === 'login' ? 'Sign In' : 'Sign Up'}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-6">
                    <Input 
                      placeholder="Email address"
                      type="email"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                    <Input 
                      placeholder="Password"
                      type="password"
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    />
                    <Button 
                      onClick={handleAuth}
                      className="w-full bg-netflix-red hover:bg-netflix-red/90 py-3"
                    >
                      {authMode === 'login' ? 'Sign In' : 'Sign Up'}
                    </Button>
                    <div className="text-center text-gray-400">
                      {authMode === 'login' ? (
                        <>
                          New to StreamVaultTV?{' '}
                          <button 
                            onClick={() => setAuthMode('signup')}
                            className="text-white hover:underline"
                          >
                            Sign up now
                          </button>
                        </>
                      ) : (
                        <>
                          Already have an account?{' '}
                          <button 
                            onClick={() => setAuthMode('login')}
                            className="text-white hover:underline"
                          >
                            Sign in
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20">
        {isLoggedIn ? (
          <>
            {/* Hero Section */}
            {searchQuery === '' && (
              <section className="relative h-[80vh] flex items-center">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${featuredContent.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                <div className="relative z-10 px-4 md:px-8 max-w-2xl">
                  <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
                    {featuredContent.title}
                  </h1>
                  <div className="flex items-center gap-4 mb-4 text-sm">
                    <Badge variant="outline" className="border-gray-400 text-white">
                      {featuredContent.rating}
                    </Badge>
                    <span>{featuredContent.year}</span>
                    <span>{featuredContent.seasons}</span>
                    <span>{featuredContent.genre}</span>
                  </div>
                  <p className="text-lg mb-8 text-gray-200 leading-relaxed animate-slide-up">
                    {featuredContent.description}
                  </p>
                  <div className="flex gap-4">
                    <Button 
                      size="lg" 
                      onClick={() => handlePlayMovie({
                        id: 0,
                        title: featuredContent.title,
                        description: featuredContent.description,
                        image: featuredContent.image,
                        videoUrl: featuredContent.videoUrl,
                        rating: 8.7,
                        year: 2016,
                        genre: ["Sci-Fi", "Horror", "Drama"],
                        duration: "51m",
                        category: "trending"
                      })}
                      className="bg-white text-black hover:bg-gray-200 px-8"
                    >
                      <Play className="w-5 h-5 mr-2" />
                      Play
                    </Button>
                    <Button size="lg" variant="outline" className="border-gray-400 text-white hover:bg-white/10 px-8">
                      <Info className="w-5 h-5 mr-2" />
                      More Info
                    </Button>
                  </div>
                </div>
              </section>
            )}

            {/* Search Results or Movie Categories */}
            <section className="px-4 md:px-8 pb-20">
              {searchQuery !== '' ? (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">
                    Search Results for "{searchQuery}" ({filteredMovies.length} results)
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {filteredMovies.map((movie) => (
                      <MovieCard 
                        key={movie.id} 
                        movie={movie} 
                        onPlay={handlePlayMovie}
                        onToggleFavorite={toggleFavorite}
                        onToggleBlocked={toggleBlocked}
                      />
                    ))}
                  </div>
                  {filteredMovies.length === 0 && (
                    <div className="text-center py-12 text-gray-400">
                      <p className="text-xl mb-2">No results found</p>
                      <p>Try searching for something else</p>
                    </div>
                  )}
                </div>
              ) : (
                filteredCategories.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="mb-12">
                    <h2 className="text-2xl font-bold mb-6">{category.name}</h2>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                      {category.movies.map((movie) => (
                        <MovieCard 
                          key={movie.id} 
                          movie={movie} 
                          onPlay={handlePlayMovie}
                          onToggleFavorite={toggleFavorite}
                          onToggleBlocked={toggleBlocked}
                        />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </section>
          </>
        ) : (
          /* Landing Page */
          <section className="relative min-h-screen flex items-center justify-center">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ 
                backgroundImage: 'url(https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=1920&h=1080&fit=crop)'
              }}
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="relative z-10 text-center px-4 max-w-4xl">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
                Unlimited movies, TV shows, and more
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-up">
                Watch anywhere. Cancel anytime.
              </p>
              <p className="text-lg mb-8 text-gray-300">
                Ready to watch? Enter your email to create or restart your membership.
              </p>
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-2xl mx-auto">
                <Input 
                  placeholder="Email address"
                  type="email"
                  className="bg-black/50 border-gray-600 text-white placeholder-gray-400 text-lg py-6 flex-1"
                />
                <Button 
                  onClick={() => setShowAuthModal(true)}
                  size="lg" 
                  className="bg-netflix-red hover:bg-netflix-red/90 px-8 py-6 text-lg font-semibold"
                >
                  Get Started
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  )
}

export default App