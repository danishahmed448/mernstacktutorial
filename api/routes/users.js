const router = require("express").Router();
const verify = require("../middleware/verifyToken.js");
const User = require('../models/User.js');
const CryptoJS = require("crypto-js");
const Movie = require('../models/Movie.js');
//UPDATE
router.put("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASSWORD_ENCRYPTION_SECRET).toString();
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            const {password,...info}=updatedUser._doc;
            return res.status(200).json(info);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        return res.status(403).json({ message: "You can update only your account!" })
    }
})
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        
        try {
            await User.findByIdAndDelete(req.params.id);
            return res.status(200).json("User has been deleted");
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        return res.status(403).json({ message: "You can update only your account!" })
    }
})//DELETE

//GET ONE
router.get("/find/:id", async (req, res) => {


    try {
        const user=await User.findById(req.params.id);
        const {password,...info}=user._doc;
        return res.status(200).json(info);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

})
//GET ALL
router.get("/", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {

        try {
            const users = query ? await User.find().sort({_id:-1}).limit(5) : await User.find();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    } else {
        return res.status(403).json({ message: "You are not allowed to see all users" })
    }
})
//GET USER STATS
router.get("/stats",async(req,res)=>{
    const today = new Date();
    const lastYear = today.setFullYear(today.getFullYear()-1);

    
    try {
        const data = await User.aggregate([
            {
                $project:{
                    month:{$month:"$createdAt"}
                }
            },{
                $group:{
                    _id:"$month",
                    total:{$sum:1}
                }
            }
        ])
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
})

//ADD A MOVIE TO FAVORITE
//In this code, the POST /users/favorites route expects a movieId field in the request body, corresponding to the _id of the movie to be added to the favorites list.
router.post('/favorites',verify,async(req,res)=>{
    console.log(req.user)
    const userId = req.user.id;
    const movieId = req.body.movieID;
    
    try {
        const user = await User.findById(userId);
        if (user.favorites.includes(movieId)) {
            res.status(409).json({message:'Movie already in favorites list'});
            return;
        }
        console.log(req.body)
        const movie=await Movie.findById(movieId);
        if(!movie) {
            res.status(404).json({message:'Movie not found'});
            return;
        }
        user.favorites.push(movieId);
        await user.save();

        movie.likes.push(userId);
        await movie.save();
        const {password,...info}=user._doc;
        return res.status(200).json(info);
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error.message});
    }
})
//DELETE A MOVIE FROM FAVORITE
router.delete('/favorites/:movieID',verify,async(req,res)=>{
    
    const userId = req.user.id;
    const movieId = req.params.movieID;
    try {
        const user = await User.findById(userId);
        if (!user.favorites.includes(movieId)) {
            res.status(404).json({message:'Movie not found in favorites list'});
            return;
        }
        const movie = await Movie.findById(movieId);
        if (!movie) {
            res.status(404).json({message:'Movie not found'});
            return;
        }
        
        user.favorites = user.favorites.filter((id) => id.toString() !== movieId);
        console.log(user.favorites)
        await user.save();

        movie.likes = movie.likes.filter((id) => id.toString() !== userId);
        await movie.save();
        const {password,...info}=user._doc;
        return res.status(200).json(info);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
})

//GET ALL FAVORITES
router.get('/favorites',verify,async(req,res)=>{
    const userId = req.user._id;
    try {
        const user = await User.findById(userId).populate('favorites');
        res.send(user.favorites);
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
})
module.exports = router;