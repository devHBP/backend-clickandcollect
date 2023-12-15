const Reviews = require('../models/BDD/Reviews')

const averageRatings = async (req, res) => {
    try {
        const allReviews = await Reviews.findAll(); 

        let totalRating = 0;

        for (const review of allReviews) {
            totalRating += review.rating;
        }

        const averageRating = allReviews.length > 0 ? totalRating / allReviews.length : 0;

        res.send(`La moyenne des notes est: ${averageRating}`);
    } catch (error) {
        // Gestion des erreurs
        res.status(500).send("Erreur lors de la récupération des reviews");
    }
}

module.exports = { averageRatings }