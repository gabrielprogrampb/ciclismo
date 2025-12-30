
import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link to={`/article/${article.id}`} className="block group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-xl h-full flex flex-col md:flex-row">
        <div className="md:w-1/3">
           <img src={article.featuredImage} alt={article.title} className="h-48 w-full object-cover md:h-full" />
        </div>
        <div className="p-6 flex flex-col justify-between md:w-2/3">
          <div>
            <div className="uppercase tracking-wide text-sm text-brand-primary font-semibold">{article.category}</div>
            <h3 className="mt-1 text-xl leading-tight font-bold text-brand-dark group-hover:text-brand-primary transition-colors">{article.title}</h3>
            <p className="mt-2 text-gray-600 line-clamp-3">{article.content}</p>
          </div>
          <div className="mt-4 text-sm text-gray-500">
            <span>Por {article.author}</span> &bull; <span>{new Date(article.publishDate).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
