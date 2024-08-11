const Project = require("../models/project");
const multer = require('multer');
const path = require('path');

// Multer setup for file management like photos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`public/file-upload/`))
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  }
})

const upload = multer({ storage: storage })


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
    const { title, description, status, usedTechnology, targetedPlatform } = req.body;
    // Check if project already exists
    const project = await Project.findByIdAndUpdate(req.params.id, { title, description, status, usedTechnology, targetedPlatform }, { new: true });
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

async function handleCreateNewProject(req, res) {
  const { title, description, status, usedTechnology, targetedPlatform } = req.body;
  // Check required fields
  if (!title || !description || !status || !usedTechnology || !targetedPlatform) {
    return res.status(400).json({ message: 'All fields (title, coverImageURL, description, status, usedTechnology, targetedPlatform) are required!' });
  }
  // Check if project already exists
  const isExistingProject = await Project.findOne({ title });
  if (isExistingProject) {
    return res.status(400).json({ message: 'Project with the same title already exists!' });
  }
  //chech status enum
  if (!['active', 'inactive', 'completed'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status. Status must be one of (active or inactive or completed)' });
  }
  try {
    const project = new Project({
      coverImageURL: `/file-upload/${req.file.filename}`,
      title,
      description,
      status,
      usedTechnology,
      targetedPlatform
    });
    await Project.create(project);
    res.status(201).json({ message: 'Project created successfully', data: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from project create!' });
  }
};

module.exports = {
  handleGetAllProjects,
  handleGetProjectById,
  handleUpdateProjectById,
  handleDeleteProjectById,
  handleCreateNewProject,
  upload,
}; 