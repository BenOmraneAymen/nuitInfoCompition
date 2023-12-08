/**
 * @swagger
 * tags:
 *   name: quizz
 */

/**
 * @swagger
 * /quizz:
 *   get:
 *     summary: Get a quizz message
 *     tags: [quizz]
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json
 *               
 *   post:
 *    summary: Create a quizz message
 *    tags: [quizz]
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            example:
 *              questions: [1,2,3,4,5]
 *   put:
 *    summary: update a quizz message
 *    tags: [quizz]
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json:
 *            example:
 *              questions: [1,2,3,4,5]
 *   delete:
 *    summary: delete a quizz message
 *    tags: [quizz]
 *    responses:
 *      '200':
 *        description: Successful response
 *        content:
 *          application/json
 */


const Quizz = require('../../database/models/quizz');
const { requireAuth } = require('../../middleware/authMiddleware');
const router = require('express').Router();

router.use(requireAuth)

router.get('/', async (req, res) => {
    try{
        let quizz = await Quizz.find();
        return res.status(200).json(quizz);
    }
    catch(err){
        res.status(500).json(err);
    }
})

router.get('/:id', async (req, res) => {
    try{
        let quizz = await Quizz.findById(req.params.id);
        return res.status(200).json(quizz);
    }
    catch(err){
        res.status(500).json(err);
    }
}
)

router.post('/', async (req, res) => {
    try{
        let quizz = await Quizz.create(req.body);
        return res.status(200).json(quizz);
    }
    catch(err){
        res.status(500).json(err);
    }
}
)

router.put('/:id', async (req, res) => {
    try{
        let quizz = await Quizz.findById(req.params.id);
        if(quizz){
            quizz = await Quizz.updateOne(req.body);
            return res.status(200).json(quizz);
        }
        return res.status(404).json({msg: "quizz not found"});
    }
    catch(err){
        res.status(500).json(err);
    }
}
)

router.delete('/:id', async (req, res) => {
    try{
        let quizz = await Quizz.findById(req.params.id);
        if(quizz){
            quizz = await Quizz.deleteOne();
            return res.status(200).json(quizz);
        }
        return res.status(404).json({msg: "quizz not found"});
    }
    catch(err){
        res.status(500).json(err);
    }
}
)
module.exports = router;