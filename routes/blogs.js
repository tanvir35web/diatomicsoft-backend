const express = require('express');
const { handleGetAllBlogs,
  handleGetBlogById,
  handleCreateBlog,
  handleUpdateBlogById,
  handleDeleteBlogById
} = require('../controllers/blog');
const { validateBlogPost } = require('../errorValidation/validationMassages');
const router = express.Router();
const upload = require("../multerConfig");



router.get('/', handleGetAllBlogs);
router.get('/:id', handleGetBlogById);
router.post('/',  upload.single('image'), validateBlogPost, handleCreateBlog);
router.patch('/:id', upload.single('image'), validateBlogPost, handleUpdateBlogById);
router.delete('/:id', validateBlogPost, handleDeleteBlogById);


module.exports = router;