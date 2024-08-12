const mongoose = require('mongoose');

const clientReviewSchema = new mongoose.Schema({

  profilePhoto: {
    type: String,
    default: null,
  },

  clientName: {
    type: String,
    required: true,
  },

  designation: {
    type: String,
    required: true,
  },

  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    default: 3,
  },

  reviewText: {
    type: String,
    required: true,
  }


}, { timestamps: true });

const ClientReview = mongoose.model("clientReview", clientReviewSchema);

module.exports = ClientReview;