import { RescuedItem } from '@/types/rescue';
import { format } from 'date-fns';

export function exportRescuesToCSV(items: RescuedItem[], filename: string = 'rescue-history.csv') {
  // Define CSV headers
  const headers = [
    'Date Found',
    'Date Reported',
    'Item Type',
    'Description',
    'Status',
    'Verification Status',
    'Auction Address',
    'Hold Deadline',
    'Drop-Off Location',
    'Drop-Off Date',
    'Contact Attempts'
  ];

  // Convert items to CSV rows
  const rows = items.map(item => [
    format(item.dateFound, 'yyyy-MM-dd'),
    format(item.dateReported, 'yyyy-MM-dd'),
    item.itemType,
    `"${item.description.replace(/"/g, '""')}"`, // Escape quotes
    item.status,
    item.verificationStatus,
    `"${item.auctionAddress.replace(/"/g, '""')}"`,
    format(item.holdDeadline, 'yyyy-MM-dd'),
    item.dropOffLocation || 'N/A',
    item.dropOffDate ? format(item.dropOffDate, 'yyyy-MM-dd') : 'N/A',
    item.contactAttempts?.length || 0
  ]);

  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
