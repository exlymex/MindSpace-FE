export interface Category {
  id: string;
  name: string;
  description?: string;
}

export interface Material {
  id: string;
  title: string;
  content: string;
  type: 'article' | 'exercise';
  imageUrl?: string;
  categories: Category[];
} 