// =============================================================================
// App.tsx - Componente Principal de Página Ciclismo
// =============================================================================
// Descripción: Plataforma para ciclistas con marketplace de bicicletas, rutas
// recomendadas, artículos y tips. Incluye panel de administración.
// 
// Rutas:
// - /             : Página de inicio
// - /marketplace  : Tienda de bicicletas
// - /bike/:id     : Detalle de bicicleta
// - /routes       : Rutas para ciclismo
// - /route/:id    : Detalle de ruta
// - /tips         : Artículos y consejos
// - /article/:id  : Detalle de artículo
// - /login        : Iniciar sesión
// - /admin        : Panel de administración (protegido)
// =============================================================================

import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import BikeDetailPage from './pages/BikeDetailPage';
import RoutesPage from './pages/RoutesPage';
import RouteDetailPage from './pages/RouteDetailPage';
import TipsPage from './pages/TipsPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { DataProvider } from './contexts/DataContext';

/**
 * Componente principal de la aplicación
 * Configura providers y sistema de rutas
 */
const App: React.FC = () => {
  return (
    <HashRouter>
      {/* AuthProvider: Maneja autenticación de usuarios */}
      <AuthProvider>
        {/* DataProvider: Proporciona datos de bicicletas, rutas y artículos */}
        <DataProvider>
          <div className="flex flex-col min-h-screen bg-brand-light">
            {/* Header con navegación */}
            <Header />

            <main className="flex-grow">
              <Routes>
                {/* ============================================ */}
                {/* RUTAS PÚBLICAS */}
                {/* ============================================ */}
                <Route path="/" element={<HomePage />} />               {/* Inicio */}
                <Route path="/marketplace" element={<MarketplacePage />} /> {/* Tienda */}
                <Route path="/bike/:id" element={<BikeDetailPage />} /> {/* Detalle bici */}
                <Route path="/routes" element={<RoutesPage />} />       {/* Rutas */}
                <Route path="/route/:id" element={<RouteDetailPage />} /> {/* Detalle ruta */}
                <Route path="/tips" element={<TipsPage />} />           {/* Artículos */}
                <Route path="/article/:id" element={<ArticleDetailPage />} /> {/* Detalle */}
                <Route path="/login" element={<LoginPage />} />         {/* Login */}

                {/* ============================================ */}
                {/* RUTA PROTEGIDA - Solo administradores */}
                {/* ============================================ */}
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </DataProvider>
      </AuthProvider>
    </HashRouter>
  );
};

export default App;