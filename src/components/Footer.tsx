
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-muted text-muted-foreground py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} Phil's Financials. All rights reserved.</p>
        <p className="text-sm mt-1">Your journey to financial literacy starts here!</p>
      </div>
    </footer>
  );
};

export default Footer;

