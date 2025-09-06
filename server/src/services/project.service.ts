import { Types } from 'mongoose';
import { ProjectRepository } from '../repositories/project.repository';
import { ActivityRepository } from '../repositories/activity.repository';
import { NotFoundError, AuthorizationError } from '../utils/errors';

interface CreateProjectDto {
  name: string;
  description?: string;
}

interface UpdateProjectDto {
  name?: string;
  description?: string;
}

export class ProjectService {
  constructor(
    private projectRepo: ProjectRepository,
    private activityRepo: ActivityRepository
  ) {}

  async createProject(ownerId: string, dto: CreateProjectDto) {
    const project = await this.projectRepo.create({
      name: dto.name,
      description: dto.description,
      owner: new Types.ObjectId(ownerId),
      members: [{ user: new Types.ObjectId(ownerId), role: 'manager', joinedAt: new Date() }],
    } as any);

    await this.activityRepo.create({
      project: project._id as any,
      type: 'project.created',
      actor: new Types.ObjectId(ownerId),
      entityRef: project._id as any,
      meta: { name: project.name },
    });

    return project;
  }

  async listForUser(userId: string) {
    return this.projectRepo.findAllForUser(userId);
  }

  async getProjectForUser(projectId: string, userId: string) {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
    const isMember = project.owner.equals(userId) || project.members.some(m => m.user.equals(userId));
    if (!isMember) throw new AuthorizationError('Not a project member');
    return project;
  }

  async updateProject(projectId: string, userId: string, dto: UpdateProjectDto) {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
    if (!project.owner.equals(userId)) throw new AuthorizationError('Only owner can update');
    const updated = await this.projectRepo.update(projectId, dto as any);
    return updated;
  }

  async deleteProject(projectId: string, userId: string) {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
    if (!project.owner.equals(userId)) throw new AuthorizationError('Only owner can delete');
    return this.projectRepo.delete(projectId);
  }

  async addMember(projectId: string, userId: string, memberId: string, role: 'manager' | 'member') {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
    if (!project.owner.equals(userId)) throw new AuthorizationError('Only owner can add members');
    return this.projectRepo.addMember(projectId, memberId, role);
  }

  async updateMember(projectId: string, userId: string, memberId: string, role: 'manager' | 'member') {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
    if (!project.owner.equals(userId)) throw new AuthorizationError('Only owner can update members');
    return this.projectRepo.updateMember(projectId, memberId, role);
  }

  async removeMember(projectId: string, userId: string, memberId: string) {
    const project = await this.projectRepo.findById(projectId);
    if (!project) throw new NotFoundError('Project not found');
    if (!project.owner.equals(userId)) throw new AuthorizationError('Only owner can remove members');
    return this.projectRepo.removeMember(projectId, memberId);
  }

  async listActivity(projectId: string, userId: string) {
    await this.getProjectForUser(projectId, userId);
    return this.activityRepo.listByProject(projectId);
  }
}
