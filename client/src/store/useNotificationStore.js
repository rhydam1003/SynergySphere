import { create } from "zustand";
import { api } from "../lib/apiClient";
import toast from "react-hot-toast";

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,

  fetchNotifications: async () => {
    set({ loading: true });
    try {
      const response = await api.get("/api/notifications");
      const notifications = response.data;
      const unreadCount = notifications.filter((n) => !n.read).length;
      set({ notifications, unreadCount, loading: false });
      return notifications;
    } catch (error) {
      set({ loading: false });
      console.error("Failed to fetch notifications:", error);
      return [];
    }
  },

  markAsRead: async (notificationId) => {
    // Optimistic update
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n._id === notificationId ? { ...n, read: true } : n
      ),
      unreadCount: Math.max(0, state.unreadCount - 1),
    }));

    try {
      await api.patch(`/api/notifications/${notificationId}/read`);
    } catch (error) {
      // Rollback
      await get().fetchNotifications();
      toast.error("Failed to mark notification as read");
    }
  },

  markAllAsRead: async () => {
    // Optimistic update
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadCount: 0,
    }));

    try {
      await api.patch("/api/notifications/read-all");
      toast.success("All notifications marked as read");
    } catch (error) {
      // Rollback
      await get().fetchNotifications();
      toast.error("Failed to mark all as read");
    }
  },
}));
