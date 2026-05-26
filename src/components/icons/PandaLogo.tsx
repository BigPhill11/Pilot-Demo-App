import React from 'react';

const PandaLogo = ({ className }: { className?: string }) => {
  return (
    <img
      src="/logo.png"
      alt="Phil's Financials Logo"
      className={className}
    />
  );
};

export default PandaLogo;
