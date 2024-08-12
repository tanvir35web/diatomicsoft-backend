const express = require("express");
const { restrictToLoggedInUserOnly } = require("../middlewares/auth");
const {
  handleGetAllReviews,
  handleGetReviewById,
  handleCreateNewReview,
  handleUpdateReviewById,
  handleDeleteReviewById
} = require("../controllers/clientsReview");

const router = express.Router();

router.get("/", handleGetAllReviews);
router.get("/:id", handleGetReviewById);
router.delete("/:id", restrictToLoggedInUserOnly, handleDeleteReviewById);
router.patch("/:id", restrictToLoggedInUserOnly, handleUpdateReviewById);
router.post("/", restrictToLoggedInUserOnly, handleCreateNewReview);


module.exports = router;