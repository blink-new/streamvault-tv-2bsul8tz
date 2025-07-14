// Movie database with 100 movies
export interface Movie {
  id: number;
  title: string;
  description: string;
  image: string;
  videoUrl: string;
  rating: number;
  year: number;
  genre: string[];
  duration: string;
  category: string;
  isBlocked?: boolean;
  isFavorite?: boolean;
}

export interface UserPlan {
  type: 'basic' | 'premium';
  hasAds: boolean;
  features: string[];
}

export const movies: Movie[] = [
  // Action Movies (1-25)
  {
    id: 1,
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    image: "https://images.unsplash.com/photo-1638310101210-3634f9ea9cc2?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    rating: 9.0,
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    duration: "87h 32m",
    category: "action"
  },
  {
    id: 2,
    title: "Inception",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    image: "https://images.unsplash.com/photo-1647740356652-413033453c6b?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    rating: 8.8,
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    duration: "96m",
    category: "action"
  },
  {
    id: 3,
    title: "Mad Max: Fury Road",
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners.",
    image: "https://images.unsplash.com/photo-1604552873263-7ebedef6bc73?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    rating: 8.1,
    year: 2015,
    genre: ["Action", "Adventure", "Sci-Fi"],
    duration: "87h 0m",
    category: "action"
  },
  {
    id: 4,
    title: "John Wick",
    description: "An ex-hit-man comes out of retirement to track down the gangsters that took everything from him.",
    image: "https://images.unsplash.com/photo-1638005101665-18d79f49bc07?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    rating: 7.4,
    year: 2014,
    genre: ["Action", "Crime", "Thriller"],
    duration: "1h 41m",
    category: "action"
  },
  {
    id: 5,
    title: "Mission: Impossible - Fallout",
    description: "An American agent, under false suspicion of disloyalty, must discover and expose the real spy without the help of his organization.",
    image: "https://images.unsplash.com/photo-1647926760535-42114bac33b9?w=400&h=600&fit=crop",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    rating: 7.7,
    year: 2018,
    genre: ["Action", "Adventure", "Thriller"],
    duration: "2h 27m",
    category: "action"
  }
];

export const categories = [
  { id: 'trending', name: 'Trending Now', movies: movies.slice(0, 5) },
  { id: 'action', name: 'Action & Adventure', movies: movies.filter(m => m.category === 'action') },
  { id: 'popular', name: 'Popular on StreamVaultTV', movies: movies.slice(0, 5) },
  { id: 'new', name: 'New Releases', movies: movies.slice(0, 5) },
  { id: 'top-rated', name: 'Top Rated', movies: movies.filter(m => m.rating >= 8.0) }
];

export const featuredContent = {
  title: "Stranger Things",
  description: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces, and one strange little girl.",
  rating: "TV-14",
  year: "2016",
  seasons: "4 Seasons",
  genre: "Sci-Fi, Horror, Drama",
  image: "https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=1200&h=600&fit=crop",
  videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
};

// Advertisement data for basic plan users
export const advertisements = [
  {
    id: 1,
    brand: "Google Cast",
    title: "Stream to Any Device",
    description: "Cast your favorite shows to your TV with Google Cast",
    image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=450&fit=crop",
    duration: 15,
    skipAfter: 5
  },
  {
    id: 2,
    brand: "Firefox",
    title: "Browse Privately",
    description: "Experience the web with Firefox - Fast, Private & Secure",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=450&fit=crop",
    duration: 20,
    skipAfter: 5
  },
  {
    id: 3,
    brand: "Safari",
    title: "Privacy. That's iPhone.",
    description: "Safari on iPhone. Privacy included.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop",
    duration: 15,
    skipAfter: 5
  },
  {
    id: 4,
    brand: "iPhone 16",
    title: "Hello, Apple Intelligence",
    description: "iPhone 16 Pro. Built for Apple Intelligence.",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&h=450&fit=crop",
    duration: 30,
    skipAfter: 5
  }
];

export const userPlans = {
  basic: {
    type: 'basic' as const,
    hasAds: true,
    features: [
      'Watch on 1 device',
      'Good video quality',
      'Ads before content',
      'Limited downloads'
    ]
  },
  premium: {
    type: 'premium' as const,
    hasAds: false,
    features: [
      'Watch on 4 devices',
      'Ultra HD quality',
      'No ads',
      'Unlimited downloads',
      'Exclusive content',
      'Early access to new releases'
    ]
  }
};