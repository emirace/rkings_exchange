// ToastNotificationContext.tsx
import React, {
  createContext,
  useState,
  ReactNode,
  useRef,
  useContext,
} from 'react';

interface Props {
  children: ReactNode;
}
interface INotification {
  id: string;
  message: string;
  action?: () => void;
  buttonText?: string;
}

interface ToastNotificationContextProps {
  addNotification: (
    message: string,
    buttonText?: string,
    action?: () => void
  ) => void;
  removeNotification: (id: string) => void;
  notifications: INotification[];
}

export const ToastNotificationContext = createContext<
  ToastNotificationContextProps | undefined
>(undefined);

export const ToastNotificationProvider: React.FC<Props> = ({ children }) => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const notificationIdCounter = useRef(0);

  const addNotification = (
    message: string,
    buttonText?: string,
    action?: () => void
  ) => {
    const id = notificationIdCounter.current.toString();
    notificationIdCounter.current += 1;

    setNotifications((prevNotifications) => [
      ...prevNotifications,
      { id, message, action, buttonText },
    ]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <ToastNotificationContext.Provider
      value={{ addNotification, removeNotification, notifications }}
    >
      {children}
    </ToastNotificationContext.Provider>
  );
};

const useToastNotification = () => {
  const context = useContext(ToastNotificationContext);
  if (!context) {
    throw new Error(
      'useToastNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

export default useToastNotification;
