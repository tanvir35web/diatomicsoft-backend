const express = require('express');
const { handleGetAllBlogs, handleGetBlogById } = require('../controllers/blog');
const router = express.Router();


router.get('/', handleGetAllBlogs);
router.get('/:id', handleGetBlogById );


module.exports = router;