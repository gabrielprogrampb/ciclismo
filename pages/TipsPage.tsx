import React from 'react';
import ArticleCard from '../components/ArticleCard';
import { useData } from '../contexts/DataContext';

const TipsPage: React.FC = () => {
  const { articles } = useData();
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-brand-dark">Consejos para Ciclistas</h1>
        <p className="mt-2 text-lg text-gray-600">Mejora tu experiencia sobre dos ruedas con nuestros artículos.</p>
      </div>

      <div className="space-y-8">
        {articles.map(article => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default TipsPage;
