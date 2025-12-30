import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuIcon, XIcon, BikeIcon } from './Icons';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-brand-primary text-white'
        : 'text-brand-dark hover:bg-gray-200 hover:text-brand-dark'
    }`;
  
  const mobileNavLinkClasses = ({ isActive }: { isActive: boolean }) =>
  `block px-3 py-2 rounded-md text-base font-medium ${
    isActive
      ? 'bg-brand-primary text-white'
      : 'text-gray-700 hover:bg-gray-200'
  }`;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center gap-2 text-brand-primary">
              <BikeIcon className="h-8 w-8" />
              <span className="font-bold text-xl">Página Ciclismo</span>
            </NavLink>
          </div>
          <div className="hidden md:flex md:flex-1 md:items-center md:justify-between">
            <nav className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/marketplace" className={navLinkClasses}>Marketplace</NavLink>
              <NavLink to="/routes" className={navLinkClasses}>Rutas</NavLink>
              <NavLink to="/tips" className={navLinkClasses}>Consejos</NavLink>
              {isAuthenticated && (
                <NavLink to="/admin" className={navLinkClasses}>Admin</NavLink>
              )}
            </nav>
            <div className="ml-4 flex items-center">
             {isAuthenticated ? (
                <button onClick={logout} className="px-3 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors">
                    Logout
                </button>
             ) : (
                <NavLink to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-brand-primary hover:bg-gray-200 transition-colors">Login</NavLink>
             )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-brand-dark hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-brand-primary"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Inicio</NavLink>
            <NavLink to="/marketplace" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Marketplace</NavLink>
            <NavLink to="/routes" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Rutas</NavLink>
            <NavLink to="/tips" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Consejos</NavLink>
            {isAuthenticated ? (
                <>
                    <NavLink to="/admin" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Admin</NavLink>
                    <button onClick={handleLogout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-200">
                        Logout
                    </button>
                </>
            ) : (
                <NavLink to="/login" className={mobileNavLinkClasses} onClick={() => setIsMenuOpen(false)}>Login</NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
