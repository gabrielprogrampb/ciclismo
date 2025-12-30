
import React from 'react';
import { BikeIcon } from './Icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white mt-16">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-2 mb-4">
            <BikeIcon className="h-8 w-8 text-brand-accent"/>
            <span className="text-xl font-bold">Página Ciclismo</span>
        </div>
        <div className="flex justify-center space-x-6">
          <a href="#" className="text-gray-400 hover:text-white">Sobre Nosotros</a>
          <a href="#" className="text-gray-400 hover:text-white">Contacto</a>
          <a href="#" className="text-gray-400 hover:text-white">Términos de Servicio</a>
        </div>
        <p className="mt-8 text-center text-gray-400">&copy; {new Date().getFullYear()} Página Ciclismo. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
