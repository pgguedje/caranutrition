// Gestionnaire de newsletter avec sauvegarde automatique
export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
  source?: string; // d'où vient l'inscription
}

class NewsletterManager {
  private subscribers: NewsletterSubscriber[] = [];
  private listeners: (() => void)[] = [];

  constructor() {
    this.loadSubscribers();
  }

  // Charger les abonnés depuis le localStorage
  private loadSubscribers() {
    try {
      const savedSubscribers = localStorage.getItem('newsletter_subscribers');
      if (savedSubscribers) {
        this.subscribers = JSON.parse(savedSubscribers);
      } else {
        // Données par défaut pour la démo
        this.subscribers = [
          {
            id: '1',
            email: 'aminata.diallo@email.com',
            subscribed_at: '2024-01-15T10:30:00Z',
            is_active: true,
            source: 'modal'
          },
          {
            id: '2',
            email: 'kofi.asante@email.com',
            subscribed_at: '2024-01-14T15:45:00Z',
            is_active: true,
            source: 'footer'
          },
          {
            id: '3',
            email: 'fatou.bello@email.com',
            subscribed_at: '2024-01-13T09:20:00Z',
            is_active: false,
            source: 'modal'
          },
          {
            id: '4',
            email: 'koudjo.amavi@email.com',
            subscribed_at: '2024-01-12T14:10:00Z',
            is_active: true,
            source: 'admin'
          },
          {
            id: '5',
            email: 'maman.christelle@email.com',
            subscribed_at: '2024-01-11T11:55:00Z',
            is_active: true,
            source: 'modal'
          }
        ];
        this.saveToStorage();
      }
    } catch (error) {
      console.error('Erreur lors du chargement des abonnés:', error);
      this.subscribers = [];
    }
  }

  // Sauvegarder dans le localStorage
  private saveToStorage() {
    try {
      localStorage.setItem('newsletter_subscribers', JSON.stringify(this.subscribers));
      console.log('Abonnés newsletter sauvegardés avec succès');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde newsletter:', error);
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

  // Obtenir tous les abonnés
  getSubscribers(): NewsletterSubscriber[] {
    return [...this.subscribers];
  }

  // Ajouter un nouvel abonné
  addSubscriber(email: string, source: string = 'unknown'): boolean {
    // Vérifier si l'email existe déjà
    const existingSubscriber = this.subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
    
    if (existingSubscriber) {
      // Réactiver si inactif
      if (!existingSubscriber.is_active) {
        existingSubscriber.is_active = true;
        existingSubscriber.subscribed_at = new Date().toISOString();
        this.saveToStorage();
        this.notifyListeners();
        return true;
      }
      return false; // Déjà abonné et actif
    }

    const newSubscriber: NewsletterSubscriber = {
      id: Date.now().toString(),
      email: email.toLowerCase(),
      subscribed_at: new Date().toISOString(),
      is_active: true,
      source
    };

    this.subscribers.unshift(newSubscriber);
    this.saveToStorage();
    this.notifyListeners();
    return true;
  }

  // Désactiver un abonné
  unsubscribe(email: string): boolean {
    const subscriber = this.subscribers.find(sub => sub.email.toLowerCase() === email.toLowerCase());
    if (subscriber) {
      subscriber.is_active = false;
      this.saveToStorage();
      this.notifyListeners();
      return true;
    }
    return false;
  }

  // Supprimer définitivement un abonné
  deleteSubscriber(id: string): void {
    this.subscribers = this.subscribers.filter(sub => sub.id !== id);
    this.saveToStorage();
    this.notifyListeners();
  }

  // Obtenir les statistiques
  getStats() {
    const total = this.subscribers.length;
    const active = this.subscribers.filter(sub => sub.is_active).length;
    const inactive = total - active;
    
    return { total, active, inactive };
  }

  // Exporter les données en CSV
  exportToCSV(): string {
    const headers = ['Email', 'Date d\'inscription', 'Statut', 'Source'];
    const rows = this.subscribers.map(sub => [
      sub.email,
      new Date(sub.subscribed_at).toLocaleDateString('fr-FR'),
      sub.is_active ? 'Actif' : 'Inactif',
      sub.source || 'Inconnu'
    ]);

    const csvContent = [headers, ...rows]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n');

    return csvContent;
  }

  // Exporter en JSON
  exportToJSON(): string {
    return JSON.stringify(this.subscribers, null, 2);
  }
}

export const newsletterManager = new NewsletterManager();