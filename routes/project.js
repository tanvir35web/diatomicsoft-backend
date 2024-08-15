const express = require("express");
const { restrictToLoggedInUserOnly } = require("../middlewares/auth");
const {
  handleGetAllProjects,
  handleCreateNewProject,
  handleGetProjectById,
  handleUpdateProjectById,
  handleDeleteProjectById,
  upload
} = require("../controllers/project");

const router = express.Router();

router.get("/", handleGetAllProjects);
router.get("/:id", handleGetProjectById);
router.patch("/:id", restrictToLoggedInUserOnly, handleUpdateProjectById);
router.delete("/:id", restrictToLoggedInUserOnly, handleDeleteProjectById);
router.post("/", upload.single('coverImage'), handleCreateNewProject);


module.exports = router;