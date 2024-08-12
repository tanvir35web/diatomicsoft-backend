const ClientReview = require("../models/clientsReview");

async function handleGetAllReviews(req, res) {
  try {
    const reviews = await ClientReview.find();
    res.status(200).json({ message: 'All reviews fetched successfully', data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from get all reviews!' });
  }
};

async function handleGetReviewById(req, res) {
  try {
    const review = await ClientReview.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found!' });
    }
    res.status(200).json({ message: 'Review fetched successfully by ID', data: review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from get reviw by Id!' });
  }
};

async function handleCreateNewReview(req, res) {
  const { clientName, designation, rating, reviewText } = req.body;
  // Check required fields
  if (!clientName || !designation || !rating || !reviewText) {
    return res.status(400).json({ message: 'All fields (clientName, designation, rating, reviewText) are required!' });
  }
  //check rating 1 to 5
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating should be between 1 and 5!' });
  }
  try {
    const review = await ClientReview.create({
      clientName,
      designation,
      rating,
      reviewText,
    });
    res.status(201).json({ message: 'New review created successfully', data: review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from review create!' });
  };
};

async function handleUpdateReviewById(req, res) {
  const { clientName, designation, rating, reviewText } = req.body;
  //check rating 1 to 5
  if (rating < 1 || rating > 5) {
    return res.status(400).json({ message: 'Rating should be between 1 and 5!' });
  }
  try {
    const review = await ClientReview.findByIdAndUpdate(req.params.id, {
      clientName,
      designation,
      rating,
      reviewText,
    }, { new: true });
    if (!review) {
      return res.status(404).json({ message: 'Review not found!' });
    }
    res.status(200).json({ message: 'Review updated successfully', data: review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from review update!' });
  }
};

async function handleDeleteReviewById(req, res) {
  try {
    const review = await ClientReview.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found!' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error from review delete!' });
  }
};

module.exports = {
  handleGetAllReviews,
  handleGetReviewById,
  handleCreateNewReview,
  handleUpdateReviewById,
  handleDeleteReviewById,
};