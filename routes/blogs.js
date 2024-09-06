const express = require('express');
const { handleGetAllBlogs,
  handleGetBlogById,
  handleCreateBlog,
  handleUpdateBlogById,
  handleDeleteBlogById
} = require('../controllers/blog');
const { validateBlogPost } = require('../errorValidation/validationMassages');
const router = express.Router();


router.get('/', handleGetAllBlogs);
router.get('/:id', handleGetBlogById);
router.post('/', validateBlogPost, handleCreateBlog);
router.patch('/:id', validateBlogPost, handleUpdateBlogById);
router.delete('/:id', validateBlogPost, handleDeleteBlogById);


module.exports = router;