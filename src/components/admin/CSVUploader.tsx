
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CSVUploaderProps {
  onUpload: (data: any[]) => void;
}

const CSVUploader: React.FC<CSVUploaderProps> = ({ onUpload }) => {
  const [csvData, setCsvData] = useState<any[]>([]);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setError('');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          setError('CSV file must have at least a header row and one data row');
          return;
        }

        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        const data = lines.slice(1).map(line => {
          const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
          const row: any = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || '';
          });
          return row;
        });

        setCsvData(data);
      } catch (err) {
        setError('Failed to parse CSV file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };

  const handleUpload = () => {
    if (csvData.length === 0) {
      setError('Please select a valid CSV file first');
      return;
    }
    onUpload(csvData);
  };

  const csvTemplate = `name,ticker,industry,headquarters,market_cap,revenue_ttm,pe_ratio,overview,market_sentiment,analyst_sentiment,historical_performance,sector,sub_sector,logo_url
Apple Inc.,AAPL,Technology,Cupertino CA,$3.2T,$394.3B,28.9,"Apple Inc. designs and manufactures consumer electronics and software.","Strong market position with loyal customer base","Buy rating from most analysts","Consistent growth over past decade",Technology,Consumer Electronics,https://example.com/apple-logo.png`;

  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'company_template.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>CSV Upload</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="csv-file">Select CSV File</Label>
            <Input
              id="csv-file"
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="mt-1"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {csvData.length > 0 && (
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Successfully parsed {csvData.length} companies from {fileName}
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-between">
            <Button variant="outline" onClick={downloadTemplate}>
              <FileText className="h-4 w-4 mr-2" />
              Download Template
            </Button>
            <Button onClick={handleUpload} disabled={csvData.length === 0}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Companies
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>CSV Format Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p><strong>Required columns:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>name - Company name</li>
              <li>ticker - Stock ticker symbol</li>
              <li>industry - Industry category</li>
              <li>headquarters - Company headquarters location</li>
              <li>market_cap - Market capitalization</li>
              <li>revenue_ttm - Revenue trailing twelve months</li>
              <li>pe_ratio - Price-to-earnings ratio</li>
              <li>overview - Company description</li>
            </ul>
            <p><strong>Optional columns:</strong></p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>market_sentiment, analyst_sentiment, historical_performance</li>
              <li>sector, sub_sector, logo_url</li>
              <li>kpis, financials (as JSON strings)</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CSVUploader;
