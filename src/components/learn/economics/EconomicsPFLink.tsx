/**
 * Economics Personal Finance Link Component
 * 
 * Displays the connection between an economics concept and personal finance.
 * Used within lessons to show real-world applications of economic principles.
 * 
 * Features:
 * - Visual card showing the PF connection
 * - Real-world example
 * - Links to related PF modules (if applicable)
 * - Phil's practical tip
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  Link2, 
  Wallet,
  TrendingUp,
  PiggyBank,
  CreditCard,
  Home,
  ShoppingCart,
} from 'lucide-react';
import PandaLogo from '@/components/icons/PandaLogo';

interface EconomicsPFLinkProps {
  description: string;
  realWorldExample: string;
  relatedModules?: string[];
  philTip?: string;
  variant?: 'default' | 'compact' | 'expanded';
}

const EconomicsPFLink: React.FC<EconomicsPFLinkProps> = ({
  description,
  realWorldExample,
  relatedModules = [],
  philTip,
  variant = 'default',
}) => {
  const [isExpanded, setIsExpanded] = useState(variant === 'expanded');

  const getModuleIcon = (moduleName: string) => {
    const name = moduleName.toLowerCase();
    if (name.includes('budget')) return <Wallet className="h-3 w-3" />;
    if (name.includes('invest')) return <TrendingUp className="h-3 w-3" />;
    if (name.includes('saving') || name.includes('emergency')) return <PiggyBank className="h-3 w-3" />;
    if (name.includes('credit') || name.includes('debt')) return <CreditCard className="h-3 w-3" />;
    if (name.includes('housing') || name.includes('rent')) return <Home className="h-3 w-3" />;
    if (name.includes('shop')) return <ShoppingCart className="h-3 w-3" />;
    return <Link2 className="h-3 w-3" />;
  };

  if (variant === 'compact') {
    return (
      <div className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="h-3.5 w-3.5 text-amber-600" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-amber-800 mb-1">Personal Finance Connection</p>
            <p className="text-xs text-amber-700/80 line-clamp-2">{description}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card className="border-amber-200 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
              <Lightbulb className="h-4 w-4 text-amber-600" />
            </div>
            <div>
              <h3 className="font-semibold text-amber-800 text-sm">Personal Finance Connection</h3>
              <p className="text-xs text-amber-600/70">How this applies to your money</p>
            </div>
          </div>
          {variant === 'default' && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-amber-600 hover:text-amber-700 hover:bg-amber-100"
            >
              {isExpanded ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Main description */}
        <p className="text-sm text-amber-800/90 mb-3">{description}</p>

        {/* Expandable content */}
        {(isExpanded || variant === 'expanded') && (
          <div className="space-y-4 animate-in slide-in-from-top-2 duration-200">
            {/* Real World Example */}
            <div className="bg-white/60 rounded-lg p-3 border border-amber-200/50">
              <div className="flex items-start gap-2">
                <span className="text-lg">🌍</span>
                <div>
                  <p className="text-xs font-medium text-amber-700 mb-1">Real-World Example</p>
                  <p className="text-sm text-amber-800/80">{realWorldExample}</p>
                </div>
              </div>
            </div>

            {/* Related PF Modules */}
            {relatedModules.length > 0 && (
              <div>
                <p className="text-xs font-medium text-amber-700 mb-2 flex items-center gap-1">
                  <Link2 className="h-3 w-3" />
                  Related Personal Finance Modules
                </p>
                <div className="flex flex-wrap gap-2">
                  {relatedModules.map((module, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="bg-white/60 border-amber-300 text-amber-700 text-xs flex items-center gap-1"
                    >
                      {getModuleIcon(module)}
                      {module}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Phil's Practical Tip */}
            {philTip && (
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <div className="flex items-start gap-2">
                  <PandaLogo className="h-6 w-6 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-green-700 mb-1">Phil's Practical Tip</p>
                    <p className="text-sm text-green-800/80 italic">{philTip}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Show more prompt when collapsed */}
        {!isExpanded && variant === 'default' && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs text-amber-600 hover:text-amber-700 flex items-center gap-1 mt-2"
          >
            <span>See real-world example</span>
            <ChevronDown className="h-3 w-3" />
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default EconomicsPFLink;

/**
 * Inline variant for use within lesson content
 */
export const EconomicsPFLinkInline: React.FC<{
  text: string;
  tooltip?: string;
}> = ({ text, tooltip }) => {
  return (
    <span 
      className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-amber-100 text-amber-800 rounded text-sm font-medium cursor-help"
      title={tooltip}
    >
      <Lightbulb className="h-3 w-3" />
      {text}
    </span>
  );
};

/**
 * Summary card showing all PF connections for a unit
 */
export const EconomicsPFSummary: React.FC<{
  connections: Array<{
    lessonTitle: string;
    description: string;
    relatedModules: string[];
  }>;
}> = ({ connections }) => {
  return (
    <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-yellow-50">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <Wallet className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-800">Personal Finance Connections</h3>
            <p className="text-sm text-amber-600/70">How this unit applies to your money</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {connections.map((connection, index) => (
          <div 
            key={index}
            className="bg-white/60 rounded-lg p-3 border border-amber-200/50"
          >
            <p className="text-xs font-medium text-amber-700 mb-1">{connection.lessonTitle}</p>
            <p className="text-sm text-amber-800/80 mb-2">{connection.description}</p>
            {connection.relatedModules.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {connection.relatedModules.map((module, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="bg-amber-50 border-amber-200 text-amber-600 text-xs"
                  >
                    {module}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
