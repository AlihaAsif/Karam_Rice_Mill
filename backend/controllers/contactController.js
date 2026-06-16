import Message from '../models/Message.js';

// Submit a new contact message
export const submitMessage = async (req, res) => {
  try {
    const { name, email, telephone, city, subject, message } = req.body;
    const newMessage = new Message({
      name,
      email,
      telephone,
      city,
      subject,
      message
    });
    const createdMessage = await newMessage.save();
    res.status(201).json({ success: true, message: 'Message sent successfully!', data: createdMessage });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all messages (Admin only)
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update message status (Admin only)
export const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Message.findById(req.params.id);

    if (message) {
      message.status = status || message.status;
      const updatedMessage = await message.save();
      res.json(updatedMessage);
    } else {
      res.status(404).json({ message: 'Message not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
