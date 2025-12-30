import React, { createContext, useState, useContext } from 'react';
import { Bike, Route, Article } from '../types';
import { mockBikes, mockRoutes, mockArticles, mockUsers } from '../data/mockData';

interface DataContextType {
  bikes: Bike[];
  routes: Route[];
  articles: Article[];
  addBike: (bike: Omit<Bike, 'id' | 'postedDate' | 'sellerId'>) => void;
  updateBike: (updatedBike: Bike) => void;
  deleteBike: (id: string) => void;
  addRoute: (route: Omit<Route, 'id'>) => void;
  updateRoute: (updatedRoute: Route) => void;
  deleteRoute: (id: string) => void;
  addArticle: (article: Omit<Article, 'id' | 'publishDate'>) => void;
  updateArticle: (updatedArticle: Article) => void;
  deleteArticle: (id: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bikes, setBikes] = useState<Bike[]>(mockBikes);
  const [routes, setRoutes] = useState<Route[]>(mockRoutes);
  const [articles, setArticles] = useState<Article[]>(mockArticles);

  // --- Bike Actions ---
  const addBike = (bike: Omit<Bike, 'id' | 'postedDate' | 'sellerId'>) => {
    const newBike: Bike = {
      ...bike,
      id: `bike-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      sellerId: mockUsers[0].id, // Assign a default seller for now
    };
    setBikes(prev => [newBike, ...prev]);
  };

  const updateBike = (updatedBike: Bike) => {
    setBikes(prev => prev.map(b => (b.id === updatedBike.id ? updatedBike : b)));
  };

  const deleteBike = (id: string) => {
    setBikes(prev => prev.filter(b => b.id !== id));
  };
  
  // --- Route Actions ---
  const addRoute = (route: Omit<Route, 'id'>) => {
      const newRoute: Route = {
          ...route,
          id: `route-${Date.now()}`,
      };
      setRoutes(prev => [newRoute, ...prev]);
  };
  
  const updateRoute = (updatedRoute: Route) => {
      setRoutes(prev => prev.map(r => (r.id === updatedRoute.id ? updatedRoute : r)));
  };
  
  const deleteRoute = (id: string) => {
      setRoutes(prev => prev.filter(r => r.id !== id));
  };
  
  // --- Article Actions ---
  const addArticle = (article: Omit<Article, 'id' | 'publishDate'>) => {
      const newArticle: Article = {
          ...article,
          id: `article-${Date.now()}`,
          publishDate: new Date().toISOString().split('T')[0],
      };
      setArticles(prev => [newArticle, ...prev]);
  };
  
  const updateArticle = (updatedArticle: Article) => {
      setArticles(prev => prev.map(a => (a.id === updatedArticle.id ? updatedArticle : a)));
  };

  const deleteArticle = (id: string) => {
      setArticles(prev => prev.filter(a => a.id !== id));
  };

  return (
    <DataContext.Provider value={{ 
        bikes, routes, articles,
        addBike, updateBike, deleteBike,
        addRoute, updateRoute, deleteRoute,
        addArticle, updateArticle, deleteArticle
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData debe usarse dentro de un DataProvider');
  }
  return context;
};
