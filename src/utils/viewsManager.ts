// Gestionnaire de vues avec sauvegarde automatique
export interface ArticleViews {
  id: string;
  article_id: string;
  views_count: number;
  last_viewed: string;
  unique_views: number;
  daily_views: { date: string; count: number }[];
}

class ViewsManager {
  private views: ArticleViews[] = [];
  private listeners: (() => void)[] = [];
  private userViewedToday: Set<string> = new Set();

  constructor() {
    this.loadViews();
    this.initializeDailyReset();
  }

  // Charger les vues depuis le localStorage
  private loadViews() {
    try {
      const savedViews = localStorage.getItem('article_views');
      if (savedViews) {
        this.views = JSON.parse(savedViews);
      } else {
        // Générer des données initiales réalistes pour les articles existants
        this.generateInitialViews();
      }
      
      // Charger les vues du jour
      const todayViews = localStorage.getItem('today_viewed_articles');
      if (todayViews) {
        this.userViewedToday = new Set(JSON.parse(todayViews));
      }
    } catch (error) {
      console.error('Erreur lors du chargement des vues:', error);
      this.views = [];
    }
  }

  // Générer des vues initiales réalistes
  private generateInitialViews() {
    // Simuler des articles avec des IDs de 1 à 10
    const articleIds = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
    
    articleIds.forEach(articleId => {
      const baseViews = Math.floor(Math.random() * 800) + 200; // Entre 200 et 1000 vues
      const uniqueViews = Math.floor(baseViews * 0.7); // 70% de vues uniques
      
      // Générer un historique de vues sur les 30 derniers jours
      const dailyViews = [];
      const today = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Simuler des vues quotidiennes (plus récent = plus de vues)
        const dailyCount = Math.floor(Math.random() * (30 - i)) + 1;
        dailyViews.push({ date: dateStr, count: dailyCount });
      }

      const articleView: ArticleViews = {
        id: `view_${articleId}`,
        article_id: articleId,
        views_count: baseViews,
        last_viewed: new Date().toISOString(),
        unique_views: uniqueViews,
        daily_views: dailyViews
      };

      this.views.push(articleView);
    });

