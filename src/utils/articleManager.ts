// Gestionnaire d'articles avec sauvegarde automatique
import { Article } from '../types';

class ArticleManager {
  private articles: Article[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadArticles();
  }

  // Charger les articles depuis le localStorage ou les données par défaut
  private loadArticles() {
    try {
      const savedArticles = localStorage.getItem('articles');
      if (savedArticles) {
        this.articles = JSON.parse(savedArticles);
      } else {
        // Charger les données par défaut
        import('../data/articles.json').then((data) => {
          this.articles = data.default as Article[];
          this.saveToStorage();
          this.notifyListeners();
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement des articles:', error);
      this.articles = [];
    }
  }

  // Sauvegarder dans le localStorage (simulation du fichier JSON)
  private saveToStorage() {
    try {
      localStorage.setItem('articles', JSON.stringify(this.articles));
      console.log('Articles sauvegardés avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
    }
  }

  // Notifier tous les composants qui écoutent les changements
  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }

  // S'abonner aux changements
  subscribe(listener: () => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Obtenir tous les articles
  getArticles(): Article[] {
    return [...this.articles];
  }

  // Obtenir un article par ID
  getArticleById(id: string): Article | undefined {
    return this.articles.find(article => article.id === id);
  }

  // Ajouter un nouvel article
  addArticle(article: Article): void {
    this.articles.unshift(article); // Ajouter au début
    this.saveToStorage();
    this.notifyListeners();
  }

  // Mettre à jour un article existant
  updateArticle(updatedArticle: Article): void {
    const index = this.articles.findIndex(article => article.id === updatedArticle.id);
    if (index !== -1) {
      this.articles[index] = updatedArticle;
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  // Supprimer un article
  deleteArticle(id: string): void {
    this.articles = this.articles.filter(article => article.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  // Rechercher des articles
  searchArticles(query: string, category?: string): Article[] {
    let filtered = [...this.articles];

    if (query.trim()) {
      filtered = filtered.filter(article =>
        article.titre.toLowerCase().includes(query.toLowerCase()) ||
        article.description.toLowerCase().includes(query.toLowerCase()) ||
        article.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (category) {
      filtered = filtered.filter(article => article.categorie === category);
    }

    return filtered;
  }
}

// Instance singleton
export const articleManager = new ArticleManager();