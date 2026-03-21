
import React from 'react';
import HighlightableTerm from '@/components/HighlightableTerm';

interface TermData {
  term: string;
  definition: string;
  analogy: string;
}

interface TermHighlighterProps {
  text: string;
  ibTerms: Record<string, TermData>;
}

const TermHighlighter: React.FC<TermHighlighterProps> = ({ text, ibTerms }) => {
  const renderTextWithTermHighlights = (text: string) => {
    let processedText = text;
    
    // Find all terms that exist in our ibTerms and wrap them with highlights
    Object.keys(ibTerms).forEach(termKey => {
      const term = ibTerms[termKey];
      const termDisplayName = term.term;
      
      // Create regex to find the term (case insensitive, whole word)
      const regex = new RegExp(`\\b${termDisplayName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
      
      processedText = processedText.replace(regex, (match) => {
        return `<TERM_HIGHLIGHT_${termKey}>${match}</TERM_HIGHLIGHT_${termKey}>`;
      });
    });

    // Split the text and render with highlights
    const parts = processedText.split(/(<TERM_HIGHLIGHT_\w+>.*?<\/TERM_HIGHLIGHT_\w+>)/);
    
    return parts.map((part, index) => {
      const termMatch = part.match(/<TERM_HIGHLIGHT_(\w+)>(.*?)<\/TERM_HIGHLIGHT_\w+>/);
      if (termMatch) {
        const termKey = termMatch[1];
        const termText = termMatch[2];
        const termData = ibTerms[termKey];
        
        if (termData) {
          return (
            <HighlightableTerm
              key={index}
              term={termData.term}
              definition={termData.definition}
              analogy={termData.analogy}
            >
              <span className="font-semibold text-primary cursor-help underline decoration-dotted">
                {termText}
              </span>
            </HighlightableTerm>
          );
        }
      }
      return <span key={index}>{part}</span>;
    });
  };

  return <>{renderTextWithTermHighlights(text)}</>;
};

export default TermHighlighter;
