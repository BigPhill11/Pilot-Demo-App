import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target, 
  BarChart3, 
  PieChart, 
  Calendar,
  AlertTriangle,
  Info,
  CheckCircle2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, Pie } from 'recharts';

interface Position {
  id: string;
  symbol: string;
  shares: number;
  avg_price: number;
  current_price: number;
  current_value: number;
  profit_loss: number;
  profit_loss_percent: number;
}

interface EnhancedPortfolioAnalysisProps {
  cash: number;
  positions: Position[];
  totalValue: number;
}

const EnhancedPortfolioAnalysis: React.FC<EnhancedPortfolioAnalysisProps> = ({
  cash,
  positions,
  totalValue
}) => {
  const [timeframe, setTimeframe] = useState('1M');

  // Mock performance data
  const performanceData = [
    { date: '2024-01-01', value: 10000 },
    { date: '2024-01-15', value: 10200 },
    { date: '2024-02-01', value: 9800 },
    { date: '2024-02-15', value: 10500 },
    { date: '2024-03-01', value: 10800 },
    { date: '2024-03-15', value: totalValue },
  ];

  // Calculate portfolio metrics
  const totalStockValue = positions.reduce((sum, pos) => sum + pos.current_value, 0);
  const totalProfitLoss = positions.reduce((sum, pos) => sum + pos.profit_loss, 0);
  const totalProfitLossPercent = totalStockValue > 0 ? (totalProfitLoss / (totalStockValue - totalProfitLoss)) * 100 : 0;
  
  // Asset allocation for pie chart
  const assetAllocation = [
    { name: 'Cash', value: cash, color: '#10b981' },
    ...positions.map((pos, index) => ({
      name: pos.symbol,
      value: pos.current_value,
      color: ['#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'][index % 5]
    }))
  ];

  // Portfolio insights
  const insights = [
    {
      type: 'success',
      title: 'Diversification Score: Good',
      description: 'Your portfolio is well-diversified across different sectors.',
      icon: CheckCircle2
    },
    {
      type: 'warning',
      title: 'High Cash Allocation',
      description: `${((cash / totalValue) * 100).toFixed(1)}% of your portfolio is in cash. Consider investing for better returns.`,
      icon: AlertTriangle
    },
    {
      type: 'info',
      title: 'Performance Tracking',
      description: 'Your portfolio has shown steady growth over the past month.',
      icon: Info
    }
  ];

  const getInsightIcon = (type: string) => {
    const iconClass = type === 'success' ? 'text-green-500' : type === 'warning' ? 'text-yellow-500' : 'text-blue-500';
    const IconComponent = insights.find(i => i.type === type)?.icon || Info;
    return <IconComponent className={`h-5 w-5 ${iconClass}`} />;
  };

  return (
    <div className="space-y-6">
      {/* Performance Chart */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-emerald-600" />
                Portfolio Performance
              </CardTitle>
              <CardDescription>Track your investment growth over time</CardDescription>
            </div>
            <div className="flex gap-2">
              {['1W', '1M', '3M', '6M', '1Y'].map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                  className="text-xs"
                >
                  {period}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Portfolio Value']}
                  labelFormatter={(label) => `Date: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10b981" 
                  strokeWidth={3}
                  dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5 text-blue-600" />
              Asset Allocation
            </CardTitle>
            <CardDescription>How your money is distributed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={assetAllocation}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {assetAllocation.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value}`} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {assetAllocation.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">
                    {((item.value / totalValue) * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-purple-600" />
              Performance Metrics
            </CardTitle>
            <CardDescription>Key portfolio statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Total Return</span>
                <div className="text-right">
                  <div className={`font-bold ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${totalProfitLoss.toFixed(2)}
                  </div>
                  <div className={`text-sm ${totalProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLossPercent.toFixed(2)}%
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Best Performer</span>
                <div className="text-right">
                  {positions.length > 0 && (
                    <>
                      <div className="font-bold text-green-600">
                        {positions.reduce((best, pos) => 
                          pos.profit_loss_percent > best.profit_loss_percent ? pos : best
                        ).symbol}
                      </div>
                      <div className="text-sm text-green-600">
                        +{positions.reduce((best, pos) => 
                          pos.profit_loss_percent > best.profit_loss_percent ? pos : best
                        ).profit_loss_percent.toFixed(2)}%
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Worst Performer</span>
                <div className="text-right">
                  {positions.length > 0 && (
                    <>
                      <div className="font-bold text-red-600">
                        {positions.reduce((worst, pos) => 
                          pos.profit_loss_percent < worst.profit_loss_percent ? pos : worst
                        ).symbol}
                      </div>
                      <div className="text-sm text-red-600">
                        {positions.reduce((worst, pos) => 
                          pos.profit_loss_percent < worst.profit_loss_percent ? pos : worst
                        ).profit_loss_percent.toFixed(2)}%
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-orange-600" />
            Portfolio Insights & Recommendations
          </CardTitle>
          <CardDescription>AI-powered analysis of your investment strategy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                {getInsightIcon(insight.type)}
                <div>
                  <h4 className="font-semibold mb-1">{insight.title}</h4>
                  <p className="text-sm text-muted-foreground">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
            <h4 className="font-semibold text-emerald-800 mb-2">Phil's Recommendation 🐼</h4>
            <p className="text-sm text-emerald-700">
              Consider rebalancing your portfolio by investing some of your cash position. 
              Phil suggests looking at index funds for diversified exposure!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedPortfolioAnalysis;