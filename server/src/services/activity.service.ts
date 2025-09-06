import { Types } from 'mongoose';
import { ActivityRepository } from '../repositories/activity.repository';

export class ActivityService {
  constructor(private repo: ActivityRepository) {}

  record(projectId: string, type: string, actorId: string, entityRef?: string, meta?: Record<string, any>) {
    return this.repo.create({
      project: new Types.ObjectId(projectId),
      type,
      actor: new Types.ObjectId(actorId),
      entityRef: entityRef ? new Types.ObjectId(entityRef) : undefined,
      meta,
    } as any);
  }

  list(projectId: string) {
    return this.repo.listByProject(projectId);
  }
}
