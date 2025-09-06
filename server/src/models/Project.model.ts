import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IProjectMember {
  user: Types.ObjectId;
  role: 'manager' | 'member';
  joinedAt: Date;
}

export interface IProject extends Document {
  name: string;
  description?: string;
  owner: Types.ObjectId;
  members: IProjectMember[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectMemberSchema = new Schema<IProjectMember>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  role: {
    type: String,
    enum: ['manager', 'member'],
    default: 'member',
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const ProjectSchema = new Schema<IProject>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 2000,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    members: [ProjectMemberSchema],
  },
  {
    timestamps: true,
  }
);

ProjectSchema.index({ owner: 1 });
ProjectSchema.index({ 'members.user': 1 });
ProjectSchema.index({ createdAt: -1 });

export default mongoose.model<IProject>('Project', ProjectSchema);
