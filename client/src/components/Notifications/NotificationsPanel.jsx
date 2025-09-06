import { useEffect } from "react";
import { useNotificationStore } from "../../store/useNotificationStore";

export default function NotificationsPanel({ open, onClose }) {
  const { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore();

  useEffect(() => {
    if (open) fetchNotifications();
  }, [open]);

  if (!open) return null;

  return (
    <div className="absolute right-4 top-12 w-96 bg-white rounded-xl shadow-xl border p-3 z-50">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-semibold text-gray-900">Notifications</h4>
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700"
        >Close</button>
      </div>

      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600">Unread: {unreadCount}</span>
        <button
          onClick={markAllAsRead}
          className="text-sm text-primary-600 hover:text-primary-700"
        >Mark all as read</button>
      </div>

      <div className="max-h-80 overflow-y-auto space-y-2">
        {(!notifications || notifications.length === 0) && (
          <p className="text-sm text-gray-600">No notifications yet.</p>
        )}
        {notifications?.map((n) => (
          <div
            key={n._id}
            className={`border rounded-lg p-3 ${n.read ? 'bg-white' : 'bg-primary-50 border-primary-100'}`}
          >
            <p className="text-sm text-gray-800">{n.message || n.title || 'Notification'}</p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">{new Date(n.createdAt).toLocaleString()}</span>
              {!n.read && (
                <button
                  onClick={() => markAsRead(n._id)}
                  className="text-xs text-primary-600 hover:text-primary-700"
                >Mark read</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


