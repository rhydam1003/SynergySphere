import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMessage extends Document {
  thread: Types.ObjectId;
  body: string;
  attachments?: string[];
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    thread: {
      type: Schema.Types.ObjectId,
      ref: 'Thread',
      required: true,
    },
    body: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 10000,
    },
    attachments: {
      type: [String],
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.index({ thread: 1, createdAt: 1 });
MessageSchema.index({ author: 1 });

export default mongoose.model<IMessage>('Message', MessageSchema);
