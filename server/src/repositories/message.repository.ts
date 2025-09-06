import Message, { IMessage } from '../models/Message.model';

export class MessageRepository {
  async create(data: Partial<IMessage>): Promise<IMessage> {
    const message = new Message(data);
    return message.save();
  }

  async listByThread(threadId: string): Promise<IMessage[]> {
    return Message.find({ thread: threadId }).sort({ createdAt: 1 });
  }

  async delete(id: string): Promise<boolean> {
    const result = await Message.deleteOne({ _id: id });
    return result.deletedCount !== undefined && result.deletedCount > 0;
  }
}
