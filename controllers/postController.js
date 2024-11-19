const Post = require('../models/postModel');
const User = require('../models/userModel');

// Fetch all unreported and undone posts for a specific organization
exports.getAllPosts = async (req, res) => {
  try {
    const { organization } = req.query; // Assuming organization is passed in query
    const posts = await Post.find({ reported: false, done: false })
      .populate({
        path: 'userId',
        select: 'username profilePicture email', // Return these fields only
        match: { organization }, // Match user organization
      })
      .lean();

    const filteredPosts = posts.filter(post => post.userId !== null); // Remove posts with unmatched users
    return res.status(200).json(filteredPosts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Report a post
exports.reportPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndUpdate(postId, { reported: true }, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    return res.status(200).json({ message: 'Post reported successfully', post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Mark a post as done or undone
exports.toggleDoneStatus = async (req, res) => {
  try {
    const { postId } = req.params;
    const { done } = req.body;

    const post = await Post.findByIdAndUpdate(postId, { done }, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    return res.status(200).json({ message: `Post marked as ${done ? 'done' : 'undone'}`, post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete all posts by a specific user
exports.deleteUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    await Post.deleteMany({ userId });
    return res.status(200).json({ message: 'All posts from the user deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete a specific post
exports.deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findByIdAndDelete(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const updates = req.body;

    const post = await Post.findByIdAndUpdate(postId, updates, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    return res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Add a new post
exports.addPost = async (req, res) => {
  try {
    const { title, description, contactInfo, time, memberCount, category, location, userId } = req.body;

    const post = new Post({ title, description, contactInfo, time, memberCount, category, location, userId });
    await post.save();

    return res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Delete all posts
exports.deleteAllPosts = async (req, res) => {
  try {
    await Post.deleteMany();
    return res.status(200).json({ message: 'All posts deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get posts by category
exports.getPostsByCategory = async (req, res) => {
  try {
    const { category } = req.query;
    const posts = await Post.find({ category }).populate('userId', 'username profilePicture email');
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Get all posts of a user
exports.getOwnPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};



// Fetch all reported posts (Admin Only)
exports.getReportedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ reported: true })
      .populate('userId', 'username profilePicture email')
      .lean();

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Unreport a specific post (Admin Only)
exports.unreportPost = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findByIdAndUpdate(postId, { reported: false }, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    return res.status(200).json({ message: 'Post unreported successfully', post });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

