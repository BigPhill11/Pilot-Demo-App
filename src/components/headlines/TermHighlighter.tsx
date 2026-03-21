
import React from 'react';
import PandaTermTooltip from '@/components/PandaTermTooltip';
import { financialTerms } from '@/data/financial-terms';

interface TermHighlighterProps {
  text: string;
  userLevel: string;
}

const getTermsForLevel = (level: string) => {
  switch (level) {
    case 'beginner': return { ...financialTerms.beginner };
    case 'intermediate': return { ...financialTerms.beginner, ...financialTerms.intermediate };
    case 'advanced': return { ...financialTerms.intermediate, ...financialTerms.advanced };
    default: return financialTerms.beginner;
  }
};

const TermHighlighter: React.FC<TermHighlighterProps> = ({ text, userLevel }) => {
  const terms = getTermsForLevel(userLevel);
  let highlightedText = text;
  
  Object.keys(terms).forEach(term => {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    const termData = terms[term];
    
    highlightedText = highlightedText.replace(regex, (match) => {
      return `<TERM_${term.toUpperCase()}_START>${match}<TERM_${term.toUpperCase()}_END>`;
    });
  });

  return (
    <>
      {highlightedText.split(/(<TERM_\w+_START>.*?<TERM_\w+_END>)/).map((part, index) => {
        const termMatch = part.match(/<TERM_(\w+)_START>(.*?)<TERM_\w+_END>/);
        if (termMatch) {
          const termKey = termMatch[1].toLowerCase();
          const termText = termMatch[2];
          const termData = terms[termKey];
          
          if (termData) {
            return (
              <PandaTermTooltip
                key={index}
                term={termText}
                definition={termData.definition}
                analogy={termData.analogy}
              />
            );
          }
        }
        return <span key={index}>{part}</span>;
      })}
    </>
  );
};

export default TermHighlighter;
