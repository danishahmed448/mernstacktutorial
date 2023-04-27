const router = require("express").Router();
const verify = require("../middleware/verifyToken.js");
const Movie = require('../models/Movie.js');


//CREATE
router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);
        try {
            const savedMovie = await newMovie.save();
            return res.status(201).json(savedMovie);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    } else {
        return res.status(403).json({ message: "You are not allowed!" })
    }
})

//UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updatedMovie = await Movie.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                { new: true }
            );
            return res.status(200).json(updatedMovie);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    } else {
        return res.status(403).json({ message: "You are not allowed!" })
    }
})

//DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await Movie.findByIdAndDelete(req.params.id);
            return res.status(200).json("The movie has been deleted...");
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    } else {
        return res.status(403).json({ message: "You are not allowed!" })
    }
})

//GET ONE
router.get("/find/:id", verify, async (req, res) => {

    try {
       const movie= await Movie.findById(req.params.id);
        return res.status(200).json(movie);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

})

//GET RANDOM
router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
       if(type==="series"){
        movie = await Movie.aggregate([
            {$match:{isSeries:true}},
            {$sample:{size:1}},
        ])
       }else{
        movie = await Movie.aggregate([
            {$match:{isSeries:false}},
            {$sample:{size:1}},
        ])
       }
       return res.status(200).json(movie);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

})


//GET ALL
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const movies=await Movie.find();
            return res.status(200).json(movies.reverse());
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    } else {
        return res.status(403).json({ message: "You are not allowed!" })
    }
})

// Get a list of movies with above-average likes, sorted by creation time
router.get('/new-and-popular',verify, async (req, res) => {
    try {
        const movies = await Movie.find();

        // Calculate the average number of likes for all movies
        const totalLikes = movies.reduce((sum, movie) => sum + movie.likes.length, 0);
        const averageLikes = totalLikes / movies.length;

        // Find all movies with above-average likes
        const aboveAverageMovies = movies.filter((movie) => movie.likes.length > averageLikes);

        // Sort the above-average movies by creation time, with newer movies first
        aboveAverageMovies.sort((a, b) => b.createdAt - a.createdAt);

        return res.status(200).json(aboveAverageMovies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
//SEARCH FOR MOVIES OR SERIES
router.get('/search', async (req, res) => {
    try {
      const { query } = req.query;
      const movies = await Movie.find({
        title: { $regex: query, $options: 'i' }
      });
      return res.status(200).json(movies);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
  });
// Get keyword suggestions for a search query
router.get('/search/keywords/:query', async (req, res) => {
    const query = req.params.query;

    try {
        const movies = await Movie.find({title: new RegExp(query, 'i')})
            .select('_id')
            .lean()
            .exec();

        const suggestions = movies.map((movie) => movie._id);

        return res.status(200).json(suggestions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
module.exports = router;