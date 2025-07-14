import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Settings, 
  Moon, 
  Sun, 
  Shield, 
  CreditCard, 
  Heart, 
  Ban, 
  LogOut,
  Crown,
  Check,
  Star
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogout: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export function SettingsModal({ 
  isOpen, 
  onClose, 
  onLogout, 
  darkMode, 
  onDarkModeToggle 
}: SettingsModalProps) {
  const [currentPlan, setCurrentPlan] = useState('Standard');
  const [autoPlay, setAutoPlay] = useState(true);
  const [notifications, setNotifications] = useState(true);
  const [dataUsage, setDataUsage] = useState('High');

  const subscriptionPlans = [
    {
      name: 'Standard with adverts',
      price: '$7.99',
      features: [
        'Video and sound quality: Good',
        'Resolution: 1080p (Full HD)',
        'Supported devices: TV, computer, mobile phone, tablet',
        'Devices your household can watch at the same time: 2',
        'Download devices: 2',
        'Adverts: Fewer than you might think'
      ],
      popular: false
    },
    {
      name: 'Standard',
      price: '$17.99',
      features: [
        'Video and sound quality: Good',
        'Resolution: 1080p (Full HD)',
        'Supported devices: TV, computer, mobile phone, tablet',
        'Devices your household can watch at the same time: 2',
        'Download devices: 2',
        'Adverts: No adverts'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '$24.99',
      features: [
        'Video and sound quality: Best',
        'Resolution: 4K (Ultra HD) + HDR',
        'Spatial audio (immersive sound): Included',
        'Supported devices: TV, computer, mobile phone, tablet',
        'Devices your household can watch at the same time: 4',
        'Download devices: 6',
        'Adverts: No adverts'
      ],
      popular: false
    }
  ];

  const handleUpgrade = (planName: string) => {
    setCurrentPlan(planName);
    // In a real app, this would integrate with Stripe or payment processor
    alert(`Upgraded to ${planName} plan! 🎉`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-netflix-darker border-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Settings className="w-6 h-6" />
            Settings
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800">
            <TabsTrigger value="general" className="text-xs">General</TabsTrigger>
            <TabsTrigger value="security" className="text-xs">Security</TabsTrigger>
            <TabsTrigger value="billing" className="text-xs">Billing</TabsTrigger>
            <TabsTrigger value="favorites" className="text-xs">Favorites</TabsTrigger>
            <TabsTrigger value="blocked" className="text-xs">Blocked</TabsTrigger>
            <TabsTrigger value="account" className="text-xs">Account</TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Display Settings</CardTitle>
                <CardDescription className="text-gray-400">
                  Customize your viewing experience
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    <span>Dark Mode</span>
                  </div>
                  <Switch checked={darkMode} onCheckedChange={onDarkModeToggle} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Auto-play next episode</span>
                  <Switch checked={autoPlay} onCheckedChange={setAutoPlay} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Push notifications</span>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>
                
                <div className="flex items-center justify-between">
                  <span>Data usage</span>
                  <select 
                    value={dataUsage} 
                    onChange={(e) => setDataUsage(e.target.value)}
                    className="bg-gray-800 border border-gray-600 rounded px-3 py-1 text-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Auto">Auto</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5" />
                  Security & Privacy
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your account security settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start border-gray-600 text-white hover:bg-gray-800">
                  Change Password
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600 text-white hover:bg-gray-800">
                  Enable Two-Factor Authentication
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600 text-white hover:bg-gray-800">
                  Manage Connected Devices
                </Button>
                <Button variant="outline" className="w-full justify-start border-gray-600 text-white hover:bg-gray-800">
                  Download Your Data
                </Button>
                <div className="pt-4">
                  <h4 className="font-semibold mb-2">Parental Controls</h4>
                  <p className="text-sm text-gray-400 mb-3">Set content restrictions for child profiles</p>
                  <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                    Manage Parental Controls
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing & Subscription */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CreditCard className="w-5 h-5" />
                  Current Plan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{currentPlan}</h3>
                    <p className="text-gray-400">Next billing date: January 15, 2025</p>
                  </div>
                  <Badge variant="secondary" className="bg-netflix-red text-white">
                    Active
                  </Badge>
                </div>
                <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800">
                  Manage Payment Methods
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Plans */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white mb-4">Upgrade to StreamVaultTV+</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {subscriptionPlans.map((plan) => (
                  <Card 
                    key={plan.name} 
                    className={`bg-gray-900 border-gray-700 relative ${plan.popular ? 'ring-2 ring-netflix-red' : ''}`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-netflix-red text-white px-3 py-1">
                          <Crown className="w-3 h-3 mr-1" />
                          Most Popular
                        </Badge>
                      </div>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-white">{plan.name}</CardTitle>
                      <div className="text-2xl font-bold text-netflix-red">
                        {plan.price}
                        <span className="text-sm text-gray-400">/month</span>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                      <Button 
                        onClick={() => handleUpgrade(plan.name)}
                        className={`w-full mt-4 ${
                          currentPlan === plan.name 
                            ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                            : 'bg-netflix-red hover:bg-netflix-red/90 text-white'
                        }`}
                        disabled={currentPlan === plan.name}
                      >
                        {currentPlan === plan.name ? 'Current Plan' : 'Upgrade'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Favorite Movies */}
          <TabsContent value="favorites" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Heart className="w-5 h-5" />
                  Favorite Movies
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Movies and shows you've added to your favorites
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {[
                    { title: "The Dark Knight", rating: 9.0, year: 2008 },
                    { title: "Inception", rating: 8.8, year: 2010 },
                    { title: "Interstellar", rating: 8.6, year: 2014 },
                    { title: "The Matrix", rating: 8.7, year: 1999 },
                    { title: "Pulp Fiction", rating: 8.9, year: 1994 },
                    { title: "Fight Club", rating: 8.8, year: 1999 }
                  ].map((movie, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-white">{movie.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{movie.rating}</span>
                          <span>•</span>
                          <span>{movie.year}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Blocked Movies */}
          <TabsContent value="blocked" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Ban className="w-5 h-5" />
                  Blocked Content
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Movies and shows you've blocked from appearing in recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { title: "Horror Movie Collection", reason: "Too scary" },
                    { title: "Adult Comedy Series", reason: "Inappropriate content" },
                    { title: "Documentary Series", reason: "Not interested" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-white">{item.title}</h4>
                        <p className="text-sm text-gray-400">Reason: {item.reason}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-green-400 hover:text-green-300">
                        Unblock
                      </Button>
                    </div>
                  ))}
                </div>
                {/* Empty state */}
                <div className="text-center py-8 text-gray-400">
                  <Ban className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No blocked content</p>
                  <p className="text-sm">Content you block will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Management */}
          <TabsContent value="account" className="space-y-6">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Account Management</CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your account settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-white">Profile Information</h4>
                  <p className="text-gray-400">john.doe@example.com</p>
                  <p className="text-gray-400">Member since: January 2023</p>
                </div>
                
                <Separator className="bg-gray-700" />
                
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-gray-600 text-white hover:bg-gray-800">
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-600 text-white hover:bg-gray-800">
                    Manage Profiles
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-600 text-white hover:bg-gray-800">
                    Account Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-600 text-white hover:bg-gray-800">
                    Help Center
                  </Button>
                </div>
                
                <Separator className="bg-gray-700" />
                
                <Button 
                  onClick={onLogout}
                  variant="destructive" 
                  className="w-full justify-start bg-red-600 hover:bg-red-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}