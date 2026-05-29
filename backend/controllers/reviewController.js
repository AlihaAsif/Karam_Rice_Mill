import Review from '../models/Review.js';

// Submit a new review (Public)
export const submitReview = async (req, res) => {
  try {
    const { productId, productName, name, email, rating, review } = req.body;
    const newReview = new Review({ productId, productName, name, email, rating, review });
    const createdReview = await newReview.save();
    res.status(201).json({ success: true, message: 'Review submitted! Pending approval.', data: createdReview });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all reviews (Admin)
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get approved reviews for a specific product (Public)
export const getReviewsByProduct = async (req, res) => {
  try {
    const reviews = await Review.find({
      productId: req.params.productId,
      status: 'Approved'
    }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update review status (Admin)
export const updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findById(req.params.id);
    if (review) {
      review.status = status || review.status;
      const updatedReview = await review.save();
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete review (Admin)
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (review) {
      await review.deleteOne();
      res.json({ message: 'Review removed' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
