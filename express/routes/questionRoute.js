/**
 * @swagger
 * tags:
 *   name: question
*/


/**
 * @swagger
 * /question:
 *   get:
 *     summary: Get a question message
 *     tags: [question]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json
 *   post:
 *    summary: Create a question message
 *    tags: [question]
 *    requestBody:
 *      description: Sample request body
 *      required: true
 *      content:
 *      schema:
 *        type: object
 *        properties:
 *          content:
 *            type: string
 *            description: The name of the sample
 *          answers:
 *            type: array
 *            description: The answers
 *          correctAnswer:
 *            type: number
 *            description: The correct answer
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            example:
 *              content: 'question message'
 *              answers: ['answer message', 'answer message', 'answer message', 'answer message']
 *              correctAnswer: 1
 *             
 *   put:
 *    summary: update a question message
 *    tags: [question]
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            example:
 *              content: 'question message'
 *              answers: ['answer message', 'answer message', 'answer message', 'answer message']
 *              correctAnswer: 1
 *   delete:
 *    summary: delete a question message
 *    tags: [question]
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json
*/

const Question = require('../../database/models/questions');
const { requireAuth } = require('../../middleware/authMiddleware');

const router = require('express').Router();

router.use(requireAuth)

router.get('/', async (req, res) => {
    try {
        let questions = await Question.find();
        return res.status(200).json(questions);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        let question = await Question.findById(req.params.id);
        return res.status(200).json(question);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.post('/', async (req, res) => {
    try {
        let question = await Question.create(req.body);
        return res.status(200).json(question);
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.put('/:id', async (req, res) => {
    try {
        let question = await Question.findById(req.params.id);
        if (question) {
            question = await Question.updateOne(req.body);
            return res.status(200).json(question);
        }
        return res.status(404).json({ msg: "question not found" });
    } catch (err) {
        res.status(500).json(err);
    }
}
)

router.delete('/:id', async (req, res) => {
    try {
        let question = await Question.findById(req.params.id);
        if (question) {
            question = await Question.deleteOne();
            return res.status(200).json(question);
        }
        return res.status(404).json({ msg: "question not found" });
    } catch (err) {
        res.status(500).json(err);
    }
}
)

module.exports = router;