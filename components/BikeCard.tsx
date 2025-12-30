
import React from 'react';
import { Link } from 'react-router-dom';
import { Bike } from '../types';
import { MapPinIcon, DollarSignIcon, TagIcon } from './Icons';

interface BikeCardProps {
  bike: Bike;
}

const BikeCard: React.FC<BikeCardProps> = ({ bike }) => {
  return (
    <Link to={`/bike/${bike.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl h-full flex flex-col">
        <div className="relative pb-[75%]"> {/* 4:3 Aspect Ratio */}
            <img src={bike.images[0]} alt={bike.title} className="absolute h-full w-full object-cover" />
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-primary transition-colors truncate">{bike.title}</h3>
          <div className="mt-2 flex items-center text-gray-600">
            <DollarSignIcon className="h-4 w-4 mr-1 text-brand-accent" />
            <span className="text-xl font-semibold text-brand-secondary">${bike.price.toLocaleString()}</span>
          </div>
          <div className="mt-2 flex items-center text-gray-500 text-sm">
            <MapPinIcon className="h-4 w-4 mr-1" />
            <span>{bike.location}</span>
          </div>
           <div className="mt-2 flex items-center text-gray-500 text-sm">
            <TagIcon className="h-4 w-4 mr-1" />
            <span>{bike.category}</span>
          </div>
          <div className="mt-auto pt-4">
             <span className="inline-block bg-blue-100 text-brand-primary text-xs font-semibold px-2.5 py-0.5 rounded-full">
                {bike.condition}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BikeCard;
