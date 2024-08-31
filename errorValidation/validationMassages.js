const { body } = require('express-validator');


const validateUserSignup = [
    body('name').notEmpty().withMessage('The name field is required.'),
    body('email').notEmpty().withMessage('The email field is required.'),
    body('password').notEmpty().withMessage('The password field is required.'),
];

const validateUserLogin = [
    body('email').notEmpty().withMessage('The email field is required.'),
    body('password').notEmpty().withMessage('The password field is required.'),
];

const validateCreateProject = [
    body('title').notEmpty().withMessage('The title field is required.'),
    body('description').notEmpty().withMessage('The description field is required.'),
    body('projectStatus')
      .notEmpty()
      .withMessage('The projectStatus field is required.')
      .isIn(['active', 'inactive', 'completed'])
      .withMessage('Invalid projectStatus. projectStatus must be one of (active, inactive, completed).'),
    body('usedTechnology').notEmpty().withMessage('The usedTechnology field is required.'),
    body('targetedPlatform').notEmpty().withMessage('The targetedPlatform field is required.'),
  ];

  const validateBlogPost = [
    body('title').notEmpty().withMessage('The title field is required.'),
    body('description').notEmpty().withMessage('The description field is required.'),
    body('author').notEmpty().withMessage('The author field is required.'),
    body('tags').notEmpty().withMessage('The tags field is required.'),
];


module.exports = {
    validateUserSignup,
    validateUserLogin,
    validateCreateProject,
    validateBlogPost,
};