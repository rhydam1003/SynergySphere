import User, { IUser } from '../models/User.model';

export class UserRepository {
  async create(data: Partial<IUser>): Promise<IUser> {
    const user = new User(data);
    return user.save();
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findById(id).select('-passwordHash');
  }

  async findByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return User.findByIdAndUpdate(id, data, { new: true }).select('-passwordHash');
  }

  async delete(id: string): Promise<boolean> {
    const result = await User.deleteOne({ _id: id });
    return result.deletedCount !== undefined && result.deletedCount > 0;
  }

  async findAll(filter: Record<string, unknown> = {}): Promise<IUser[]> {
    return User.find(filter).select('-passwordHash');
  }
}
