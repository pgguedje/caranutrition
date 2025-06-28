// Gestionnaire de commentaires avec sauvegarde automatique et comptage dynamique
import { Comment } from '../types';

class CommentManager {
  private comments: Comment[] = [];
  private listeners: (() => void)[] = [];
  private autoCommentInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.loadComments();
    this.startAutoCommentGeneration();
  }

  // Charger les commentaires depuis le localStorage
  private loadComments() {
    try {
      const savedComments = localStorage.getItem('comments');
      if (savedComments) {
        this.comments = JSON.parse(savedComments);
      } else {
        // Données par défaut enrichies pour la démo
        this.comments = [
          {
            id: '1',
            article_id: '1',
            author_name: 'Aminata Diallo',
            content: 'Merci beaucoup pour cet article très instructif ! J\'ai appris beaucoup de choses sur la nutrition africaine. Le moringa est vraiment un super-aliment !',
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            article_id: '1',
            author_name: 'Kofi Asante',
            content: 'Excellente approche ! C\'est exactement ce dont nous avons besoin pour valoriser nos produits locaux. J\'ai commencé à utiliser le moringa dans mes smoothies.',
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            article_id: '2',
            author_name: 'Fatou Mensah',
            content: 'Cette recette de calalou allégé est parfaite ! Ma famille a adoré et c\'est beaucoup plus digeste. Merci pour ces astuces santé !',
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '4',
            article_id: '3',
            author_name: 'Ibrahim Touré',
            content: 'Très utile pour gérer le budget familial. Les conseils sont pratiques et réalistes. J\'ai économisé 30% sur mes courses cette semaine !',
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '5',
            article_id: '4',
            author_name: 'Aïcha Traoré',
            content: 'Parfait pour ma grossesse ! Ces conseils m\'aident beaucoup à bien me nourrir. Le guide sur les aliments locaux est très complet.',
            created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '6',
            article_id: '5',
            author_name: 'Mamadou Keita',
            content: 'J\'ai remplacé les sodas par le bissap maison. Quelle différence ! Ma santé s\'améliore et j\'économise de l\'argent.',
            created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '7',
            article_id: '1',
            author_name: 'Binta Camara',
            content: 'Le moringa pousse dans mon jardin ! Grâce à cet article, je sais maintenant comment bien l\'utiliser. Merci CaraNutrition !',
            created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '8',
            article_id: '2',
            author_name: 'Sekou Diabaté',
            content: 'Ma grand-mère faisait déjà ce calalou ! C\'est formidable de voir nos traditions valorisées avec une approche moderne.',
            created_at: new Date(Date.now() - 45 * 60 * 1000).toISOString()
          }
        ];
        this.saveToStorage();
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
      this.comments = [];
    }
  }

  // Générer automatiquement des commentaires réalistes
  private startAutoCommentGeneration() {
    const commentTemplates = [
      {
        names: ['Mariam Koné', 'Ousmane Diarra', 'Fatoumata Sidibé', 'Abdoulaye Sangaré', 'Kadiatou Touré'],
        templates: [
          'Merci pour ces conseils précieux ! Cela m\'aide beaucoup dans ma cuisine quotidienne.',
          'Excellente information ! Je vais essayer ces astuces dès demain.',
          'Très instructif ! J\'ai partagé avec ma famille.',
          'Parfait ! Exactement ce que je cherchais.',
          'Bravo pour ce contenu de qualité ! Continuez ainsi.',
          'Ces conseils tombent à pic ! Merci beaucoup.',
          'J\'adore cette approche ! Très pratique.',
          'Formidable ! Mes enfants vont adorer.',
          'Génial ! Je recommande à tous mes amis.',
          'Super article ! Très bien expliqué.'
        ]
      }
    ];

    // Ajouter un commentaire automatique toutes les 2-5 minutes
    this.autoCommentInterval = setInterval(() => {
      if (Math.random() < 0.4) { // 40% de chance
        this.generateRandomComment(commentTemplates[0]);
      }
    }, Math.random() * 180000 + 120000); // Entre 2 et 5 minutes
  }

  // Générer un commentaire aléatoire
  private generateRandomComment(template: any) {
    const articleIds = ['1', '2', '3', '4', '5'];
    const randomArticleId = articleIds[Math.floor(Math.random() * articleIds.length)];
    const randomName = template.names[Math.floor(Math.random() * template.names.length)];
    const randomContent = template.templates[Math.floor(Math.random() * template.templates.length)];

    // Vérifier qu'on n'ajoute pas trop de commentaires pour le même article
    const articleComments = this.comments.filter(c => c.article_id === randomArticleId);
    if (articleComments.length < 15) { // Maximum 15 commentaires par article
      const newComment: Comment = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        article_id: randomArticleId,
        author_name: randomName,
        content: randomContent,
        created_at: new Date().toISOString()
      };

      this.comments.unshift(newComment);
      this.saveToStorage();
      this.notifyListeners();
    }
  }

  // Sauvegarder dans le localStorage
  private saveToStorage() {
    try {
      localStorage.setItem('comments', JSON.stringify(this.comments));
      console.log('Commentaires sauvegardés avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des commentaires:', error);
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

  // Obtenir tous les commentaires
  getComments(): Comment[] {
    return [...this.comments];
  }

  // Obtenir les commentaires d'un article avec comptage dynamique
  getCommentsByArticle(articleId: string): Comment[] {
    return this.comments
      .filter(comment => comment.article_id === articleId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  // Obtenir le nombre de commentaires par article (DYNAMIQUE)
  getCommentsCount(articleId: string): number {
    return this.comments.filter(comment => comment.article_id === articleId).length;
  }

  // Obtenir le nombre total de commentaires
  getTotalCommentsCount(): number {
    return this.comments.length;
  }

  // Ajouter un nouveau commentaire
  addComment(comment: Omit<Comment, 'id' | 'created_at'>): Comment {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      created_at: new Date().toISOString()
    };

    this.comments.unshift(newComment);
    this.saveToStorage();
    this.notifyListeners();
    return newComment;
  }

  // Supprimer un commentaire
  deleteComment(id: string): void {
    this.comments = this.comments.filter(comment => comment.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  // Obtenir les statistiques détaillées
  getDetailedStats() {
    const total = this.comments.length;
    const byArticle = this.comments.reduce((acc, comment) => {
      acc[comment.article_id] = (acc[comment.article_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Commentaires par jour (derniers 7 jours)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayComments = this.comments.filter(comment => 
        comment.created_at.split('T')[0] === dateStr
      ).length;
      
      last7Days.push({ date: dateStr, count: dayComments });
    }

    // Commentaires récents (dernières 24h)
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentComments = this.comments.filter(comment => 
      new Date(comment.created_at) > yesterday
    ).length;

    return { 
      total, 
      byArticle, 
      last7Days, 
      recentComments,
      averagePerDay: last7Days.reduce((sum, day) => sum + day.count, 0) / 7
    };
  }

  // Obtenir les commentaires les plus récents
  getRecentComments(limit: number = 5): Comment[] {
    return this.comments
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);
  }

  // Exporter en JSON
  exportToJSON(): string {
    return JSON.stringify({
      comments: this.comments,
      stats: this.getDetailedStats(),
      exportDate: new Date().toISOString()
    }, null, 2);
  }

  // Nettoyer l'intervalle lors de la destruction
  destroy() {
    if (this.autoCommentInterval) {
      clearInterval(this.autoCommentInterval);
    }
  }
}

export const commentManager = new CommentManager();