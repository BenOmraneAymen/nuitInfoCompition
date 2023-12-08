const router = require('express').Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('../../database/models/user');
const template = require('../../emailTemplate/template');

dotenv.config();

//signin

router.post('/register', async (req, res) => {
    try {
        const existingUser = await User.find({ email: req.body.email })
        if (existingUser.length > 0) {
            return res.status(400).json("email already used");
        }
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

//login

router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json("Wrong credentials");
        }
        const validated = await user.matchPassword(req.body.password);
        if (!validated) {
            return res.status(400).json("Wrong credentials p");
        }
        let accessToken = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: '3h',
        })
        return res.status(200).send({ user, token: accessToken });
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

//change password

router.put('/', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).json("User not found");
        }
        console.log(req.body.previousPassword)
        if(!await user.matchPassword(req.body.previousPassword)){
            return res.status(400).json("Wrong password");
        }
        const updatedUser = await User.findOneAndUpdate({ email: user.email }, { password: req.body.newPassword });
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});

//forgot password send email

router.put('/forgotPassword/', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json("User not found");
        }
        let transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE,
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_HOST_USER, // email
                pass: process.env.EMAIL_HOST_PASSWORD, //app password
            },
        });

        let password = Math.random().toString(36).slice(-8);
        let info = transporter.sendMail({
            from: process.env.EMAIL_HOST_USER,
            to: user.email,
            subject: "reinitializing password",
            //text: `New password: ${password}`,
            html: template(password),
        }, async (error, info) => {
            if (error) {
                console.log('Erroe Occured ' + error);
            } else {
                const updatedUser = await User.findByIdAndUpdate(user.id, { password });
                res.status(200).json(updatedUser);
            }
            return res.end();
        })
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all users

router.get('/:param', async (req, res) => {
    try {
        if (req.params.param === 'all') {
            const users = await User.find();
            users.forEach(user => {
                user.password = null
            })
            res.status(200).json(users);
            return
        } else {
            const users = await User.find({ username: { $regex: req.params.param, $options: 'i' } });
            users.forEach(user => {
                user.password = null
            })
            res.status(200).json(users);
            return
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

//get users by type

router.get('/type/:role', async (req, res) => {
    try {
        const users = await User.find({ role: req.params.role });
        users.forEach(user => {
            user.password = null
        })
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
})

//get one user by email

router.get('/email/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        user.password = null
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get one user by id

router.get('/id/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.password = null
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/verify', async (req, res) => {
    try {
        let token = req.body.token;
        let decoded = jwt.verify(token, process.env.SECRET_KEY);
        let user = await User.findById(decoded.id);
        user.password = null
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
});

router.delete('/:id', async (req, res) => {
    try {
        let oldUser = await User.findById(req.params.id);
        if (!oldUser) {
            return res.status(400).json("user not found");
        }
        oldUser.deleteOne();
        res.status(200).json("user deleted successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});


router.put('/:id', async (req, res) => {
    try {
        let oldUser = await User.findById(req.params.id);
        if (!oldUser) {
            return res.status(400).json("user not found");
        }
        await oldUser.updateOne(req.body);
        res.status(200).json("user updated successfully");
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
})

router.put('/suspend/:id',async (req, res) => {
    try {
        let oldUser = await User.findById(req.params.id);
        if (!oldUser) {
            return res.status(400).json("User not found");
        }
        if (oldUser.suspended) {
            await oldUser.updateOne({ suspended: false });
            res.status(200).json("utulisateur activé avec succès")
        } else {
            await oldUser.updateOne({ suspended: true });
            res.status(200).json("utulisateur suspendu avec succès")
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(err)
    }
})

module.exports = router;