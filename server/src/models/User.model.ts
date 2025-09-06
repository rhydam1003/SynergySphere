import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  avatar?: string;
  roles: ('admin' | 'manager' | 'member')[];
  settings: {
    notificationsEnabled: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: null,
    },
    roles: {
      type: [String],
      enum: ['admin', 'manager', 'member'],
      default: ['member'],
    },
    settings: {
      notificationsEnabled: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Removed redundant non-unique email index; unique index is created from the schema field above
UserSchema.index({ createdAt: -1 });

export default mongoose.model<IUser>('User', UserSchema);
