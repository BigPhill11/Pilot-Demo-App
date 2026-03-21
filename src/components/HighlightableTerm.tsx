
import React from 'react';
import PandaTermTooltip from '@/components/PandaTermTooltip';

interface HighlightableTermProps {
  term: string;
  definition: string;
  analogy?: string;
  children?: React.ReactNode;
}

const HighlightableTerm: React.FC<HighlightableTermProps> = ({ 
  term, 
  definition, 
  analogy = "Think of this concept in simple, everyday terms to make it easier to understand!", 
  children 
}) => {
  return (
    <PandaTermTooltip
      term={term}
      definition={definition}
      analogy={analogy}
    >
      {children}
    </PandaTermTooltip>
  );
};

export default HighlightableTerm;
