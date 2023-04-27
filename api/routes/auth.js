const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new User({
        username,
        email,
        password: CryptoJS.AES.encrypt(password, process.env.PASSWORD_ENCRYPTION_SECRET).toString()
    })
    try {
        const user = await newUser.save();
        const { password: userPassword, ...info } = user._doc;
        return res.status(201).json(info);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.PASSWORD_ENCRYPTION_SECRET);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        if (originalPassword !== password) {
            return res.status(401).json({ message: "Wrong Password" });
        }
        const accessToken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.PASSWORD_ENCRYPTION_SECRET, { expiresIn: "5d" })
        const { password: userPassword, ...info } = user._doc;
        return res.status(200).json({ ...info, accessToken });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})

module.exports = router;