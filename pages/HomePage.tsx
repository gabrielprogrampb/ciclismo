import React from 'react';
import { Link } from 'react-router-dom';
import BikeCard from '../components/BikeCard';
import { useData } from '../contexts/DataContext';

const HomePage: React.FC = () => {
  const { bikes } = useData();
  const recentBikes = bikes.slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="relative bg-brand-dark text-white">
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/hero/1600/900" alt="Cyclist on a scenic route" className="w-full h-full object-cover opacity-40"/>
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">Tu Aventura Ciclista Comienza Aquí</h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-300">
            Encuentra tu próxima bicicleta, descubre rutas increíbles y aprende con nuestros consejos.
          </p>
          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <Link to="/marketplace" className="inline-block bg-brand-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
              Explorar Marketplace
            </Link>
            <Link to="/routes" className="inline-block bg-brand-accent hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
              Descubrir Rutas
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Bikes Section */}
      <div className="bg-brand-light py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-brand-dark mb-8">Bicicletas Recién Añadidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBikes.map(bike => (
              <BikeCard key={bike.id} bike={bike} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/marketplace" className="text-brand-primary hover:underline font-semibold">
              Ver todas las bicicletas &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
