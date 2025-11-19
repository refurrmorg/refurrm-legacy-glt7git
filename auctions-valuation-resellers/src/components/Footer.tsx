import React from 'react';
import { Crown, Mail, Phone, MapPin, Shield, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-purple-900 to-purple-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="w-6 h-6 text-amber-500" />
              <span className="text-xl font-bold">ReFURRM Scan</span>
            </div>
            <p className="text-purple-200 text-sm">
              Ethical auction intelligence for resellers and collectors. Protecting irreplaceable items since 2025.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li><a href="#" className="hover:text-amber-400 transition">Dashboard</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Scan Auctions</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Value Estimator</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Compliance</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li className="flex items-center space-x-2 hover:text-amber-400 transition cursor-pointer">
                <FileText className="w-4 h-4" />
                <span>Terms of Service</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-amber-400 transition cursor-pointer">
                <Shield className="w-4 h-4" />
                <span>Privacy Policy</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-amber-400 transition cursor-pointer">
                <FileText className="w-4 h-4" />
                <span>GDPR Compliance</span>
              </li>
              <li className="flex items-center space-x-2 hover:text-amber-400 transition cursor-pointer">
                <Shield className="w-4 h-4" />
                <span>AR State Law</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 text-purple-200 text-sm">
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>support@refurrm.org</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Twilio SMS Alerts</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Russellville, AR</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-purple-700 mt-8 pt-8 text-center text-purple-300 text-sm">
          <p>© 2025 ReFURRM Scan. Part of ReFURRM.ORG ecosystem. Firebase + Stripe + Twilio powered.</p>
          <p className="mt-2">Protecting 500+ units Year 1, scaling to 8,000 users by Year 3.</p>
          <p className="mt-3 text-purple-400 font-semibold">
            By using this application, you acknowledge and accept all terms, conditions, and regulatory requirements.
          </p>
        </div>
      </div>
    </footer>
  );
};
