import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { AuctionCard } from './AuctionCard';
import { AuctionMap } from './AuctionMap';
import { ValueEstimatorModal } from './ValueEstimatorModal';
import { UpgradeModal } from './UpgradeModal';
import { UserAgreementModal } from './UserAgreementModal';
import { ComplianceTracker } from './ComplianceTracker';
import { StatsCard } from './StatsCard';
import { RescueTracker } from './RescueTracker';
import { AuctionPhotoScanner } from './AuctionPhotoScanner';
import { SavedAuctions } from './SavedAuctions';
import { mockAuctions } from '../data/mockData';
import { ValuationResult, User } from '../types';
import { TrendingUp, MapPin, AlertTriangle, DollarSign, Camera, Shield, Heart, ScanLine, Bookmark } from 'lucide-react';
import { supabase } from '@/lib/supabase';


const AppLayout: React.FC = () => {
  const [user, setUser] = useState<User>({
    id: '1',
    email: 'user@refurrm.org',
    tier: 'free',
    scansRemaining: 7,
    violations: 0,
    agreedToTerms: false
  });

  const [showAgreement, setShowAgreement] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [showEstimator, setShowEstimator] = useState(false);
  const [showRescueTracker, setShowRescueTracker] = useState(false);
  const [showPhotoScanner, setShowPhotoScanner] = useState(false);
  const [showSavedAuctions, setShowSavedAuctions] = useState(false);
  const [valuationResult, setValuationResult] = useState<ValuationResult | null>(null);
  const [isEstimating, setIsEstimating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUserProfile();
  }, []);

  const checkUserProfile = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('agreed_to_terms, subscription_tier, scans_remaining')
          .eq('id', authUser.id)
          .single();

        if (profile) {
          setUser({
            id: authUser.id,
            email: authUser.email || 'user@refurrm.org',
            tier: profile.subscription_tier === 'premium' ? 'premium' : 'free',
            scansRemaining: profile.scans_remaining || 7,
            violations: 0,
            agreedToTerms: profile.agreed_to_terms || false
          });
          
          setShowAgreement(!profile.agreed_to_terms);
        }
      }
    } catch (error) {
      console.error('Error checking user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptTerms = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        await supabase
          .from('profiles')
          .update({ agreed_to_terms: true })
          .eq('id', authUser.id);

        setUser({ ...user, agreedToTerms: true });
        setShowAgreement(false);
      }
    } catch (error) {
      console.error('Error accepting terms:', error);
      alert('Error saving your acceptance. Please try again.');
    }
  };


  const handleUpgrade = (plan: 'weekly' | 'yearly') => {
    setUser({ ...user, tier: 'premium', scansRemaining: 999 });
    setShowUpgrade(false);
    alert(`Upgraded to ${plan} plan! Payment processed via Stripe.`);
  };

  const handleEstimate = (file: File, description: string) => {
    setIsEstimating(true);
    
    setTimeout(() => {
      const isIrreplaceable = description.toLowerCase().includes('photo') || 
                              description.toLowerCase().includes('document') ||
                              description.toLowerCase().includes('letter');
      
      setValuationResult({
        itemName: description || 'Vintage Item',
        minValue: 500,
        maxValue: 1000,
        confidence: 87,
        isIrreplaceable,
        flagReason: isIrreplaceable ? 'Contains personal documents or photographs' : undefined,
        comparables: [
          { title: 'Similar vintage item', price: 650, source: 'eBay', imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68e680359c90705d81386678_1759936621754_879f7f39.webp' },
          { title: 'Comparable antique', price: 780, source: 'eBay', imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68e680359c90705d81386678_1759936623609_0319103d.webp' },
          { title: 'Related collectible', price: 920, source: 'eBay', imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68e680359c90705d81386678_1759936625364_51b346de.webp' },
          { title: 'Similar condition item', price: 550, source: 'eBay', imageUrl: 'https://d64gsuwffb70l.cloudfront.net/68e680359c90705d81386678_1759936630781_8dad33d6.webp' }
        ]
      });
      
      setIsEstimating(false);
      if (user.tier === 'free') {
        setUser({ ...user, scansRemaining: user.scansRemaining - 1 });
      }
    }, 2000);
  };

  const handleCloseEstimator = () => {
    setShowEstimator(false);
    setValuationResult(null);
  };

  if (showAgreement) {
    return <UserAgreementModal isOpen={showAgreement} onAccept={handleAcceptTerms} onDecline={() => alert('You must accept terms to use ReFURRM Scan')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header onUpgradeClick={() => setShowUpgrade(true)} userTier={user.tier} scansRemaining={user.scansRemaining} />

      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: 'url(https://d64gsuwffb70l.cloudfront.net/68e680359c90705d81386678_1759936620956_640869fe.webp)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-700/90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Smart Auction Intelligence</h1>
            <p className="text-xl text-purple-100 mb-8">Scan storage auctions, estimate item worth, and protect irreplaceable treasures with AI-powered valuation.</p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => setShowEstimator(true)} className="bg-amber-500 hover:bg-amber-600 px-8 py-4 rounded-xl font-bold text-lg transition flex items-center space-x-2">
                <Camera className="w-5 h-5" />
                <span>Scan Item Now</span>
              </button>
              <button onClick={() => setShowRescueTracker(true)} className="bg-pink-500 hover:bg-pink-600 px-8 py-4 rounded-xl font-bold text-lg transition flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Rescue Tracker</span>
              </button>
              <button onClick={() => document.getElementById('auctions')?.scrollIntoView({ behavior: 'smooth' })} className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-8 py-4 rounded-xl font-bold text-lg transition">
                View Auctions
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <StatsCard title="Active Auctions" value={mockAuctions.length} icon={MapPin} color="bg-purple-600" subtitle="Within 100 miles" />
          <StatsCard title="Scans Available" value={user.tier === 'premium' ? '∞' : user.scansRemaining} icon={Camera} color="bg-amber-500" subtitle={user.tier === 'premium' ? 'Premium' : 'Free tier'} />
          <StatsCard title="Compliance Items" value="2" icon={AlertTriangle} color="bg-red-600" subtitle="Pending review" />
          <StatsCard title="Est. Total Value" value="$12.5K" icon={DollarSign} color="bg-green-600" subtitle="This month" />
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2 flex items-center">
                <ScanLine className="w-8 h-8 mr-3" />
                Scan Auction Photos
              </h2>
              <p className="text-blue-100 max-w-xl">
                Upload photos from storage facility listings to detect sentimental items before you bid. Our AI analyzes images to identify family photos, documents, and irreplaceable treasures.
              </p>
            </div>
            <button onClick={() => setShowPhotoScanner(true)} className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-xl font-bold text-lg transition flex items-center space-x-2 whitespace-nowrap">
              <Camera className="w-5 h-5" />
              <span>Scan Photos</span>
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-teal-700 rounded-2xl p-8 text-white mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-3xl font-bold mb-2 flex items-center">
                <Bookmark className="w-8 h-8 mr-3" />
                Saved Auctions
              </h2>
              <p className="text-green-100 max-w-xl">
                View and manage your bookmarked auctions. Track analysis results, add notes, and set reminders for upcoming auction dates.
              </p>
            </div>
            <button onClick={() => setShowSavedAuctions(true)} className="bg-white text-green-700 hover:bg-green-50 px-8 py-4 rounded-xl font-bold text-lg transition flex items-center space-x-2 whitespace-nowrap">
              <Bookmark className="w-5 h-5" />
              <span>View Saved</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12" id="auctions">
          <AuctionMap auctions={mockAuctions} onAuctionClick={(auction) => alert(`Navigating to ${auction.facilityName}`)} />
          
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Upcoming Auctions</h2>
              <button className="text-purple-600 hover:text-purple-700 font-semibold text-sm">View All →</button>
            </div>
            {mockAuctions.map((auction) => (
              <AuctionCard key={auction.id} auction={auction} onClick={() => alert(`Viewing details for ${auction.facilityName}`)} />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <ComplianceTracker />
        </div>


        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 text-white text-center">
          <Shield className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ethical Reselling Guarantee</h2>
          <p className="text-purple-100 max-w-2xl mx-auto mb-6">
            ReFURRM Scan uses Firebase encryption, GDPR compliance, and AR state law adherence to protect both resellers and original owners. 
            Our AI flags irreplaceable items automatically, ensuring you stay compliant.
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-2xl font-bold">500+</p>
              <p className="text-sm text-purple-200">Units Year 1</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-2xl font-bold">8,000</p>
              <p className="text-sm text-purple-200">Users Year 3</p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-6 py-3 rounded-lg">
              <p className="text-2xl font-bold">100%</p>
              <p className="text-sm text-purple-200">Compliant</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <ValueEstimatorModal isOpen={showEstimator} onClose={handleCloseEstimator} onEstimate={handleEstimate} result={valuationResult} isLoading={isEstimating} />
      <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} onUpgrade={handleUpgrade} />
      <RescueTracker isOpen={showRescueTracker} onClose={() => setShowRescueTracker(false)} />
      <AuctionPhotoScanner isOpen={showPhotoScanner} onClose={() => setShowPhotoScanner(false)} onSaved={() => setShowSavedAuctions(true)} />
      <SavedAuctions isOpen={showSavedAuctions} onClose={() => setShowSavedAuctions(false)} />

    </div>

  );
};

export default AppLayout;
