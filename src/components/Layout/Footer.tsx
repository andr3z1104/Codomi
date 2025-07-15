
import React from 'react';
import {SiFacebook, SiX, SiInstagram} from 'react-icons/si';

const Footer: React.FC = () => {
  return (
    <footer className="bg-codomi-gray border-t border-gray-200 text-codomi-navy py-6 mt-auto w-full">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end">
          <h2 className="text-lg font-bold mb-2 text-codomi-navy">CODOMI</h2>
          <div className="text-sm text-right space-y-1 text-gray-600">
            <p>Teléfono: +56 9 1234 5678</p>
            <p>Oficina: Av. Principal 123, Santiago</p>
          </div>
          <div className="flex space-x-4 mt-2">
            <a href="#" aria-label="Facebook" className="text-gray-500 hover:text-codomi-navy transition-colors">
              <SiFacebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="text-gray-500 hover:text-codomi-navy transition-colors">
              <SiX className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="text-gray-500 hover:text-codomi-navy transition-colors">
              <SiInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
