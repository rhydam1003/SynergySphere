import Project, { IProject } from '../models/Project.model';
import { Types } from 'mongoose';

export class ProjectRepository {
  async create(data: Partial<IProject>): Promise<IProject> {
    const project = new Project(data);
    return project.save();
  }

  async findById(id: string): Promise<IProject | null> {
    return Project.findById(id);
  }

  async findAllForUser(userId: string): Promise<IProject[]> {
    const uid = new Types.ObjectId(userId);
    return Project.find({ $or: [{ owner: uid }, { 'members.user': uid }] }).sort({ createdAt: -1 });
  }

  async update(id: string, data: Partial<IProject>): Promise<IProject | null> {
    return Project.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Project.deleteOne({ _id: id });
    return result.deletedCount !== undefined && result.deletedCount > 0;
  }

  async addMember(projectId: string, userId: string, role: 'manager' | 'member'): Promise<IProject | null> {
    return Project.findByIdAndUpdate(
      projectId,
      {
        $addToSet: {
          members: { user: new Types.ObjectId(userId), role, joinedAt: new Date() },
        },
      },
      { new: true }
    );
  }

  async updateMember(projectId: string, userId: string, role: 'manager' | 'member'): Promise<IProject | null> {
    return Project.findOneAndUpdate(
      { _id: projectId, 'members.user': new Types.ObjectId(userId) },
      { $set: { 'members.$.role': role } },
      { new: true }
    );
  }

  async removeMember(projectId: string, userId: string): Promise<IProject | null> {
    return Project.findByIdAndUpdate(
      projectId,
      { $pull: { members: { user: new Types.ObjectId(userId) } } },
      { new: true }
    );
  }
}
