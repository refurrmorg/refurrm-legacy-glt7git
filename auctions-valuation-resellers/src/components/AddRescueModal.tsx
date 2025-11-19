import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Upload, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface AddRescueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  auctions: Array<{ id: string; address: string; date: string }>;
}

export function AddRescueModal({ isOpen, onClose, onSubmit, auctions }: AddRescueModalProps) {
  const [formData, setFormData] = useState({
    itemType: '',
    description: '',
    dateFound: new Date(),
    auctionId: '',
    photoUrl: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      itemType: '',
      description: '',
      dateFound: new Date(),
      auctionId: '',
      photoUrl: '',
      notes: ''
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Report Rescued Item</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="itemType">Item Type</Label>
            <Select value={formData.itemType} onValueChange={(v) => setFormData({...formData, itemType: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Select item type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="photo">Photo/Album</SelectItem>
                <SelectItem value="letter">Letter/Card</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
                <SelectItem value="document">Document</SelectItem>
                <SelectItem value="ashes">Ashes/Urn</SelectItem>
                <SelectItem value="heirloom">Heirloom</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the item (e.g., 'Family photo album from 1960s')"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>

          <div>
            <Label htmlFor="auction">Auction Location</Label>
            <Select value={formData.auctionId} onValueChange={(v) => setFormData({...formData, auctionId: v})}>
              <SelectTrigger>
                <SelectValue placeholder="Select auction" />
              </SelectTrigger>
              <SelectContent>
                {auctions.map(auction => (
                  <SelectItem key={auction.id} value={auction.id}>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3 w-3" />
                      {auction.address} - {auction.date}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Date Found</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dateFound && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dateFound ? format(formData.dateFound, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={formData.dateFound}
                  onSelect={(date) => date && setFormData({...formData, dateFound: date})}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label htmlFor="photo">Upload Photo (Optional)</Label>
            <div className="flex gap-2">
              <Input
                id="photo"
                type="file"
                accept="image/*"
                className="flex-1"
                onChange={(e) => {
                  // In a real app, handle file upload here
                  console.log('File selected:', e.target.files?.[0]);
                }}
              />
              <Button type="button" variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Any additional information about the item or contact attempts"
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              Report Rescue
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}