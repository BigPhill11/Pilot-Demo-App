
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

interface EconomicEvent {
  date: string;
  title: string;
  description: string;
  importance: 'high' | 'medium' | 'low';
}

const economicEvents: EconomicEvent[] = [
  {
    date: '2025-06-20',
    title: 'FOMC Meeting',
    description: 'Federal Open Market Committee interest rate decision',
    importance: 'high'
  },
  {
    date: '2025-06-25',
    title: 'GDP Report',
    description: 'Quarterly economic growth data',
    importance: 'high'
  },
  {
    date: '2025-07-02',
    title: 'Jobs Report',
    description: 'Monthly employment statistics release',
    importance: 'high'
  },
  {
    date: '2025-07-10',
    title: 'CPI Release',
    description: 'Consumer Price Index data for inflation tracking',
    importance: 'high'
  },
  {
    date: '2025-07-15',
    title: 'Retail Sales',
    description: 'Consumer spending data release',
    importance: 'medium'
  },
  {
    date: '2025-07-30',
    title: 'FOMC Meeting',
    description: 'Federal Open Market Committee interest rate decision',
    importance: 'high'
  },
  {
    date: '2025-08-02',
    title: 'Jobs Report',
    description: 'Monthly employment statistics release',
    importance: 'high'
  },
  {
    date: '2025-08-14',
    title: 'CPI Release',
    description: 'Consumer Price Index data for inflation tracking',
    importance: 'high'
  }
];

const EconomicCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return economicEvents.filter(event => event.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-1 h-20"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const events = getEventsForDate(day);
      const isToday = today.getDate() === day && 
                     today.getMonth() === currentMonth && 
                     today.getFullYear() === currentYear;

      days.push(
        <div
          key={day}
          className={`
            p-1 h-20 border transition-colors cursor-pointer overflow-hidden
            ${events.length > 0 ? 'bg-green-50 border-green-300 hover:bg-green-100' : 'hover:bg-gray-50 border-gray-200'}
            ${isToday ? 'ring-2 ring-blue-500' : ''}
          `}
        >
          <div className={`text-sm font-medium ${events.length > 0 ? 'text-green-700' : 'text-gray-700'}`}>
            {day}
          </div>
          {events.map((event, index) => (
            <div key={index} className="mt-1">
              <div className={`text-xs p-1 rounded truncate ${
                event.importance === 'high' ? 'bg-red-100 text-red-700' :
                event.importance === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`} title={`${event.title}: ${event.description}`}>
                {event.title}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Economic Calendar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Calendar Header */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => navigateMonth('prev')}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h3 className="text-lg font-semibold">
              {monthNames[currentMonth]} {currentYear}
            </h3>
            <Button variant="ghost" size="sm" onClick={() => navigateMonth('next')}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-600">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
              <span>Economic Event</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-100 text-red-700 rounded text-xs flex items-center justify-center font-bold">H</div>
              <span>High Impact</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-100 text-yellow-700 rounded text-xs flex items-center justify-center font-bold">M</div>
              <span>Medium Impact</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EconomicCalendar;
