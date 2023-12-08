const Like = require('../../database/models/like');



const router = require('express').Router();

router.get('/article=:id', async (req, res) => {
    try {
        let likes = await Like.find().select({ article: req.params.id });
        return res.status(200).json(likes);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.get('/:id', async (req, res) => {
    try {
        let like = await Like.findById(req.params.id);
        return res.status(200).json(like);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.post('/', async (req, res) => {
    try {
        let like = await Like.create(req.body);
        return res.status(200).json(like);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.put('/:id', async (req, res) => {
    try {
        let like = await Like.findById(req.params.id);
        if (like) {
            like = await Like.updateOne(req.body);
            return res.status(200).json(like);
        }
        return res.status(404).json({ msg: "like not found" });
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.delete('/:id', async (req, res) => {
    try {
        let like = await Like.findById(req.params.id);
        if (like) {
            like = await Like.deleteOne();
            return res.status(200).json(like);
        }
        return res.status(404).json({ msg: "like not found" });
    } catch (err) {
        res.status(500).json(err);
    }
}
)

module.exports = router;
