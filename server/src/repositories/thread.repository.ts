import Thread, { IThread } from '../models/Thread.model';

export class ThreadRepository {
  async create(data: Partial<IThread>): Promise<IThread> {
    const thread = new Thread(data);
    return thread.save();
  }

  async listByProject(projectId: string): Promise<IThread[]> {
    return Thread.find({ project: projectId }).sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<IThread | null> {
    return Thread.findById(id);
  }
}
