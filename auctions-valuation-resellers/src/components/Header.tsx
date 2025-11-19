import React, { useState } from 'react';
import { Bell, Menu, X, Crown, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onUpgradeClick: () => void;
  userTier: 'free' | 'premium';
  scansRemaining: number;
}

export const Header: React.FC<HeaderProps> = ({ onUpgradeClick, userTier, scansRemaining }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-purple-900 to-purple-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
            <div className="bg-amber-500 p-2 rounded-lg">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">ReFURRM Scan</h1>
              <p className="text-xs text-purple-200">Auction Intelligence Platform</p>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <div className="text-sm">
              <span className="text-purple-200">Scans: </span>
              <span className="font-bold">{userTier === 'premium' ? '∞' : scansRemaining}</span>
            </div>
            <button 
              onClick={() => navigate('/billing-history')}
              className="hover:text-amber-400 transition flex items-center space-x-2"
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-sm">Billing</span>
            </button>
            <Bell className="w-5 h-5 cursor-pointer hover:text-amber-400 transition" />
            {userTier === 'free' && (
              <button onClick={onUpgradeClick} className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg font-semibold transition flex items-center space-x-2">
                <Crown className="w-4 h-4" />
                <span>Upgrade</span>
              </button>
            )}
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </header>
  );
};

