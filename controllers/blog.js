const Blog = require("../models/blog");

async function handleGetAllBlogs(req, res) {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ message: 'All blogs fetched successfully', data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error!' });
  }
}

async function handleGetBlogById(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found!' });
    }
    res.status(200).json({ message: 'Blog fetched successfully by ID', data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error!' });
  }
};




module.exports = {
  handleGetAllBlogs,
  handleGetBlogById,
};
