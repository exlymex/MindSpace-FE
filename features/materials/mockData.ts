import { Material } from './types';

export const mockMaterials: Material[] = [
  {
    id: '1',
    title: 'Як впоратися з тривогою: практичні поради',
    description: 'Ефективні методи та техніки для подолання тривожності у повсякденному житті',
    content: `
      Тривога - це природна реакція організму на стрес, але іноді вона може перешкоджати нормальному життю...
      [Довгий текст з порадами]
    `,
    imageUrl: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'anxiety',
    readingTime: 5,
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'Медитація для початківців',
    description: 'Базові техніки медитації для зменшення стресу та покращення самопочуття',
    content: 'Детальний опис технік медитації...',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'stress',
    readingTime: 7,
    createdAt: '2024-03-14',
  },
  {
    id: '3',
    title: 'Покращення відносин у парі',
    description: 'Ключові аспекти здорових відносин та комунікації з партнером',
    content: 'Поради щодо побудови міцних стосунків...',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'relationships',
    readingTime: 6,
    createdAt: '2024-03-13',
  },
  {
    id: '4',
    title: 'Боротьба з депресією',
    description: 'Методи самодопомоги при депресивних станах',
    content: 'Практичні поради та техніки...',
    imageUrl: 'https://images.unsplash.com/photo-1493836512294-502baa1986e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'depression',
    readingTime: 8,
    createdAt: '2024-03-12',
  },
  {
    id: '5',
    title: 'Розвиток емоційного інтелекту',
    description: 'Як краще розуміти свої та чужі емоції',
    content: 'Глибокий аналіз емоційного інтелекту...',
    imageUrl: 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    category: 'self-development',
    readingTime: 10,
    createdAt: '2024-03-11',
  },
]; 