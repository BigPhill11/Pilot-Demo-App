
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X, Plus, Trash2 } from 'lucide-react';
import { Company } from './CompanyManager';

interface CompanyFormProps {
  company?: Company | null;
  onSubmit: (data: Partial<Company>) => void;
  onCancel: () => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({ company, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    ticker: '',
    logo_url: '',
    industry: '',
    headquarters: '',
    market_cap: '',
    revenue_ttm: '',
    pe_ratio: '',
    overview: '',
    kpis: [{ title: '', value: '' }],
    financials: [{ title: '', value: '' }],
    market_sentiment: '',
    analyst_sentiment: '',
    historical_performance: '',
    sector: '',
    sub_sector: ''
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || '',
        ticker: company.ticker || '',
        logo_url: company.logo_url || '',
        industry: company.industry || '',
        headquarters: company.headquarters || '',
        market_cap: company.market_cap || '',
        revenue_ttm: company.revenue_ttm || '',
        pe_ratio: company.pe_ratio || '',
        overview: company.overview || '',
        kpis: company.kpis?.length > 0 ? company.kpis : [{ title: '', value: '' }],
        financials: company.financials?.length > 0 ? company.financials : [{ title: '', value: '' }],
        market_sentiment: company.market_sentiment || '',
        analyst_sentiment: company.analyst_sentiment || '',
        historical_performance: company.historical_performance || '',
        sector: company.sector || '',
        sub_sector: company.sub_sector || ''
      });
    }
  }, [company]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (type: 'kpis' | 'financials', index: number, field: 'title' | 'value', value: string) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addArrayItem = (type: 'kpis' | 'financials') => {
    setFormData(prev => ({
      ...prev,
      [type]: [...prev[type], { title: '', value: '' }]
    }));
  };

  const removeArrayItem = (type: 'kpis' | 'financials', index: number) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>{company ? 'Edit Company' : 'Add New Company'}</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Company Name *</Label>
                <Input
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="ticker">Ticker *</Label>
                <Input
                  id="ticker"
                  required
                  value={formData.ticker}
                  onChange={(e) => handleInputChange('ticker', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Input
                  id="industry"
                  required
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="headquarters">Headquarters *</Label>
                <Input
                  id="headquarters"
                  required
                  value={formData.headquarters}
                  onChange={(e) => handleInputChange('headquarters', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="market_cap">Market Cap *</Label>
                <Input
                  id="market_cap"
                  required
                  value={formData.market_cap}
                  onChange={(e) => handleInputChange('market_cap', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="revenue_ttm">Revenue TTM *</Label>
                <Input
                  id="revenue_ttm"
                  required
                  value={formData.revenue_ttm}
                  onChange={(e) => handleInputChange('revenue_ttm', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="pe_ratio">P/E Ratio *</Label>
                <Input
                  id="pe_ratio"
                  required
                  value={formData.pe_ratio}
                  onChange={(e) => handleInputChange('pe_ratio', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="logo_url">Logo URL</Label>
                <Input
                  id="logo_url"
                  type="url"
                  value={formData.logo_url}
                  onChange={(e) => handleInputChange('logo_url', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="sector">Sector</Label>
                <Input
                  id="sector"
                  value={formData.sector}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="sub_sector">Sub Sector</Label>
                <Input
                  id="sub_sector"
                  value={formData.sub_sector}
                  onChange={(e) => handleInputChange('sub_sector', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="overview">Overview *</Label>
              <Textarea
                id="overview"
                required
                rows={4}
                value={formData.overview}
                onChange={(e) => handleInputChange('overview', e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="market_sentiment">Market Sentiment</Label>
                <Textarea
                  id="market_sentiment"
                  rows={3}
                  value={formData.market_sentiment}
                  onChange={(e) => handleInputChange('market_sentiment', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="analyst_sentiment">Analyst Sentiment</Label>
                <Textarea
                  id="analyst_sentiment"
                  rows={3}
                  value={formData.analyst_sentiment}
                  onChange={(e) => handleInputChange('analyst_sentiment', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="historical_performance">Historical Performance</Label>
                <Textarea
                  id="historical_performance"
                  rows={3}
                  value={formData.historical_performance}
                  onChange={(e) => handleInputChange('historical_performance', e.target.value)}
                />
              </div>
            </div>

            {/* KPIs Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Key Performance Indicators</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('kpis')}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add KPI
                </Button>
              </div>
              {formData.kpis.map((kpi, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    placeholder="KPI Title"
                    value={kpi.title}
                    onChange={(e) => handleArrayChange('kpis', index, 'title', e.target.value)}
                  />
                  <Input
                    placeholder="KPI Value"
                    value={kpi.value}
                    onChange={(e) => handleArrayChange('kpis', index, 'value', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('kpis', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Financials Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Financial Metrics</Label>
                <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('financials')}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Financial
                </Button>
              </div>
              {formData.financials.map((financial, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    placeholder="Financial Title"
                    value={financial.title}
                    onChange={(e) => handleArrayChange('financials', index, 'title', e.target.value)}
                  />
                  <Input
                    placeholder="Financial Value"
                    value={financial.value}
                    onChange={(e) => handleArrayChange('financials', index, 'value', e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('financials', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">
                {company ? 'Update Company' : 'Add Company'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyForm;
