import Activity, { IActivity } from '../models/Activity.model';

export class ActivityRepository {
  async create(data: Partial<IActivity>): Promise<IActivity> {
    const activity = new Activity(data);
    return activity.save();
  }

  async listByProject(projectId: string): Promise<IActivity[]> {
    return Activity.find({ project: projectId }).sort({ createdAt: -1 });
  }
}
