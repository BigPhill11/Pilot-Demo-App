import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Zap, DollarSign, Stethoscope, Building2, Cpu } from 'lucide-react';
import { sectorSubdivisions } from '@/data/sector-subdivisions';
import { SectorSubdivision } from '@/types/investor-profile';

interface SectorSubdivisionSelectorProps {
  onSelection: (subdivision: SectorSubdivision) => void;
}

const sectorIcons = {
  technology: Cpu,
  healthcare: Stethoscope,
  finance: DollarSign,
};

const SectorSubdivisionSelector: React.FC<SectorSubdivisionSelectorProps> = ({ onSelection }) => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const handleSectorClick = (sector: string) => {
    setSelectedSector(selectedSector === sector ? null : sector);
  };

  const handleSubdivisionSelect = (subdivision: SectorSubdivision) => {
    onSelection(subdivision);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-foreground">Choose Your Investment Focus</h2>
        <p className="text-muted-foreground">Select a sector to explore specialized sub-industries</p>
      </div>

      {/* Sector Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.keys(sectorSubdivisions).map((sector) => {
          const Icon = sectorIcons[sector] || Building2;
          const isSelected = selectedSector === sector;
          
          return (
            <Card 
              key={sector}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                isSelected ? 'ring-2 ring-primary border-primary' : ''
              }`}
              onClick={() => handleSectorClick(sector)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center space-x-2">
                  <Icon className="h-6 w-6 text-primary" />
                  <CardTitle className="capitalize">{sector}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {sectorSubdivisions[sector].length} specialized areas to explore
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Subdivision Selection */}
      {selectedSector && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="text-lg font-semibold capitalize">{selectedSector} Subdivisions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectorSubdivisions[selectedSector].map((subdivision) => (
              <Card key={subdivision.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{subdivision.name}</CardTitle>
                  <CardDescription>{subdivision.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm font-medium mb-2">Key Metrics:</p>
                    <div className="flex flex-wrap gap-1">
                      {subdivision.keyMetrics.map((metric) => (
                        <Badge key={metric} variant="secondary" className="text-xs">
                          {metric}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button 
                      onClick={() => handleSubdivisionSelect(subdivision)}
                      className="w-full"
                      size="sm"
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Explore {subdivision.companies.length} Companies
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectorSubdivisionSelector;
