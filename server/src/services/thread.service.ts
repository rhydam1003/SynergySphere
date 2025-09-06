import { Types } from 'mongoose';
import { ThreadRepository } from '../repositories/thread.repository';
import { MessageRepository } from '../repositories/message.repository';
import { ProjectRepository } from '../repositories/project.repository';
import { NotFoundError, AuthorizationError } from '../utils/errors';

interface CreateThreadDto { title: string }
interface CreateMessageDto { body: string; attachments?: string[] }

export class ThreadService {
  constructor(
    private threadRepo: ThreadRepository,
    private messageRepo: MessageRepository,
    private projectRepo: ProjectRepository
  ) {}

  private async ensureMembership(projectId: string, userId: string) {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
    const isMember = project.owner.equals(userId) || project.members.some(m => m.user.equals(userId));
    if (!isMember) throw new AuthorizationError('Not a project member');
  }

  async createThread(projectId: string, userId: string, dto: CreateThreadDto) {
    await this.ensureMembership(projectId, userId);
    return this.threadRepo.create({
      project: new Types.ObjectId(projectId),
      title: dto.title,
      createdBy: new Types.ObjectId(userId),
    } as any);
  }

  async listThreads(projectId: string, userId: string) {
    await this.ensureMembership(projectId, userId);
    return this.threadRepo.listByProject(projectId);
  }

  async getThread(threadId: string, userId: string) {
    const thread = await this.threadRepo.findById(threadId);
    if (!thread) throw new NotFoundError('Thread not found');
    await this.ensureMembership((thread.project as any).toString(), userId);
    return thread;
  }

  async postMessage(threadId: string, userId: string, dto: CreateMessageDto) {
    const thread = await this.threadRepo.findById(threadId);
    if (!thread) throw new NotFoundError('Thread not found');
    await this.ensureMembership((thread.project as any).toString(), userId);
    return this.messageRepo.create({
      thread: thread._id as any,
      body: dto.body,
      attachments: dto.attachments ?? [],
      author: new Types.ObjectId(userId),
    } as any);
  }

  async listMessages(threadId: string, userId: string) {
    const thread = await this.threadRepo.findById(threadId);
    if (!thread) throw new NotFoundError('Thread not found');
    await this.ensureMembership((thread.project as any).toString(), userId);
    return this.messageRepo.listByThread(threadId);
  }

  async deleteMessage(messageId: string) {
    return this.messageRepo.delete(messageId);
  }
}
