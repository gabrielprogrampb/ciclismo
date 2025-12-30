
import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from '../types';
import { MapPinIcon } from './Icons';

interface RouteCardProps {
  route: Route;
}

const RouteCard: React.FC<RouteCardProps> = ({ route }) => {
  return (
    <Link to={`/route/${route.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl h-full flex flex-col">
        <div className="relative pb-[62.5%]"> {/* 16:10 Aspect Ratio */}
          <img src={route.image} alt={route.name} className="absolute h-full w-full object-cover" />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{route.name}</h3>
          <div className="mt-2 flex items-center text-gray-500 text-sm">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{route.location}</span>
          </div>
          <p className="mt-2 text-gray-600 text-sm flex-grow">{route.shortDescription}</p>
          <div className="mt-4 flex justify-between items-center text-sm font-semibold">
            <span className="text-brand-secondary">{route.distance} km</span>
            <span className="text-brand-accent">{route.elevation} m elevación</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RouteCard;
