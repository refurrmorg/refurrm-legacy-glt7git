export interface RescuedItem {
  id: string;
  itemType: 'photo' | 'letter' | 'jewelry' | 'document' | 'ashes' | 'heirloom' | 'other';
  description: string;
  dateFound: Date;
  dateReported: Date;
  status: 'holding' | 'dropped_off' | 'returned' | 'verified';
  holdDeadline: Date;
  dropOffLocation?: string;
  dropOffDate?: Date;
  photoUrl?: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  contactAttempts: ContactAttempt[];
  auctionId?: string;
  auctionAddress?: string;
}

export interface ContactAttempt {
  id: string;
  date: Date;
  method: 'phone' | 'email' | 'mail' | 'in_person';
  notes: string;
  documentUrl?: string;
}

export interface RescueBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedDate?: Date;
  requirement: number;
  type: 'rescues' | 'streak' | 'special';
}

export interface RescueStats {
  totalRescues: number;
  activeHolds: number;
  verifiedReturns: number;
  dropOffs: number;
  impactScore: number;
  currentStreak: number;
  badges: RescueBadge[];
}