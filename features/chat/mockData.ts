export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'psychologist';
  timestamp: number;
}

const now = Date.now();
const minute = 60 * 1000;

export const mockMessages: Message[] = [
  {
    id: '1',
    text: 'Доброго дня! Я ваш особистий психолог. Як я можу вам допомогти сьогодні?',
    sender: 'psychologist',
    timestamp: now - 30 * minute, // 30 хвилин тому
  },
  {
    id: '2',
    text: 'Привіт! Останнім часом відчуваю тривогу та проблеми зі сном.',
    sender: 'user',
    timestamp: now - 28 * minute,
  },
  {
    id: '3',
    text: 'Розумію ваші почуття. Давайте поговоримо про це детальніше. Коли ви вперше помітили ці симптоми?',
    sender: 'psychologist',
    timestamp: now - 27 * minute,
  },
  {
    id: '4',
    text: 'Приблизно місяць тому. Спочатку це було не так помітно, але зараз стає все складніше.',
    sender: 'user',
    timestamp: now - 25 * minute,
  },
  {
    id: '5',
    text: 'Дякую за відвертість. Чи були якісь конкретні події або зміни у вашому житті за цей період?',
    sender: 'psychologist',
    timestamp: now - 24 * minute,
  },
  {
    id: '6',
    text: 'Так, я змінив роботу і переїхав до нового міста.',
    sender: 'user',
    timestamp: now - 22 * minute,
  },
  {
    id: '7',
    text: 'Це дійсно серйозні життєві зміни, які можуть викликати стрес та тривогу. Давайте разом розробимо стратегію, яка допоможе вам краще адаптуватися до нових умов.',
    sender: 'psychologist',
    timestamp: now - 20 * minute,
  },
  {
    id: '8',
    text: 'Це було б дуже корисно. З чого ми можемо почати?',
    sender: 'user',
    timestamp: now - 18 * minute,
  },
  {
    id: '9',
    text: 'Пропоную почати з простих технік релаксації та створення комфортного режиму дня. Це допоможе покращити якість сну та знизити рівень тривоги.',
    sender: 'psychologist',
    timestamp: now - 16 * minute,
  },
]; 