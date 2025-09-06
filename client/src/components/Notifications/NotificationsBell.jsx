import { useState, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useNotificationStore } from "../../store/useNotificationStore";
import NotificationsPanel from "./NotificationsPanel";

export default function NotificationsBell({ showBadgeOnly = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const { unreadCount, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  if (showBadgeOnly) {
    return (
      <div className="relative">
        <BellIcon className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <BellIcon className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        )}
      </button>
      <NotificationsPanel open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
