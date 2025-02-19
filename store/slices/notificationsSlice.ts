import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: number;
  isRead: boolean;
}

interface NotificationsState {
  items: Notification[];
}

const initialState: NotificationsState = {
  items: [
    {
      id: '1',
      title: 'Нова консультація',
      message: 'Ваша консультація з психологом запланована на завтра о 15:00',
      type: 'info',
      timestamp: Date.now(),
      isRead: false,
    },
    {
      id: '2',
      title: 'Нова стаття',
      message: 'Доступна нова стаття про управління стресом',
      type: 'success',
      timestamp: Date.now() - 3600000,
      isRead: false,
    },
  ],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp' | 'isRead'>>) => {
      state.items.unshift({
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
        isRead: false,
      });
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.items.find(item => item.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    clearNotifications: (state) => {
      state.items = [];
    },
  },
});

export const { addNotification, markAsRead, clearNotifications } = notificationsSlice.actions;
export const notificationsReducer = notificationsSlice.reducer; 