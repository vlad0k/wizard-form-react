import { store } from 'react-notifications-component';

type CreateNotificationParamsType = {
  message: string;
  type?: 'warning' | 'success' | 'danger' | 'info' | 'default';
  durationInMS?: number;
  title?: string;
};

export const createNotification = ({
  title,
  message,
  type = 'warning',
  durationInMS = 3000,
}: CreateNotificationParamsType) =>
  store.addNotification({
    title,
    message,
    type,
    insert: 'top',
    container: 'bottom-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: durationInMS,
    },
  });
