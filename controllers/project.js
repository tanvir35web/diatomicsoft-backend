const Project = require("../models/project");
const { errorValidationMessageFormatter } = require("../errorValidation/errorValidationMessageFormatter");
const { imageUpload } = require("../services/imageUpload");


async function handleGetAllProjects(req, res) {
  try {
    const projects = await Project.find();
    res.status(200).json({ message: 'All projects fetched successfully', data: projects.reverse() });
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
    console.log('body', req.body);
    
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


async function handleCreateNewProject(req, res) {
  const hasErrors = errorValidationMessageFormatter(req, res);
  if (hasErrors) return; // Stop further execution if there are validation errors

  const { title, description, projectStatus, usedTechnology, targetedPlatform } = req.body;

  try {
    // Check if project already exists
    const isExistingProject = await Project.findOne({ title });
    if (isExistingProject) {
      return res.status(422).json({ message: 'Project with the same title already exists!' });
    }

    const imageUrl = await imageUpload(req);

    const project = new Project({
      coverImageURL: imageUrl || null,
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
    res.status(500).json({ message: 'Server Error from project creation!' });
  }
}


module.exports = {
  handleGetAllProjects,
  handleGetProjectById,
  handleUpdateProjectById,
  handleDeleteProjectById,
  handleCreateNewProject,
}; 