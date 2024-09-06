const { errorValidationMessageFormatter } = require("../errorValidation/errorValidationMessageFormatter");
const Blog = require("../models/blog");
const { imageUpload } = require("../services/imageUpload");

async function handleGetAllBlogs(req, res) {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ message: 'All blogs fetched successfully', data: blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from all blog fetch!' });
  }
}

async function handleCreateBlog(req, res) {

  const hasErrors = errorValidationMessageFormatter(req, res);
  if (hasErrors) return; // Stop further execution if there are validation errors

  const {title, description, author, tags} = req.body;

  try {
   const imageUrl = await imageUpload(req);
   const newBlog = new Blog({
    title,
    description,
    author,
    tags,
    imageUrl: imageUrl || null, 
   })
    const savedBlog = await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', data: savedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from blog creation!' });
  }
};

async function handleGetBlogById(req, res) {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found!' });
    }
    res.status(200).json({ message: 'Blog fetched successfully by ID', data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from get blog by id!' });
  }
};

async function handleUpdateBlogById(req, res) {
  const hasErrors = errorValidationMessageFormatter(req, res);
  if (hasErrors) return; // Stop further execution if there are validation errors

  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found!' });
    }
    res.status(200).json({ message: 'Blog updated successfully', data: blog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from Blog update!' });
  }
};

async function handleDeleteBlogById(req, res) {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: 'Blog not found!' });
    }
    res.status(200).json({ message: 'Blog deleted successfully by ID' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from Blog delete!' });
  }
};




module.exports = {
  handleGetAllBlogs,
  handleCreateBlog,
  handleGetBlogById,
  handleUpdateBlogById,
  handleDeleteBlogById,
};
