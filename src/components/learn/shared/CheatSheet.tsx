import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner';

interface CheatSheetProps {
  title: string;
  items: string[];
}

export const CheatSheet = ({ title, items }: CheatSheetProps) => {
  const handleDownload = () => {
    // Create a simple text version
    const content = `${title}\n${'='.repeat(title.length)}\n\n${items.map((item, i) => `${i + 1}. ${item}`).join('\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}-cheatsheet.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Cheat sheet downloaded!');
  };

  return (
    <Card className="p-5 bg-gradient-to-br from-green-500/5 to-teal-500/5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <h4 className="font-semibold">{title}</h4>
        </div>
        <Button size="sm" variant="outline" onClick={handleDownload}>
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
      </div>

      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2 text-sm">
            <span className="text-primary font-medium flex-shrink-0">{index + 1}.</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
};
