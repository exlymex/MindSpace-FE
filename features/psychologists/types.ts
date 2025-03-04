// Базовий інтерфейс психолога, який відповідає даним з бекенду
export interface Psychologist {
  id: number;
  email: string;
  role: 'psychologist';
  first_name: string;
  last_name: string;
  bio?: string | null;
  avatar_url?: string | null;
  birth_date: string;
  phone_number: string;
  education: string;
  specialization: string;
  license_number: string;
  experience_years: number;
  is_active: boolean;
  created_at: string;
}

// Розширений інтерфейс для відображення на фронтенді
export interface PsychologistWithDetails extends Psychologist {
  avatar?: string; // Аліас для avatar_url
  experience?: string; // Форматований досвід (наприклад, "5 років")
  rating?: number; // Рейтинг психолога (якщо є)
  fullName?: string; // Повне ім'я (first_name + last_name)
}

// Інтерфейс для спрощеного представлення психолога в списку
export interface PsychologistListItem {
  id: string;
  avatar: string | null;
  fullName: string;
  specialization: string;
  experience: string;
  rating: number;
}

// Інтерфейс для фільтрації психологів
export interface PsychologistFilters {
  specialization?: string;
  minExperience?: number;
  maxExperience?: number;
  rating?: number;
  searchQuery?: string;
} 