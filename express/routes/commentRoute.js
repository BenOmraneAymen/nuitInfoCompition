const { requireAuth } = require('../../middleware/authMiddleware');

const router = require('express').Router();

router.use(requireAuth)

router.get('/article=:id', async (req, res) => {
    try {
        let comment = await Comment.find({ article: req.params.id });
        return res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.get('/:id', async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);
        return res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.post('/', async (req, res) => {
    try {
        let comment = await Comment.create(req.body);
        return res.status(200).json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.put('/:id', async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment) {
            comment = await Comment.updateOne(req.body);
            return res.status(200).json(comment);
        }
        return res.status(404).json({ msg: "comment not found" });
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.delete('/:id', async (req, res) => {
    try {
        let comment = await Comment.findById(req.params.id);
        if (comment) {
            comment = await Comment.deleteOne();
            return res.status(200).json(comment);
        }
        return res.status(404).json({ msg: "comment not found" });
    } catch (err) {
        res.status(500).json(err);
    }
}
)

module.exports = router;