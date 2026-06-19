import { ApiError } from '../../utils/apiError';
import { CONSTANTS } from '../../utils/constants';

let notifications: any[] = [
  { id: "n1", userId: "mock_student_id", title: "Application Viewed", message: "Sweet Delights Bakery has viewed your application.", type: CONSTANTS.NOTIFICATION_TYPES.PROFILE_VIEW, time: "2 hours ago", read: false },
  { id: "n2", userId: "mock_student_id", title: "New Message", message: "You have a new message from TechNova Inc.", type: CONSTANTS.NOTIFICATION_TYPES.NEW_MESSAGE, time: "5 hours ago", read: false },
  { id: "n3", userId: "mock_student_id", title: "Application Accepted", message: "Congratulations! TechNova Inc. accepted your proposal.", type: CONSTANTS.NOTIFICATION_TYPES.APPLICATION_ACCEPTED, time: "1 day ago", read: true },
];

export const notificationsService = {
  getUserNotifications: async (userId: string) => {
    return notifications.filter(n => n.userId === userId);
  },

  markAsRead: async (notificationId: string, userId: string) => {
    const notification = notifications.find(n => n.id === notificationId && n.userId === userId);
    if (!notification) {
      throw new ApiError(404, 'Notification not found');
    }
    notification.read = true;
    return notification;
  },

  markAllAsRead: async (userId: string) => {
    notifications.forEach(n => {
      if (n.userId === userId) {
        n.read = true;
      }
    });
    return { success: true };
  }
};
