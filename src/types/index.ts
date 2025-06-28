export interface Article {
  id: string;
  titre: string;
  description: string;
  contenu_markdown: string;
  categorie: 'Nutrition' | 'Recette' | 'Santé' | 'Budget';
  date_publication: string;
  auteur: string;
  image_url?: string;
  temps_lecture: number;
  tags?: string[];
}

export interface Comment {
  id: string;
  article_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  date: string;
  repas_type: 'Petit-déjeuner' | 'Déjeuner' | 'Dîner' | 'Collation';
  description: string;
  aliments: string[];
  notes?: string;
}

export interface Newsletter {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
}