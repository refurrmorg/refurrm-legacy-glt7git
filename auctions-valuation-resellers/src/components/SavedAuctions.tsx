import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Bookmark, Calendar, MapPin, AlertTriangle, Trash2, Edit, Filter, X } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface SavedAuction {
  id: string;
  title: string;
  location: string;
  auction_date: string;
  image_url: string;
  analysis_result: any;
  overall_risk: 'low' | 'medium' | 'high';
  notes: string;
  is_bookmarked: boolean;
  reminder_date: string;
  created_at: string;
}

interface SavedAuctionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SavedAuctions: React.FC<SavedAuctionsProps> = ({ isOpen, onClose }) => {
  const [auctions, setAuctions] = useState<SavedAuction[]>([]);
  const [filteredAuctions, setFilteredAuctions] = useState<SavedAuction[]>([]);
  const [loading, setLoading] = useState(true);
  const [riskFilter, setRiskFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'risk' | 'created'>('date');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [noteText, setNoteText] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadAuctions();
    }
  }, [isOpen]);

  useEffect(() => {
    filterAndSort();
  }, [auctions, riskFilter, sortBy]);

  const loadAuctions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('saved_auctions')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAuctions(data);
    }
    setLoading(false);
  };

  const filterAndSort = () => {
    let filtered = [...auctions];

    if (riskFilter !== 'all') {
      filtered = filtered.filter(a => a.overall_risk === riskFilter);
    }

    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(a.auction_date).getTime() - new Date(b.auction_date).getTime();
      } else if (sortBy === 'risk') {
        const riskOrder = { high: 3, medium: 2, low: 1 };
        return riskOrder[b.overall_risk] - riskOrder[a.overall_risk];
      } else {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });

    setFilteredAuctions(filtered);
  };

  const deleteAuction = async (id: string) => {
    await supabase.from('saved_auctions').delete().eq('id', id);
    loadAuctions();
  };

  const updateNote = async (id: string) => {
    await supabase.from('saved_auctions').update({ notes: noteText }).eq('id', id);
    setEditingNote(null);
    loadAuctions();
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-amber-100 text-amber-800 border-amber-300';
      default: return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bookmark className="w-6 h-6 text-purple-600" />
            <span>Saved Auctions ({filteredAuctions.length})</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-3 items-center bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Filter:</span>
              <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="px-3 py-1 border rounded-lg text-sm">
                <option value="all">All Risk Levels</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Sort:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-3 py-1 border rounded-lg text-sm">
                <option value="date">Auction Date</option>
                <option value="risk">Risk Level</option>
                <option value="created">Recently Added</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : filteredAuctions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">No saved auctions yet</div>
          ) : (
            <div className="grid gap-4">
              {filteredAuctions.map((auction) => (
                <div key={auction.id} className="border rounded-lg p-4 bg-white hover:shadow-md transition">
                  <div className="flex gap-4">
                    {auction.image_url && (
                      <img src={auction.image_url} alt={auction.title} className="w-32 h-32 object-cover rounded-lg flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{auction.title}</h3>
                          <div className="flex flex-wrap gap-2 mt-1 text-sm text-gray-600">
                            {auction.location && (
                              <span className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {auction.location}
                              </span>
                            )}
                            {auction.auction_date && (
                              <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {new Date(auction.auction_date).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getRiskColor(auction.overall_risk)}`}>
                            {auction.overall_risk.toUpperCase()}
                          </span>
                          <Button variant="ghost" size="sm" onClick={() => deleteAuction(auction.id)}>
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </Button>
                        </div>
                      </div>

                      {auction.analysis_result?.summary && (
                        <p className="text-sm text-gray-700 mb-2">{auction.analysis_result.summary}</p>
                      )}

                      {editingNote === auction.id ? (
                        <div className="mt-2">
                          <textarea value={noteText} onChange={(e) => setNoteText(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm" rows={2} placeholder="Add notes..." />
                          <div className="flex gap-2 mt-2">
                            <Button size="sm" onClick={() => updateNote(auction.id)}>Save</Button>
                            <Button size="sm" variant="outline" onClick={() => setEditingNote(null)}>Cancel</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-2">
                          {auction.notes ? (
                            <p className="text-sm text-gray-600 italic bg-gray-50 p-2 rounded">{auction.notes}</p>
                          ) : (
                            <p className="text-sm text-gray-400">No notes</p>
                          )}
                          <Button size="sm" variant="ghost" onClick={() => { setEditingNote(auction.id); setNoteText(auction.notes || ''); }} className="mt-1">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit Note
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
