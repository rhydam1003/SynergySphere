import Task, { ITask } from '../models/Task.model';

export class TaskRepository {
  async create(data: Partial<ITask>): Promise<ITask> {
    const task = new Task(data);
    return task.save();
  }

  async listByProject(projectId: string, filter: Partial<Pick<ITask, 'status' | 'assignee'>> = {}): Promise<ITask[]> {
    const query: any = { project: projectId };
    if (filter.status) query.status = filter.status;
    if (filter.assignee) query.assignee = filter.assignee;
    return Task.find(query).sort({ createdAt: -1 });
  }

  async findById(id: string): Promise<ITask | null> {
    return Task.findById(id);
  }

  async update(id: string, data: Partial<ITask>): Promise<ITask | null> {
    return Task.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Task.deleteOne({ _id: id });
    return result.deletedCount !== undefined && result.deletedCount > 0;
  }
}
