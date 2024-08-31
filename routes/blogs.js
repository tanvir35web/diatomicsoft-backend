const express = require('express');
const { handleGetAllBlogs, handleGetBlogById, handleCreateBlog } = require('../controllers/blog');
const { validateBlogPost } = require('../errorValidation/validationMassages');
const router = express.Router();


router.get('/', handleGetAllBlogs);
router.post('/', validateBlogPost, handleCreateBlog);
router.get('/:id', handleGetBlogById );


module.exports = router;