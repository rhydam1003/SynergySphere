import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IThread extends Document {
  project: Types.ObjectId;
  title: string;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const ThreadSchema = new Schema<IThread>(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 200,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ThreadSchema.index({ project: 1 });
ThreadSchema.index({ createdAt: -1 });

export default mongoose.model<IThread>('Thread', ThreadSchema);
