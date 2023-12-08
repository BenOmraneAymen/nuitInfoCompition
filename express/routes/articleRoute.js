/**
 * @swagger
 * tags:
 *   name: Article
 */

/**
 * @swagger
 * /Article:
 *   get:
 *     summary: Get a Article message
 *     tags: [Article]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json
 *   post:
 *    summary: Create a Article message
 *    tags: [Article]
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            example:
 *              title: 'title'
 *              content: 'Article message'
 *              likes: []
 *              comments: []
 *              author: ''
 *              
 *   put:
 *    summary: update a Article message
 *    tags: [Article]
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            example:
 *              title: 'title'
 *              content: 'Article message'
 *              likes: []
 *              comments: []
 *              author: ''
 *   delete:
 *    summary: delete a Article message
 *    tags: [Article]
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json
 */


const Article = require('../../database/models/article');
const { requireAuth } = require('../../middleware/authMiddleware');

const router = require('express').Router();

router.use(requireAuth)

router.get('/', async (req, res) => {
    try {
       const article = await Article.find();
       return res.status(200).json(article);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
         let article = await Article.findById(req.params.id);
            return res.status(200).json(article);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.post('/', async (req, res) => {
    try {
        let article = await Article.create(req.body);
        return res.status(200).json(article);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

router.put('/:id', async (req, res) => {
    try {
        let article = await Article.findById(req.params.id);
        if (article) {
            article = await Article.updateOne(req.body);
            return res.status(200).json(article);
        }
        return res.status(404).json({ msg: "Article not found" });
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let article = await Article.findById(req.params.id);
        if (article) {
            article = await Article.deleteOne();
            return res.status(200).json(article);
        }
        return res.status(404).json({ msg: "Article not found" });
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;