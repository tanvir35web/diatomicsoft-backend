const express = require("express");
const { restrictToLoggedInUserOnly } = require("../middlewares/auth");
const {
  handleGetAllProjects,
  handleCreateNewProject,
  handleGetProjectById,
  handleUpdateProjectById,
  handleDeleteProjectById,
} = require("../controllers/project");
const { validateCreateProject } = require("../errorValidation/validationMassages");
const upload = require("../multerConfig");

const router = express.Router();

router.get("/", handleGetAllProjects);
router.get("/:id", handleGetProjectById);
router.patch("/:id", upload.single('coverImage'), restrictToLoggedInUserOnly, handleUpdateProjectById);
router.delete("/:id", restrictToLoggedInUserOnly, handleDeleteProjectById);
router.post("/", upload.single('coverImage'), validateCreateProject, handleCreateNewProject);


module.exports = router;