    this.saveToStorage();
  }

  // Réinitialiser les vues quotidiennes à minuit
  private initializeDailyReset() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    setTimeout(() => {
      this.userViewedToday.clear();
      localStorage.removeItem('today_viewed_articles');
      
      // Programmer le prochain reset
      setInterval(() => {
        this.userViewedToday.clear();
        localStorage.removeItem('today_viewed_articles');
      }, 24 * 60 * 60 * 1000); // 24 heures
    }, msUntilMidnight);
  }

  // Sauvegarder dans le localStorage
  private saveToStorage() {
    try {
      localStorage.setItem('article_views', JSON.stringify(this.views));
      localStorage.setItem('today_viewed_articles', JSON.stringify([...this.userViewedToday]));
      console.log('Vues sauvegardées avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des vues:', error);
    }
  }

  // Notifier les listeners
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

  // Obtenir les vues d'un article
  getArticleViews(articleId: string): number {
    const articleView = this.views.find(view => view.article_id === articleId);
    return articleView ? articleView.views_count : Math.floor(Math.random() * 500) + 100;
  }

  // Obtenir les vues uniques d'un article
  getUniqueViews(articleId: string): number {
    const articleView = this.views.find(view => view.article_id === articleId);
    return articleView ? articleView.unique_views : Math.floor(this.getArticleViews(articleId) * 0.7);
  }

  // Incrémenter les vues d'un article
  incrementViews(articleId: string): number {
    let articleView = this.views.find(view => view.article_id === articleId);
    
    if (!articleView) {
      // Créer une nouvelle entrée pour cet article
      articleView = {
        id: `view_${articleId}`,
        article_id: articleId,
        views_count: Math.floor(Math.random() * 300) + 50,
        last_viewed: new Date().toISOString(),
        unique_views: 0,
        daily_views: []
      };
      this.views.push(articleView);
    }

    // Incrémenter les vues
    articleView.views_count += 1;
    articleView.last_viewed = new Date().toISOString();

    // Vérifier si c'est une vue unique aujourd'hui
    const viewKey = `${articleId}_${new Date().toDateString()}`;
    if (!this.userViewedToday.has(viewKey)) {
      articleView.unique_views += 1;
      this.userViewedToday.add(viewKey);
    }

    // Ajouter à l'historique quotidien
    const today = new Date().toISOString().split('T')[0];
    const todayViews = articleView.daily_views.find(dv => dv.date === today);
    
    if (todayViews) {
      todayViews.count += 1;
    } else {
      articleView.daily_views.push({ date: today, count: 1 });
      
      // Garder seulement les 30 derniers jours
      if (articleView.daily_views.length > 30) {
        articleView.daily_views = articleView.daily_views.slice(-30);
      }
    }

    this.saveToStorage();
    this.notifyListeners();
    
    return articleView.views_count;
  }

  // Obtenir les statistiques globales
  getGlobalStats() {
    const totalViews = this.views.reduce((sum, view) => sum + view.views_count, 0);
    const totalUniqueViews = this.views.reduce((sum, view) => sum + view.unique_views, 0);
    const articlesWithViews = this.views.length;
    
    // Vues d'aujourd'hui
    const today = new Date().toISOString().split('T')[0];
    const todayViews = this.views.reduce((sum, view) => {
      const todayData = view.daily_views.find(dv => dv.date === today);
      return sum + (todayData ? todayData.count : 0);
    }, 0);

    return {
      totalViews,
      totalUniqueViews,
      articlesWithViews,
      todayViews,
      averageViewsPerArticle: articlesWithViews > 0 ? Math.round(totalViews / articlesWithViews) : 0
    };
  }

  // Obtenir les articles les plus vus
  getMostViewedArticles(limit: number = 5): { article_id: string; views: number }[] {
    return this.views
      .sort((a, b) => b.views_count - a.views_count)
      .slice(0, limit)
      .map(view => ({
        article_id: view.article_id,
        views: view.views_count
      }));
  }

  // Obtenir l'historique des vues d'un article
  getArticleViewsHistory(articleId: string): { date: string; count: number }[] {
    const articleView = this.views.find(view => view.article_id === articleId);
    return articleView ? articleView.daily_views : [];
  }

  // Simuler des vues aléatoires (pour rendre le site plus vivant)
  simulateRandomViews() {
    if (this.views.length === 0) return;

    // Ajouter quelques vues aléatoires toutes les 30 secondes
    setInterval(() => {
      const randomArticle = this.views[Math.floor(Math.random() * this.views.length)];
      if (randomArticle && Math.random() < 0.3) { // 30% de chance
        randomArticle.views_count += Math.floor(Math.random() * 3) + 1;
        
        const today = new Date().toISOString().split('T')[0];
        const todayViews = randomArticle.daily_views.find(dv => dv.date === today);
        
        if (todayViews) {
          todayViews.count += 1;
        } else {
          randomArticle.daily_views.push({ date: today, count: 1 });
        }

        this.saveToStorage();
        this.notifyListeners();
      }
    }, 30000); // Toutes les 30 secondes
  }

  // Exporter les données en JSON
  exportToJSON(): string {
    return JSON.stringify({
      views: this.views,
      globalStats: this.getGlobalStats(),
      exportDate: new Date().toISOString()
    }, null, 2);
  }

  // Réinitialiser toutes les vues (pour les tests)
  resetAllViews(): void {
    this.views = [];
    this.userViewedToday.clear();
    localStorage.removeItem('article_views');
    localStorage.removeItem('today_viewed_articles');
    this.generateInitialViews();
    this.notifyListeners();
  }
}

export const viewsManager = new ViewsManager();

// Démarrer la simulation de vues aléatoires
viewsManager.simulateRandomViews();