export interface Material {
  id: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  category: 'anxiety' | 'depression' | 'stress' | 'relationships' | 'self-development';
  readingTime: number; // в хвилинах
  createdAt: string;
} 