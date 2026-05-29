import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Unread', // Can be Unread, Read, Responded
  }
}, { timestamps: true });

const Message = mongoose.model('Message', messageSchema);

export default Message;
