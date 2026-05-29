import Comment from '../models/Comment.js';

// Submit a new comment (Public)
export const submitComment = async (req, res) => {
  try {
    const { newsSlug, newsTitle, name, email, comment } = req.body;
    const newComment = new Comment({ newsSlug, newsTitle, name, email, comment });
    const createdComment = await newComment.save();
    res.status(201).json({ success: true, message: 'Comment submitted! Pending approval.', data: createdComment });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all comments (Admin)
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({}).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get approved comments for a specific news article (Public)
export const getCommentsByNews = async (req, res) => {
  try {
    const comments = await Comment.find({
      newsSlug: req.params.slug,
      status: 'Approved'
    }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update comment status (Admin)
export const updateCommentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      comment.status = status || comment.status;
      const updatedComment = await comment.save();
      res.json(updatedComment);
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete comment (Admin)
export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment) {
      await comment.deleteOne();
      res.json({ message: 'Comment removed' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
