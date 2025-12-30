import React, { useState, useMemo } from 'react';
import { Bike, BikeCategory } from '../types';
import BikeCard from '../components/BikeCard';
import { useData } from '../contexts/DataContext';

const MarketplacePage: React.FC = () => {
  const { bikes } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState<string>('all');
  const [brand, setBrand] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [location, setLocation] = useState('');

  const availableBrands = useMemo(() => [...new Set(bikes.map(b => b.brand))], [bikes]);

  const filteredBikes = useMemo(() => {
    return bikes.filter(bike => {
      const searchMatch = bike.title.toLowerCase().includes(searchTerm.toLowerCase()) || bike.description.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = category === 'all' || bike.category === category;
      const brandMatch = brand === '' || bike.brand === brand;
      const minPriceMatch = minPrice === '' || bike.price >= parseFloat(minPrice);
      const maxPriceMatch = maxPrice === '' || bike.price <= parseFloat(maxPrice);
      const locationMatch = location === '' || bike.location.toLowerCase().includes(location.toLowerCase());

      return searchMatch && categoryMatch && brandMatch && minPriceMatch && maxPriceMatch && locationMatch;
    });
  }, [bikes, searchTerm, category, brand, minPrice, maxPrice, location]);

  const filterInputClass = "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm p-2 bg-white text-gray-900 placeholder-gray-500";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-brand-dark">Marketplace de Bicicletas</h1>
        <p className="mt-2 text-lg text-gray-600">Encuentra la bicicleta perfecta para ti.</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Buscar por palabra clave</label>
          <input
            type="text"
            id="search"
            placeholder="Ej: Specialized, Rockhopper..."
            className={filterInputClass}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
          <select id="category" className={filterInputClass} value={category} onChange={e => setCategory(e.target.value)}>
            <option value="all">Todas</option>
            {Object.values(BikeCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marca</label>
          <select id="brand" className={filterInputClass} value={brand} onChange={e => setBrand(e.target.value)}>
            <option value="">Todas</option>
            {availableBrands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
         <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación</label>
          <input
            type="text"
            id="location"
            placeholder="Ej: Ciudad de México"
            className={filterInputClass}
            value={location}
            onChange={e => setLocation(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
            <div>
              <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">Precio Mín.</label>
              <input type="number" id="minPrice" placeholder="USD" className={filterInputClass} value={minPrice} onChange={e => setMinPrice(e.target.value)} />
            </div>
            <div>
              <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">Precio Máx.</label>
              <input type="number" id="maxPrice" placeholder="USD" className={filterInputClass} value={maxPrice} onChange={e => setMaxPrice(e.target.value)} />
            </div>
        </div>
      </div>

      {/* Bike Listings */}
      {filteredBikes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBikes.map(bike => (
            <BikeCard key={bike.id} bike={bike} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-xl text-gray-600">No se encontraron bicicletas con esos criterios.</p>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;