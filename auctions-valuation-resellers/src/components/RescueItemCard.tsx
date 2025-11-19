import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, CheckCircle, AlertCircle, Camera, FileText } from 'lucide-react';
import { RescuedItem } from '@/types/rescue';
import { format, differenceInDays } from 'date-fns';

interface RescueItemCardProps {
  item: RescuedItem;
  onViewDetails: (item: RescuedItem) => void;
  onAddDocument: (item: RescuedItem) => void;
}

export function RescueItemCard({ item, onViewDetails, onAddDocument }: RescueItemCardProps) {
  const daysRemaining = differenceInDays(item.holdDeadline, new Date());
  const isUrgent = daysRemaining <= 7 && item.status === 'holding';

  const statusColors = {
    holding: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    dropped_off: 'bg-blue-100 text-blue-800 border-blue-300',
    returned: 'bg-green-100 text-green-800 border-green-300',
    verified: 'bg-purple-100 text-purple-800 border-purple-300'
  };

  const typeIcons = {
    photo: '📷',
    letter: '✉️',
    jewelry: '💍',
    document: '📄',
    ashes: '⚱️',
    heirloom: '🏺',
    other: '📦'
  };

  return (
    <Card className={`p-4 hover:shadow-lg transition-shadow ${isUrgent ? 'border-orange-400 bg-orange-50' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{typeIcons[item.itemType]}</span>
          <div>
            <h3 className="font-semibold text-gray-900">{item.description}</h3>
            <p className="text-sm text-gray-500">Found {format(item.dateFound, 'MMM d, yyyy')}</p>
          </div>
        </div>
        <Badge className={statusColors[item.status]}>
          {item.status.replace('_', ' ')}
        </Badge>
      </div>

      {item.auctionAddress && (
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <MapPin className="h-4 w-4" />
          <span>{item.auctionAddress}</span>
        </div>
      )}

      {item.status === 'holding' && (
        <div className={`flex items-center gap-2 mb-3 ${isUrgent ? 'text-orange-600' : 'text-gray-600'}`}>
          <Clock className="h-4 w-4" />
          <span className="text-sm font-medium">
            {daysRemaining > 0 ? `${daysRemaining} days remaining` : 'Overdue'}
          </span>
          {isUrgent && <AlertCircle className="h-4 w-4" />}
        </div>
      )}

      {item.verificationStatus === 'verified' && (
        <div className="flex items-center gap-2 text-green-600 mb-3">
          <CheckCircle className="h-4 w-4" />
          <span className="text-sm font-medium">Verified Rescue</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onAddDocument(item)}
            className="flex items-center gap-1"
          >
            <Camera className="h-3 w-3" />
            Add Doc
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails(item)}
            className="flex items-center gap-1"
          >
            <FileText className="h-3 w-3" />
            Details
          </Button>
        </div>
        <span className="text-xs text-gray-500">
          {item.contactAttempts.length} contact attempts
        </span>
      </div>
    </Card>
  );
}