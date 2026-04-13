/**
 * TermHighlight Component
 * 
 * Interactive highlighted term that shows a popup with:
 * - Definition
 * - Personal finance connection
 * - Career relevance
 * 
 * Bridges economics concepts to personal finance and careers.
 */

import React, { useState } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { Wallet, Briefcase, BookOpen } from 'lucide-react';

export interface TermDefinition {
  term: string;
  definition: string;
  personalFinanceLink?: string;
  careerLink?: string;
}

interface TermHighlightProps {
  term: string;
  definition: string;
  personalFinanceLink?: string;
  careerLink?: string;
  children?: React.ReactNode;
}

const TermHighlight: React.FC<TermHighlightProps> = ({
  term,
  definition,
  personalFinanceLink,
  careerLink,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className="inline-flex items-center gap-0.5 text-emerald-700 font-semibold 
                     border-b-2 border-dashed border-emerald-400 hover:border-emerald-600
                     hover:text-emerald-800 transition-colors cursor-help
                     bg-emerald-50/50 px-1 rounded-sm"
          onClick={(e) => e.stopPropagation()}
        >
          {children || term}
          <BookOpen className="h-3 w-3 ml-0.5 opacity-60" />
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 shadow-lg border-emerald-200" 
        side="top"
        align="center"
      >
        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 rounded-t-lg">
          <h4 className="font-bold text-white text-sm">{term}</h4>
        </div>
        
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-700 leading-relaxed">
            {definition}
          </p>
          
          {personalFinanceLink && (
            <div className="bg-purple-50 rounded-lg p-3 border border-purple-100">
              <div className="flex items-center gap-2 mb-1">
                <Wallet className="h-4 w-4 text-purple-600" />
                <span className="text-xs font-semibold text-purple-700">
                  Personal Finance Connection
                </span>
              </div>
              <p className="text-xs text-purple-600 leading-relaxed">
                {personalFinanceLink}
              </p>
            </div>
          )}
          
          {careerLink && (
            <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-100">
              <div className="flex items-center gap-2 mb-1">
                <Briefcase className="h-4 w-4 text-cyan-600" />
                <span className="text-xs font-semibold text-cyan-700">
                  Career Connection
                </span>
              </div>
              <p className="text-xs text-cyan-600 leading-relaxed">
                {careerLink}
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 px-4 py-2 rounded-b-lg border-t border-gray-100">
          <Badge variant="outline" className="text-xs bg-white text-emerald-600 border-emerald-200">
            Tap anywhere to close
          </Badge>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TermHighlight;

export const ECONOMICS_TERMS: Record<string, TermDefinition> = {
  market: {
    term: 'Market',
    definition: 'Any place or system where buyers and sellers come together to exchange goods, services, or resources.',
    personalFinanceLink: 'When you shop around for the best price on a phone or car, you\'re comparing different sellers in the same market. Market-savvy consumers save money!',
    careerLink: 'Market Analysts study these dynamics to help businesses price products and predict trends. Salary: $55K-$95K',
  },
  demand: {
    term: 'Demand',
    definition: 'The quantity of a good or service that buyers are willing and able to purchase at various prices.',
    personalFinanceLink: 'Your personal demand affects your budget. Understanding why you want things helps you distinguish needs from wants and avoid impulse purchases.',
    careerLink: 'Demand Forecasters predict what consumers will buy, helping companies plan inventory. Salary: $60K-$110K',
  },
  supply: {
    term: 'Supply',
    definition: 'The quantity of a good or service that sellers are willing and able to offer at various prices.',
    personalFinanceLink: 'When supply is low (like limited edition sneakers), prices spike. Knowing this helps you time purchases and avoid paying premium prices.',
    careerLink: 'Supply Chain Managers ensure products are available when needed. Salary: $70K-$120K',
  },
  equilibrium: {
    term: 'Equilibrium',
    definition: 'The point where quantity supplied equals quantity demanded, determining the market price.',
    personalFinanceLink: 'Equilibrium prices help you know if something is "fairly priced." If you\'re paying way above equilibrium, you might be overpaying.',
    careerLink: 'Pricing Strategists find the optimal price point that maximizes sales and profit. Salary: $70K-$130K',
  },
  scarcity: {
    term: 'Scarcity',
    definition: 'The fundamental economic problem: unlimited wants but limited resources to satisfy them.',
    personalFinanceLink: 'Your income is scarce compared to everything you could buy. Budgeting is how you manage this personal scarcity.',
    careerLink: 'Economists study how societies allocate scarce resources. Salary: $75K-$150K',
  },
  opportunity_cost: {
    term: 'Opportunity Cost',
    definition: 'The value of the next best alternative you give up when making a choice.',
    personalFinanceLink: 'Every dollar spent on coffee is a dollar not invested. Understanding opportunity cost helps you make better financial trade-offs.',
    careerLink: 'Financial Advisors help clients weigh opportunity costs in investment decisions. Salary: $65K-$120K',
  },
  transaction: {
    term: 'Transaction',
    definition: 'An exchange of goods, services, or money between a buyer and seller.',
    personalFinanceLink: 'Every purchase you make is a transaction. Tracking transactions is the foundation of budgeting and financial awareness.',
    careerLink: 'Transaction Analysts monitor financial flows for banks and payment companies. Salary: $55K-$90K',
  },
  price_signal: {
    term: 'Price Signal',
    definition: 'Information conveyed by prices that helps buyers and sellers make decisions.',
    personalFinanceLink: 'Rising prices signal you to buy less or find alternatives. Falling prices might mean it\'s a good time to buy.',
    careerLink: 'Traders interpret price signals to make investment decisions. Salary: $80K-$200K+',
  },
  buyer: {
    term: 'Buyer',
    definition: 'A person or organization that purchases goods or services.',
    personalFinanceLink: 'As a buyer, you have power! Understanding buyer behavior helps you negotiate better deals and avoid marketing tricks.',
    careerLink: 'Purchasing Managers buy supplies for companies, negotiating with suppliers. Salary: $60K-$100K',
  },
  seller: {
    term: 'Seller',
    definition: 'A person or business that offers goods or services for sale.',
    personalFinanceLink: 'When you sell items online or at a garage sale, you become a seller. Understanding seller motivations helps in negotiations.',
    careerLink: 'Sales Managers lead teams that sell products and services. Salary: $65K-$130K',
  },
};
