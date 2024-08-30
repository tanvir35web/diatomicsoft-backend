const express = require('express');
const { handleGetAllBlogs } = require('../controllers/blog');
const router = express.Router();


router.get('/', handleGetAllBlogs);


module.exports = router;