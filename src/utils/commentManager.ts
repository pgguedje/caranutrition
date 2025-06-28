// Gestionnaire de commentaires avec sauvegarde automatique
import { Comment } from '../types';

class CommentManager {
  private comments: Comment[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadComments();
  }

  // Charger les commentaires depuis le localStorage
  private loadComments() {
    try {
      const savedComments = localStorage.getItem('comments');
      if (savedComments) {
        this.comments = JSON.parse(savedComments);
      } else {
        // Données par défaut pour la démo
        this.comments = [
          {
            id: '1',
            article_id: '1',
            author_name: 'Aminata Diallo',
            content: 'Merci beaucoup pour cet article très instructif ! J\'ai appris beaucoup de choses sur la nutrition africaine.',
            created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '2',
            article_id: '1',
            author_name: 'Kofi Asante',
            content: 'Excellente approche ! C\'est exactement ce dont nous avons besoin pour valoriser nos produits locaux.',
            created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '3',
            article_id: '2',
            author_name: 'Fatou Mensah',
            content: 'Cette recette de calalou allégé est parfaite ! Ma famille a adoré et c\'est beaucoup plus digeste.',
            created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
          },
          {
            id: '4',
            article_id: '3',
            author_name: 'Ibrahim Touré',
            content: 'Très utile pour gérer le budget familial. Les conseils sont pratiques et réalistes.',
            created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
          }
        ];
        this.saveToStorage();
      }
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
      this.comments = [];
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

  // Obtenir les commentaires d'un article
  getCommentsByArticle(articleId: string): Comment[] {
    return this.comments
      .filter(comment => comment.article_id === articleId)
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }

  // Ajouter un nouveau commentaire
  addComment(comment: Omit<Comment, 'id' | 'created_at'>): Comment {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
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

  // Obtenir les statistiques
  getStats() {
    const total = this.comments.length;
    const byArticle = this.comments.reduce((acc, comment) => {
      acc[comment.article_id] = (acc[comment.article_id] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { total, byArticle };
  }

  // Exporter en JSON
  exportToJSON(): string {
    return JSON.stringify(this.comments, null, 2);
  }
}

export const commentManager = new CommentManager();