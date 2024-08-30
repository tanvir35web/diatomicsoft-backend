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


module.exports = {
  handleGetAllBlogs,
};