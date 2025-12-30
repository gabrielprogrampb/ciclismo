import React, { useState, useEffect, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { Article } from '../types';
import { useData } from '../contexts/DataContext';

const parseAndFormatContent = (content: string): ReactNode[] => {
    const parseBold = (text: string): ReactNode[] => {
        const parts = text.split(/(\*\*.*?\*\*)/g).filter(Boolean);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={index}>{part.slice(2, -2)}</strong>;
            }
            return part;
        });
    };

    return content.split('\n').map((paragraph, index) => (
        <p key={index} className="mb-4 last:mb-0">{parseBold(paragraph)}</p>
    ));
};

const ArticleDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles } = useData();
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    const foundArticle = articles.find(a => a.id === id) || null;
    setArticle(foundArticle);
  }, [id, articles]);

  if (!article) {
    return <div className="text-center py-20">Artículo no encontrado.</div>;
  }

  return (
    <div className="bg-brand-light py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <figure>
            <img className="w-full h-64 sm:h-96 object-cover" src={article.featuredImage} alt={article.title} />
          </figure>

          <div className="p-6 sm:p-10">
            <header className="mb-8 text-center">
              <p className="text-base text-brand-primary font-semibold tracking-wider uppercase">{article.category}</p>
              <h1 className="mt-2 block text-3xl leading-8 font-extrabold tracking-tight text-brand-dark sm:text-4xl">{article.title}</h1>
              <div className="mt-4 text-sm text-gray-500">
                <span>Por {article.author}</span> &bull; <span>Publicado el {new Date(article.publishDate).toLocaleDateString()}</span>
              </div>
            </header>
            
            <div className="prose prose-lg max-w-none text-gray-800 mx-auto">
              {parseAndFormatContent(article.content)}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ArticleDetailPage;
