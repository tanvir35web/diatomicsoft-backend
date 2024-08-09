const Project = require("../modals/project");

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
    return res.status(400).json({ message: 'All fields (title, description, status, usedTechnology, targetedPlatform) are required!' });
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
    const project = new Project({ title, description, status, usedTechnology, targetedPlatform });
    await Project.create(project);
    res.status(201).json({ message: 'Project created successfully', data: project });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error!' });
  }
};

module.exports = {
  handleGetAllProjects,
  handleGetProjectById,
  handleUpdateProjectById,
  handleDeleteProjectById,
  handleCreateNewProject
}; 