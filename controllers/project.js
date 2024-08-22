const Project = require("../models/project");
const multer = require('multer');
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');
const { body, validationResult } = require('express-validator');


// multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve('upload/'));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
});


const upload = multer({ storage: storage });




async function handleGetAllProjects(req, res) {
  try {
    const projects = await Project.find();
    res.status(200).json({ message: 'All projects fetched successfully', data: projects });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error!' });
  }
}

async function handleGetProjectById(req, res) {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found!' });
    }
    res.status(200).json({ message: 'Project fetched successfully by ID', data: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error!' });
  }
};

async function handleUpdateProjectById(req, res) {
  try {
    const { title, description, projectStatus, usedTechnology, targetedPlatform } = req.body;
    // Check if project already exists
    const project = await Project.findByIdAndUpdate(req.params.id, { title, description, projectStatus, usedTechnology, targetedPlatform }, { new: true });
    if (!project) {
      return res.status(404).json({ message: 'Project not found!' });
    }
    res.status(200).json({ message: 'Project updated successfully', data: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error!' });
  }
};

async function handleDeleteProjectById(req, res) {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found!' });
    }
    res.status(200).json({ message: 'Project deleted successfully by ID' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error!' });
  }
};

const validateProject = [
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

async function handleCreateNewProject(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const groupedErrors = errors.array().reduce((acc, err) => {
      if (!acc[err.path]) {
        acc[err.path] = [];
      }
      acc[err.path].push(err.msg);
      return acc;
    }, {});

    const firstErrorMessage = errors.array()[0].msg;
    const additionalErrorsCount = errors.array().length - 1;
    const summaryMessage = additionalErrorsCount > 0
      ? `${firstErrorMessage} (and ${additionalErrorsCount} more error${additionalErrorsCount > 1 ? 's' : ''})`
      : firstErrorMessage;

    return res.status(422).json({
      message: summaryMessage,
      errors: groupedErrors,
    });
  }

  const { title, description, projectStatus, usedTechnology, targetedPlatform } = req.body;

  try {
    // Check if project already exists
    const isExistingProject = await Project.findOne({ title });
    if (isExistingProject) {
      return res.status(422).json({ message: 'Project with the same title already exists!' });
    }

    let imageUrl = null;

    // Check if a file is uploaded
    if (req.file) {
      // Upload image to ImageBB
      const filePath = path.resolve('upload/', req.file.filename);
      const formData = new FormData();
      formData.append('image', fs.createReadStream(filePath));

      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, formData, {
        headers: {
          ...formData.getHeaders(),
        },
      });

      // Delete the local file after successful upload
      fs.unlinkSync(filePath);

      // Get the ImageBB URL
      imageUrl = response.data.data.url;
    }

    // Create a new project with or without the ImageBB URL
    const project = new Project({
      coverImageURL: imageUrl, // Use the ImageBB URL if available
      title,
      description,
      projectStatus,
      usedTechnology,
      targetedPlatform,
    });

    await project.save();

    res.status(201).json({ message: 'Project created successfully', data: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from project create!' });
  }
}


module.exports = {
  handleGetAllProjects,
  handleGetProjectById,
  handleUpdateProjectById,
  handleDeleteProjectById,
  handleCreateNewProject,
  upload,
  validateProject,
}; 