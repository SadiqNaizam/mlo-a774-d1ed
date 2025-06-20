import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AuthHeader: React.FC = () => {
  console.log('AuthHeader loaded');

  return (
    <header className="py-4 px-4 sm:px-6 lg:px-8 bg-background border-b">
      <div className="container mx-auto flex items-center justify-center sm:justify-start">
        <Link to="/" className="flex items-center gap-2 text-xl font-semibold text-primary hover:text-primary/90 transition-colors">
          <ShieldCheck className="h-7 w-7" />
          <span>AuthApp</span>
        </Link>
        {/* Minimalistic header, no extensive navigation */}
      </div>
    </header>
  );
};

export default AuthHeader;