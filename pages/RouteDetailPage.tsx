import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Route } from '../types';
import { useData } from '../contexts/DataContext';

const RouteDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { routes } = useData();
  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    const foundRoute = routes.find(r => r.id === id) || null;
    setRoute(foundRoute);
  }, [id, routes]);

  if (!route) {
    return <div className="text-center py-20">Ruta no encontrada.</div>;
  }

  return (
    <div className="bg-white">
        {/* Header Image */}
        <div className="h-96 bg-gray-800 relative">
            <img src={route.image} alt={route.name} className="w-full h-full object-cover opacity-60"/>
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white p-4">
                    <h1 className="text-4xl md:text-6xl font-extrabold">{route.name}</h1>
                    <p className="text-xl mt-2">{route.location}</p>
                </div>
            </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2">
                    <div className="prose max-w-none text-gray-700">
                        <h2 className="text-2xl font-bold text-brand-dark">Descripción de la Ruta</h2>
                        <p>{route.fullDescription}</p>

                        <h3 className="text-xl font-bold text-brand-dark mt-6">Puntos de Interés</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {route.pointsOfInterest.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Map */}
                    <div className="mt-8">
                        <h2 className="text-2xl font-bold text-brand-dark mb-4">Mapa de la Ruta</h2>
                        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg border">
                            <iframe
                                src={route.mapEmbedUrl}
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                allowFullScreen={false}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>

                {/* Sidebar with stats */}
                <aside className="lg:col-span-1">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-md sticky top-24">
                        <h3 className="text-xl font-bold text-brand-dark mb-4">Estadísticas</h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Distancia</span>
                                <span className="font-bold text-brand-secondary text-lg">{route.distance} km</span>
                            </li>
                            <li className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Elevación</span>
                                <span className="font-bold text-brand-accent text-lg">{route.elevation} m</span>
                            </li>
                             <li className="flex justify-between items-center">
                                <span className="font-semibold text-gray-600">Ubicación</span>
                                <span className="font-bold text-gray-800 text-lg">{route.location}</span>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </div>
    </div>
  );
};

export default RouteDetailPage;
