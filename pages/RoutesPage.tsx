import React, { useState, useMemo } from 'react';
import RouteCard from '../components/RouteCard';
import { useData } from '../contexts/DataContext';

const RoutesPage: React.FC = () => {
  const { routes } = useData();
  const [distanceFilter, setDistanceFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const availableLocations = useMemo(() => [...new Set(routes.map(r => r.location))], [routes]);

  const filteredRoutes = useMemo(() => {
    return routes.filter(route => {
      const locationMatch = locationFilter === 'all' || route.location === locationFilter;
      const distanceMatch = 
        distanceFilter === 'all' ||
        (distanceFilter === '0-20' && route.distance <= 20) ||
        (distanceFilter === '21-50' && route.distance > 20 && route.distance <= 50) ||
        (distanceFilter === '50+' && route.distance > 50);
      
      return locationMatch && distanceMatch;
    });
  }, [routes, distanceFilter, locationFilter]);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-brand-dark">Directorio de Rutas</h1>
        <p className="mt-2 text-lg text-gray-600">Descubre tu próximo recorrido favorito.</p>
      </div>

      {/* Filters */}
      <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <h3 className="text-xl font-semibold text-brand-dark mb-4">Filtrar Rutas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Ubicación</label>
                  <select id="location" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm p-2 bg-white" value={locationFilter} onChange={e => setLocationFilter(e.target.value)}>
                      <option value="all">Todas</option>
                      {availableLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                  </select>
              </div>
              <div>
                  <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Distancia (km)</label>
                  <select id="distance" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary sm:text-sm p-2 bg-white" value={distanceFilter} onChange={e => setDistanceFilter(e.target.value)}>
                      <option value="all">Todas</option>
                      <option value="0-20">0 - 20 km</option>
                      <option value="21-50">21 - 50 km</option>
                      <option value="50+">50+ km</option>
                  </select>
              </div>
          </div>
      </div>
      
      {/* Route Listings */}
      {filteredRoutes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRoutes.map(route => (
            <RouteCard key={route.id} route={route} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
            <p className="text-xl text-gray-600">No se encontraron rutas con esos criterios.</p>
        </div>
      )}
    </div>
  );
};

export default RoutesPage;
