import { Session } from './types';

export const mockSessions: Session[] = [
  {
    id: '1',
    psychologistId: 'psych1',
    psychologistName: 'Олена Петренко',
    psychologistAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '2024-06-15',
    time: '14:00',
    duration: 60,
    status: 'upcoming',
    price: 800,
  },
  {
    id: '2',
    psychologistId: 'psych2',
    psychologistName: 'Андрій Ковальчук',
    psychologistAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '2024-06-10',
    time: '10:30',
    duration: 45,
    status: 'completed',
    notes: 'Обговорили питання тривожності та методи релаксації',
    price: 650,
  },
  {
    id: '3',
    psychologistId: 'psych1',
    psychologistName: 'Олена Петренко',
    psychologistAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '2024-06-05',
    time: '16:15',
    duration: 60,
    status: 'cancelled',
    price: 800,
  },
  {
    id: '4',
    psychologistId: 'psych3',
    psychologistName: 'Марія Іваненко',
    psychologistAvatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    date: '2024-06-20',
    time: '11:00',
    duration: 90,
    status: 'upcoming',
    price: 1200,
  },
]; 