import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  project: Types.ObjectId;
  type: string;
  actor: Types.ObjectId;
  entityRef?: Types.ObjectId;
  meta?: Record<string, any>;
  createdAt: Date;
}

const ActivitySchema = new Schema<IActivity>(
  {
    project: {
      type: Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    actor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    entityRef: {
      type: Schema.Types.ObjectId,
      default: null,
    },
    meta: {
      type: Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

ActivitySchema.index({ project: 1, createdAt: -1 });
ActivitySchema.index({ actor: 1 });

export default mongoose.model<IActivity>('Activity', ActivitySchema);
