const { errorValidationMessageFormatter } = require("../errorValidation/errorValidationMessageFormatter");
const Blog = require("../models/blog");
const { imageUpload } = require("../services/imageUpload");

async function handleGetAllBlogs(req, res) {
  try {
    const blogs = await Blog.find();
    res.status(200).json({ message: 'All blogs fetched successfully', data: blogs.reverse() });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from all blog fetch!' });
  }
}

async function handleCreateBlog(req, res) {

  const hasErrors = errorValidationMessageFormatter(req, res);
  if (hasErrors) return; // Stop further execution if there are validation errors

  const { title, description, author, tags } = req.body;

  try {
    const imageforBlog = await imageUpload(req);
    const newBlog = new Blog({
      title,
      description,
      author,
      tags,
      blogImage: imageforBlog || null,
    })
    const savedBlog = await newBlog.save();
    res.status(201).json({ message: 'Blog created successfully', data: savedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from blog creation!' });
  }
};


// function handleCreateBlog(req, res) {
//   const { title, description, author, tags } = req.body;

//     // Log the incoming request body
//     console.log('Request Body:', req.body);


//   // Validate incoming fields
//   if (!title || !description || !author || !tags) {
//     return res.status(422).json({
//       message: 'Validation errorsss',
//       errors: {
//         title: !title ? ['The title field is required.'] : [],
//         description: !description ? ['The description field is required.'] : [],
//         author: !author ? ['The author field is required.'] : [],
//         tags: !tags ? ['The tags field is required.'] : [],
//       }
//     });
//   }

//   try {
//     const newBlog = {
//       title,
//       description,
//       author,
//       tags
//     };
//     // Save your blog to the database (this is a placeholder)
//     res.status(201).json({ message: 'Blog created successfully', data: newBlog });
//   } catch (error) {
//     console.error('Error creating blog:', error);
//     res.status(500).json({ message: 'Server error occurred while creating the blog.' });
//   }
// };

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

// async function handleUpdateBlogById(req, res) {
//   const hasErrors = errorValidationMessageFormatter(req, res);
//   if (hasErrors) return; // Stop further execution if there are validation errors

//   try {
//     const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!blog) {
//       return res.status(404).json({ message: 'Blog not found!' });
//     }
//     res.status(200).json({ message: 'Blog updated successfully', data: blog });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error from Blog update!' });
//   }
// };

async function handleUpdateBlogById(req, res) {

  const hasErrors = errorValidationMessageFormatter(req, res);
  if (hasErrors) return; // Stop further execution if there are validation errors

  const { title, description, author, tags } = req.body;
  const blogId = req.params.id;

  try {
    const existingBlog = await Blog.findById(blogId);
    if (!existingBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Update fields if provided
    if (title) existingBlog.title = title;
    if (description) existingBlog.description = description;
    if (author) existingBlog.author = author;
    if (tags) existingBlog.tags = tags;

    // If there is an image to upload, replace the existing one
    if (req.files || req.file) {
      const imageforBlog = await imageUpload(req);
      existingBlog.blogImage = imageforBlog || existingBlog.blogImage;
    }

    const updatedBlog = await existingBlog.save();
    res.status(200).json({ message: 'Blog updated successfully', data: updatedBlog });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from blog update!' });
  }
}


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
