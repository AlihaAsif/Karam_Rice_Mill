import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  newsSlug: {
    type: String,
    required: true,
  },
  newsTitle: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Pending', // Pending, Approved, Rejected
  }
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
