const Project = require("../models/project");
const path = require('path');
const FormData = require('form-data');
const axios = require('axios');
const fs = require('fs');
const { errorValidationMessageFormatter } = require("../errorValidation/errorValidationMessageFormatter");


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

    let imageUrl = null;

    // Check if a file is uploaded
    if (req.file) {
      const filePath = path.resolve('upload/', req.file.filename);
      const formData = new FormData();
      formData.append('image', fs.createReadStream(filePath));

      try {
        // Upload image to ImageBB
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.IMGBB_API_KEY}`, formData, {
          headers: {
            ...formData.getHeaders(),
          },
        });

        // Get the ImageBB URL
        imageUrl = response.data.data.url;
      } catch (uploadError) {
        console.error('Error uploading image to ImageBB:', uploadError);
        return res.status(500).json({ message: 'Error uploading image!' });
      } finally {
        // Delete the local file whether or not the upload succeeds
        try {
          fs.unlinkSync(filePath);
        } catch (unlinkError) {
          console.error('Error deleting file:', unlinkError);
        }
      }
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