import Notification, { INotification } from '../models/Notification.model';

export class NotificationRepository {
  async create(data: Partial<INotification>): Promise<INotification> {
    const notification = new Notification(data);
    return notification.save();
  }

  async listForUser(userId: string): Promise<INotification[]> {
    return Notification.find({ user: userId }).sort({ createdAt: -1 });
  }

  async markRead(id: string, userId: string): Promise<INotification | null> {
    return Notification.findOneAndUpdate({ _id: id, user: userId }, { $set: { read: true } }, { new: true });
  }

  async markAllRead(userId: string): Promise<number> {
    const res = await Notification.updateMany({ user: userId, read: false }, { $set: { read: true } });
    return res.modifiedCount ?? 0;
  }
}
