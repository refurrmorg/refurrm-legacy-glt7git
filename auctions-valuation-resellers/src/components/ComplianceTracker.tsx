import React, { useState, useEffect } from 'react';
import { AlertTriangle, Upload, CheckCircle, Clock } from 'lucide-react';
import { CheckoutButton } from './CheckoutButton';
import { supabase } from '@/lib/supabase';

interface ComplianceItem {
  id: string;
  itemName: string;
  flagDate: string;
  daysRemaining: number;
  proofUploaded: boolean;
  status: 'pending' | 'compliant' | 'violation';
}

const mockItems: ComplianceItem[] = [
  {
    id: '1',
    itemName: 'Family Photo Album',
    flagDate: '2025-10-01',
    daysRemaining: 23,
    proofUploaded: true,
    status: 'compliant'
  },
  {
    id: '2',
    itemName: 'Military Service Documents',
    flagDate: '2025-10-05',
    daysRemaining: 27,
    proofUploaded: false,
    status: 'pending'
  }
];

export const ComplianceTracker: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [showFineModal, setShowFineModal] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
    };
    getUser();
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          <h2 className="text-2xl font-bold text-gray-900">Compliance Tracker</h2>
        </div>
        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
          {mockItems.length} Active Items
        </span>
      </div>

      <div className="space-y-4">
        {mockItems.map((item) => (
          <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-gray-900">{item.itemName}</h3>
                <p className="text-sm text-gray-600">Flagged: {item.flagDate}</p>
              </div>
              {item.status === 'compliant' ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <Clock className="w-6 h-6 text-amber-600" />
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm text-gray-600">Days Remaining:</span>
                  <span className={`font-bold ${item.daysRemaining < 7 ? 'text-red-600' : 'text-green-600'}`}>
                    {item.daysRemaining}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full ${item.daysRemaining < 7 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${(item.daysRemaining / 30) * 100}%` }} />
                </div>
              </div>

              <button className={`ml-4 px-4 py-2 rounded-lg font-semibold transition flex items-center space-x-2 ${item.proofUploaded ? 'bg-green-100 text-green-700' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
                <Upload className="w-4 h-4" />
                <span>{item.proofUploaded ? 'Uploaded' : 'Upload Proof'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
        <p className="text-sm text-red-800 mb-3">
          <span className="font-bold">Reminder:</span> Failure to upload proof within 7 days or dispose of items before 30 days results in a $100 fine and account termination.
        </p>
        {userId && (
          <CheckoutButton
            amount={100}
            description="Compliance Fine - Violation of Irreplaceable Items Policy"
            paymentType="fine"
            userId={userId}
            className="bg-red-600 hover:bg-red-700 text-white text-sm"
          >
            Pay Compliance Fine ($100)
          </CheckoutButton>
        )}
      </div>
    </div>
  );
};

