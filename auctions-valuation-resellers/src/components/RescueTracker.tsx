import React, { useState } from 'react';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Plus, Heart, Trophy, Clock, MapPin, Download } from 'lucide-react';
import { RescueStatsComponent } from './RescueStats';

import { RescueItemCard } from './RescueItemCard';
import { RescueBadges } from './RescueBadges';
import { AddRescueModal } from './AddRescueModal';
import { RescuedItem, RescueStats, RescueBadge } from '@/types/rescue';
import { mockAuctions } from '@/data/mockData';
import { addDays } from 'date-fns';
import { exportRescuesToCSV } from '@/utils/csvExport';


interface RescueTrackerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function RescueTracker({ isOpen, onClose }: RescueTrackerProps) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<RescuedItem | null>(null);

  // Mock data for rescued items
  const [rescuedItems] = useState<RescuedItem[]>([
    {
      id: '1',
      itemType: 'photo',
      description: 'Family photo album from 1960s',
      dateFound: new Date('2025-09-25'),
      dateReported: new Date('2025-09-26'),
      status: 'holding',
      holdDeadline: addDays(new Date('2025-09-26'), 30),
      auctionAddress: '123 Main St, Springfield',
      verificationStatus: 'pending',
      contactAttempts: []
    },
    {
      id: '2',
      itemType: 'letter',
      description: 'Love letters from WWII era',
      dateFound: new Date('2025-09-20'),
      dateReported: new Date('2025-09-21'),
      status: 'dropped_off',
      holdDeadline: addDays(new Date('2025-09-21'), 30),
      dropOffLocation: 'ReFURRM Unit #42',
      dropOffDate: new Date('2025-10-01'),
      auctionAddress: '456 Oak Ave, Riverside',
      verificationStatus: 'verified',
      contactAttempts: []
    },
    {
      id: '3',
      itemType: 'jewelry',
      description: 'Wedding ring with inscription',
      dateFound: new Date('2025-10-05'),
      dateReported: new Date('2025-10-06'),
      status: 'holding',
      holdDeadline: addDays(new Date('2025-10-06'), 30),
      auctionAddress: '789 Elm St, Oakville',
      verificationStatus: 'pending',
      contactAttempts: []
    }
  ]);

  const stats: RescueStats = {
    totalRescues: 12,
    activeHolds: 3,
    verifiedReturns: 7,
    dropOffs: 2,
    impactScore: 850,
    currentStreak: 14,
    badges: [
      { id: 'first_rescue', name: 'First Rescue', description: 'Completed your first rescue', icon: '🎯', earnedDate: new Date('2025-09-20'), requirement: 1, type: 'rescues' },
      { id: 'ten_rescues', name: 'Rescue Hero', description: 'Rescued 10 items', icon: '🦸', earnedDate: new Date('2025-10-01'), requirement: 10, type: 'rescues' }
    ]
  };

  const allBadges: RescueBadge[] = [
    { id: 'first_rescue', name: 'First Rescue', description: 'Complete your first rescue', icon: '🎯', requirement: 1, type: 'rescues' },
    { id: 'ten_rescues', name: 'Rescue Hero', description: 'Rescue 10 items', icon: '🦸', requirement: 10, type: 'rescues' },
    { id: 'fifty_rescues', name: 'Guardian Angel', description: 'Rescue 50 items', icon: '👼', requirement: 50, type: 'rescues' },
    { id: 'hundred_rescues', name: 'Rescue Legend', description: 'Rescue 100 items', icon: '🏆', requirement: 100, type: 'rescues' },
    { id: 'week_streak', name: 'Week Warrior', description: '7-day rescue streak', icon: '🔥', requirement: 7, type: 'streak' },
    { id: 'month_streak', name: 'Monthly Master', description: '30-day rescue streak', icon: '⚡', requirement: 30, type: 'streak' }
  ];

  const handleAddRescue = (data: any) => {
    console.log('Adding rescue:', data);
    setShowAddModal(false);
  };

  const handleViewDetails = (item: RescuedItem) => {
    setSelectedItem(item);
  };

  const handleAddDocument = (item: RescuedItem) => {
    console.log('Adding document for:', item);
  };

  const handleExportCSV = () => {
    exportRescuesToCSV(rescuedItems, `rescue-history-${new Date().toISOString().split('T')[0]}.csv`);
  };


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Heart className="h-6 w-6 text-pink-500" />
            Rescue Tracker Dashboard
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-between items-center mt-4">
          <RescueStatsComponent stats={stats} />
          <Button onClick={handleExportCSV} variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export All Records
          </Button>
        </div>

        <Tabs defaultValue="active" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="active">Active Rescues</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="badges">Badges & Rewards</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Items Currently Holding</h3>
              <Button onClick={() => setShowAddModal(true)} className="bg-pink-500 hover:bg-pink-600">
                <Plus className="h-4 w-4 mr-2" />
                Report New Rescue
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rescuedItems.filter(item => item.status === 'holding').map(item => (
                <RescueItemCard
                  key={item.id}
                  item={item}
                  onViewDetails={handleViewDetails}
                  onAddDocument={handleAddDocument}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Rescue History</h3>
              <Button onClick={handleExportCSV} variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export to CSV
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rescuedItems.filter(item => item.status !== 'holding').map(item => (
                <RescueItemCard
                  key={item.id}
                  item={item}
                  onViewDetails={handleViewDetails}
                  onAddDocument={handleAddDocument}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="badges" className="mt-6">
            <RescueBadges badges={stats.badges} allBadges={allBadges} />
          </TabsContent>
        </Tabs>

        <AddRescueModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={handleAddRescue}
          auctions={mockAuctions.map(a => ({
            id: a.id,
            address: a.address,
            date: a.auctionDate
          }))}
        />
      </DialogContent>
    </Dialog>
  );
}