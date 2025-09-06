import { NotificationRepository } from '../repositories/notification.repository';

export class NotificationService {
  constructor(private repo: NotificationRepository) {}

  list(userId: string) {
    return this.repo.listForUser(userId);
  }

  markRead(id: string, userId: string) {
    return this.repo.markRead(id, userId);
  }

  markAllRead(userId: string) {
    return this.repo.markAllRead(userId);
  }
}
