import React, { useState } from 'react';
import { AlertTriangle, X, Shield, Heart, Award } from 'lucide-react';

interface UserAgreementModalProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export const UserAgreementModal: React.FC<UserAgreementModalProps> = ({ isOpen, onAccept, onDecline }) => {
  const [agreed, setAgreed] = useState(false);

  if (!isOpen) return null;

  const handleReviewGuidelines = () => {
    window.open('https://refurrm.com/guidelines', '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8" />
              <h2 className="text-2xl font-bold">User Agreement Required</h2>
            </div>
            <button onClick={onDecline} className="hover:bg-red-800 p-2 rounded-lg transition">
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded mb-4">
            <p className="text-sm text-gray-800 font-semibold">
              By using ReFURRM Scout, you agree to uphold our ethical-use standards and Rescue Rules. 
              Continued use means you understand your responsibility to handle all sentimental finds 
              with respect and care.
            </p>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <div className="flex items-start space-x-3">
              <Heart className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div className="text-sm text-gray-700">
                <p className="font-bold text-amber-900 mb-2">Rescue Rules Overview</p>
                <p className="leading-relaxed">
                  Important personal items such as photos, ashes, letters, and heirlooms must never be 
                  discarded or misused. Buyers must either:
                </p>
                <ul className="list-disc list-inside mt-2 ml-2 space-y-1">
                  <li>Hold sentimental items for thirty days, or</li>
                  <li>Drop them at a local ReFURRM Rescue Unit within seventy-two hours.</li>
                </ul>
                <p className="mt-2">
                  Upload proof of contact attempts or drop-offs in the app. Verified rescues earn 
                  recognition and perks.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 border-l-4 border-gray-400 p-4 rounded">
            <h3 className="font-bold text-lg text-gray-900 mb-3">Your Responsibilities</h3>
            <ul className="list-disc list-inside space-y-2 ml-2 text-sm text-gray-700">
              <li>Report flagged items in the app within seven days.</li>
              <li>Keep a short record or photo of rescued items.</li>
              <li>Respect privacy. Never post or sell private materials.</li>
              <li>Follow ReFURRM's thirty-day return window.</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
            <div className="flex items-start space-x-3">
              <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              <div className="text-sm text-gray-700">
                <p className="font-bold text-green-900 mb-2">Community Rewards</p>
                <p className="leading-relaxed">
                  Ethical buyers keep access to premium scans, verified-buyer badges, and early 
                  auction data. Serious violations like exploiting personal items may result in 
                  account suspension.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-3 pt-4">
            <input 
              type="checkbox" 
              checked={agreed} 
              onChange={(e) => setAgreed(e.target.checked)} 
              className="mt-1 w-5 h-5 text-purple-600 rounded focus:ring-purple-500" 
            />
            <label className="text-sm text-gray-700">
              ☑ I acknowledge and accept the ReFURRM Rescue Rules and User Agreement.
            </label>
          </div>

          <div className="flex space-x-3 pt-4">
            <button 
              onClick={onAccept} 
              disabled={!agreed} 
              className={`flex-1 py-3 rounded-lg font-bold transition ${
                agreed 
                  ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Accept & Continue
            </button>
            <button 
              onClick={handleReviewGuidelines} 
              className="flex-1 py-3 rounded-lg font-bold bg-gray-200 hover:bg-gray-300 text-gray-700 transition"
            >
              Review Full Guidelines
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};