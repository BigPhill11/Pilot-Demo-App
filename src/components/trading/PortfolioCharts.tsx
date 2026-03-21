
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface PortfolioChartsProps {
  cash: number;
  positions: Array<{
    symbol: string;
    shares: number;
    avg_price: number;
    current_value: number;
  }>;
  totalValue: number;
}

const PortfolioCharts: React.FC<PortfolioChartsProps> = ({ cash, positions, totalValue }) => {
  // Asset allocation data (stocks vs cash)
  const stocksValue = positions.reduce((total, position) => total + position.current_value, 0);
  const assetAllocationData = [
    { name: 'Stocks', value: stocksValue, color: '#3b82f6' },
    { name: 'Cash', value: cash, color: '#10b981' }
  ];

  // Individual holdings data
  const holdingsData = positions.map((position, index) => ({
    name: position.symbol,
    value: position.current_value,
    color: `hsl(${(index * 137.5) % 360}, 70%, 50%)`
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const percentage = ((data.value / totalValue) * 100).toFixed(1);
      return (
        <div className="bg-background border rounded-lg p-2 shadow-lg">
          <p className="font-medium">{data.payload.name}</p>
          <p className="text-primary">${data.value.toFixed(2)} ({percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Asset Allocation Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Asset Allocation</CardTitle>
          <CardDescription>Distribution between stocks and cash</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetAllocationData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {assetAllocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Individual Holdings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Individual Holdings</CardTitle>
          <CardDescription>Breakdown of stock positions</CardDescription>
        </CardHeader>
        <CardContent>
          {holdingsData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={holdingsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {holdingsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              <p>No stock positions to display</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioCharts;
