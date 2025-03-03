export type SessionStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Session {
  id: string;
  psychologistId: string;
  psychologistName: string;
  psychologistAvatar: string;
  date: string; // ISO формат дати
  time: string; // Час у форматі "HH:MM"
  duration: number; // Тривалість у хвилинах
  status: SessionStatus;
  notes?: string;
  price: number;
}

export interface SessionCreate {
  psychologist_id: number;
  date: string; // формат "YYYY-MM-DD"
  time: string; // формат "HH:mm"
  duration: number;
  price: number;
} 