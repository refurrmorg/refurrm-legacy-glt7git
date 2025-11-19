import React, { useState, useEffect } from 'react';
import { X, Check, Crown, Zap } from 'lucide-react';
import { CheckoutButton } from './CheckoutButton';
import { supabase } from '@/lib/supabase';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpgrade: (plan: 'weekly' | 'yearly') => void;
}

export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'yearly'>('yearly');
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  if (!isOpen) return null;

  const features = [
    'Unlimited item scans',
    'Detailed PDF valuation reports',
    'Bulk scanning (up to 50 items)',
    'Priority Twilio notifications',
    'Advanced geolocation filters',
    'Historical price trends',
    'Export data to CSV',
    'Priority customer support'
  ];

  // Stripe Price IDs (replace with your actual Stripe Price IDs)
  const priceIds = {
    weekly: 'price_weekly_199',
    yearly: 'price_yearly_8999'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl">
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Upgrade to Premium</h2>
            </div>
            <button onClick={onClose} className="hover:bg-amber-700 p-2 rounded-lg transition">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div onClick={() => setSelectedPlan('weekly')} className={`border-2 rounded-xl p-4 cursor-pointer transition ${selectedPlan === 'weekly' ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900">Weekly</span>
                <Zap className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600">$1.99</p>
              <p className="text-sm text-gray-600">per week</p>
            </div>

            <div onClick={() => setSelectedPlan('yearly')} className={`border-2 rounded-xl p-4 cursor-pointer transition relative ${selectedPlan === 'yearly' ? 'border-purple-600 bg-purple-50' : 'border-gray-300 hover:border-purple-400'}`}>
              <div className="absolute -top-3 right-4 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                SAVE 13%
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-gray-900">Yearly</span>
                <Crown className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-3xl font-bold text-purple-600">$89.99</p>
              <p className="text-sm text-gray-600">per year</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="font-bold text-gray-900 mb-3">Premium Features:</h3>
            <div className="grid grid-cols-2 gap-2">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center space-x-2">
                  <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {userId ? (
            <CheckoutButton
              priceId={priceIds[selectedPlan]}
              paymentType="subscription"
              userId={userId}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white py-4 rounded-xl font-bold text-lg"
            >
              <Crown className="w-5 h-5 mr-2" />
              Upgrade Now - {selectedPlan === 'weekly' ? '$1.99/week' : '$89.99/year'}
            </CheckoutButton>
          ) : (
            <button className="w-full bg-gray-400 text-white py-4 rounded-xl font-bold text-lg" disabled>
              Please sign in to upgrade
            </button>
          )}

          <p className="text-xs text-gray-500 text-center">
            Secure payment via Stripe. Cancel anytime. GDPR compliant.
          </p>
        </div>
      </div>
    </div>
  );
};

