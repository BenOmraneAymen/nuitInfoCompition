/**
 * @swagger
 * tags:
 *   name: Tip
 */

/**
 * @swagger
 * /Tip:
 *   get:
 *     summary: Get a Tip message
 *     tags: [Tip]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               content: 'Tip message'
 *   post:
 *    summary: Create a Tip message
 *    tags: [Tip]
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            example:
 *              content: 'Tip message'
 *   put:
 *    summary: update a Tip message
 *    tags: [Tip]
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            example:
 *              content: 'Tip message'
 *   delete:
 *    summary: delete a Tip message
 *    tags: [Tip]
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            example:
 *              content: 'Tip message'
 */

const Tip = require('../../database/models/tips');
const { requireAuth } = require('../../middleware/authMiddleware');

const router = require('express').Router();

router.use(requireAuth)

router.get('/', async (req, res) => {
    try {
        let tips = await Tip.find();
        return res.status(200).json(tips);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
}
)

router.get('/:id', async (req, res) => {
    try {
        let tip = await Tip.findById(req.params.id);
        return res.status(200).json(tip);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.post('/', async (req, res) => {
    try {
        let tip = await Tip.create(req.body);
        return res.status(200).json(tip);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.put('/:id', async (req, res) => {
    try {
        let tip = await Tip.findById(req.params.id);
        if (tip) {
            tip = await Tip.updateOne(req.body);
            return res.status(200).json(tip);
        }
        return res.status(404).json({ msg: "tip not found" });
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.delete('/:id', async (req, res) => {
    try {
        let tip = await Tip.findById(req.params.id);
        if (tip) {
            tip = await Tip.deleteOne();
            return res.status(200).json(tip);
        }
        return res.status(404).json({ msg: "tip not found" });
    } catch (err) {
        res.status(500).json(err);
    }
}
)

module.exports = router;