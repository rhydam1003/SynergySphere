import { Types } from 'mongoose';
import { TaskRepository } from '../repositories/task.repository';
import { ProjectRepository } from '../repositories/project.repository';
import { NotFoundError, AuthorizationError } from '../utils/errors';

interface CreateTaskDto {
  title: string;
  description?: string;
  assignee?: string;
  status?: 'todo' | 'in_progress' | 'done';
  dueDate?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface UpdateTaskDto extends Partial<CreateTaskDto> {}

export class TaskService {
  constructor(
    private taskRepo: TaskRepository,
    private projectRepo: ProjectRepository
  ) {}

  private async ensureMembership(projectId: string, userId: string) {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
    const isMember = project.owner.equals(userId) || project.members.some(m => m.user.equals(userId));
    if (!isMember) throw new AuthorizationError('Not a project member');
  }

  async createTask(projectId: string, userId: string, dto: CreateTaskDto) {
    await this.ensureMembership(projectId, userId);
    return this.taskRepo.create({
      project: new Types.ObjectId(projectId),
      title: dto.title,
      description: dto.description,
      assignee: dto.assignee ? new Types.ObjectId(dto.assignee) : undefined,
      status: dto.status ?? 'todo',
      dueDate: dto.dueDate ? new Date(dto.dueDate) : undefined,
      priority: dto.priority ?? 'medium',
      createdBy: new Types.ObjectId(userId),
    } as any);
  }

  async listTasks(projectId: string, userId: string, filter: { status?: string; assignee?: string }) {
    await this.ensureMembership(projectId, userId);
    return this.taskRepo.listByProject(projectId, {
      status: filter.status as any,
      assignee: filter.assignee as any,
    });
  }

  async getTask(taskId: string, userId: string) {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new NotFoundError('Task not found');
    await this.ensureMembership((task.project as any).toString(), userId);
    return task;
  }

  async updateTask(taskId: string, userId: string, dto: UpdateTaskDto) {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new NotFoundError('Task not found');
    await this.ensureMembership((task.project as any).toString(), userId);
    const update: any = { ...dto };
    if (dto.assignee === null) update.assignee = null;
    if (dto.assignee) update.assignee = new Types.ObjectId(dto.assignee);
    if (dto.dueDate === null) update.dueDate = null;
    if (dto.dueDate) update.dueDate = new Date(dto.dueDate);
    return this.taskRepo.update(taskId, update);
  }

  async deleteTask(taskId: string, userId: string) {
    const task = await this.taskRepo.findById(taskId);
    if (!task) throw new NotFoundError('Task not found');
    await this.ensureMembership((task.project as any).toString(), userId);
    return this.taskRepo.delete(taskId);
  }
}
