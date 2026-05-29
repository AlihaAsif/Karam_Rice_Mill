import News from '../models/News.js';

// Get all news
export const getNews = async (req, res) => {
  try {
    const news = await News.find({}).sort({ date: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single news by ID
export const getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (news) {
      res.json(news);
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create news (Admin only)
export const createNews = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const news = new News({
      title,
      content,
      image
    });
    const createdNews = await news.save();
    res.status(201).json(createdNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update news (Admin only)
export const updateNews = async (req, res) => {
  try {
    const { title, content, image } = req.body;
    const news = await News.findById(req.params.id);

    if (news) {
      news.title = title || news.title;
      news.content = content || news.content;
      news.image = image || news.image;

      const updatedNews = await news.save();
      res.json(updatedNews);
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete news (Admin only)
export const deleteNews = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (news) {
      await news.deleteOne();
      res.json({ message: 'News removed' });
    } else {
      res.status(404).json({ message: 'News not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
