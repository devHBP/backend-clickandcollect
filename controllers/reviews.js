const Review = require('../models/BDD/Reviews')

const averageRatings = async (req, res) => {
    let totalRating = 0;

    for (const review of Review) {
        totalRating += review.rating;
    }

    const averageRating = Review.length > 0 ? totalRating / Review.length : 0;

    res.send(`La moyenne des notes est: ${averageRating}`);
}

module.exports = { averageRatings }