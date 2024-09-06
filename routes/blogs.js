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
router.post('/', validateBlogPost, handleCreateBlog);
router.get('/:id', handleGetBlogById);
router.patch('/:id', handleUpdateBlogById);
router.delete('/:id', handleDeleteBlogById);


module.exports = router;