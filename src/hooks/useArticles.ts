import { useState, useEffect } from 'react';
import { Article } from '../types';
import { articleManager } from '../utils/articleManager';

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const articlesPerPage = 6;

  // S'abonner aux changements d'articles
  useEffect(() => {
    const unsubscribe = articleManager.subscribe(() => {
      const allArticles = articleManager.getArticles();
      setArticles(allArticles);
      setLoading(false);
    });

    // Charger les articles initiaux
    const initialArticles = articleManager.getArticles();
    setArticles(initialArticles);
    setLoading(false);

    return unsubscribe;
  }, []);

  useEffect(() => {
    let filtered = articleManager.searchArticles(searchQuery, categoryFilter);
    setFilteredArticles(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [articles, searchQuery, categoryFilter]);

  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * articlesPerPage,
    currentPage * articlesPerPage
  );

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCategoryFilter = (category: string) => {
    setCategoryFilter(category);
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    articles: paginatedArticles,
    loading,
    currentPage,
    totalPages,
    totalArticles: filteredArticles.length,
    searchQuery,
    categoryFilter,
    handleSearch,
    handleCategoryFilter,
    nextPage,
    prevPage,
    goToPage
  };
};