import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Bike, User } from '../types';
import { mockUsers } from '../data/mockData';
import { MapPinIcon, DollarSignIcon } from '../components/Icons';
import { useData } from '../contexts/DataContext';

const ContactModal: React.FC<{ user: User; onClose: () => void }> = ({ user, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
      <h2 className="text-2xl font-bold mb-4">Contactar al Vendedor</h2>
      <p className="mb-2"><strong className="font-semibold">Nombre:</strong> {user.name}</p>
      <p className="mb-2"><strong className="font-semibold">Email:</strong> <a href={`mailto:${user.email}`} className="text-brand-primary hover:underline">{user.email}</a></p>
      <p className="mb-4"><strong className="font-semibold">Teléfono:</strong> <a href={`tel:${user.phone}`} className="text-brand-primary hover:underline">{user.phone}</a></p>
      <button onClick={onClose} className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded transition-colors">
        Cerrar
      </button>
    </div>
  </div>
);


const BikeDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { bikes } = useData();
  const [bike, setBike] = useState<Bike | null>(null);
  const [seller, setSeller] = useState<User | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const foundBike = bikes.find(b => b.id === id) || null;
    setBike(foundBike);
    if (foundBike) {
      const foundSeller = mockUsers.find(u => u.id === foundBike.sellerId) || null;
      setSeller(foundSeller);
      setMainImage(foundBike.images[0]);
    }
  }, [id, bikes]);

  if (!bike || !seller) {
    return <div className="text-center py-20">Bicicleta no encontrada.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Gallery */}
          <div>
            <div className="bg-gray-200">
                <img src={mainImage} alt={bike.title} className="w-full h-96 object-cover"/>
            </div>
            <div className="flex p-2 bg-gray-100 overflow-x-auto">
              {bike.images.map((img, index) => (
                <button key={index} onClick={() => setMainImage(img)} className={`flex-shrink-0 w-24 h-24 mx-1 rounded-md overflow-hidden border-2 ${mainImage === img ? 'border-brand-primary' : 'border-transparent'}`}>
                  <img src={img} alt={`${bike.title} ${index + 1}`} className="w-full h-full object-cover"/>
                </button>
              ))}
            </div>
          </div>

          {/* Bike Info */}
          <div className="p-6 flex flex-col">
            <h1 className="text-3xl font-bold text-brand-dark">{bike.title}</h1>
            <p className="text-sm text-gray-500 mt-1">Publicado el {new Date(bike.postedDate).toLocaleDateString()}</p>
            
            <div className="mt-4 flex items-center text-gray-700">
                <DollarSignIcon className="h-6 w-6 mr-2 text-brand-accent"/>
                <span className="text-3xl font-bold text-brand-secondary">${bike.price.toLocaleString()}</span>
            </div>

            <div className="mt-4 flex items-center text-gray-600">
                <MapPinIcon className="h-5 w-5 mr-2"/>
                <span>{bike.location}</span>
            </div>

            <div className="mt-6 border-t pt-4">
              <h2 className="text-xl font-semibold mb-2">Detalles</h2>
              <ul className="space-y-2 text-gray-700">
                <li><strong className="font-semibold w-28 inline-block">Marca:</strong> {bike.brand}</li>
                <li><strong className="font-semibold w-28 inline-block">Modelo:</strong> {bike.model}</li>
                <li><strong className="font-semibold w-28 inline-block">Categoría:</strong> {bike.category}</li>
                <li><strong className="font-semibold w-28 inline-block">Talla:</strong> {bike.frameSize}</li>
                <li><strong className="font-semibold w-28 inline-block">Condición:</strong> <span className="px-2 py-1 text-sm font-semibold rounded-full bg-blue-100 text-brand-primary">{bike.condition}</span></li>
              </ul>
            </div>
            
            <div className="mt-auto pt-6">
                <button onClick={() => setShowModal(true)} className="w-full bg-brand-primary hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg">
                    Contactar al Vendedor
                </button>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="p-6 border-t">
          <h2 className="text-xl font-semibold mb-2">Descripción</h2>
          <p className="text-gray-700 whitespace-pre-wrap">{bike.description}</p>
        </div>
      </div>
      {showModal && seller && <ContactModal user={seller} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BikeDetailPage;
