import React from 'react';
import {SiFacebook, SiX, SiInstagram} from 'react-icons/si';


const Footer: React.FC = () => {
  return (
    <footer className="bg-[#001a33] text-white py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-end">
          <h2 className="text-lg font-bold mb-2">CODOMI</h2>
          <div className="text-sm text-right space-y-1">
            <p>Teléfono: +56 9 1234 5678</p>
            <p>Oficina: Av. Principal 123, Santiago</p>
          </div>
          <div className="flex space-x-4 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-codomi-navy-light">
              <SiFacebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-codomi-navy-light">
              <SiX className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-codomi-navy-light">
              <SiInstagram className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;