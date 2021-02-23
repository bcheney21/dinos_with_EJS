const router = require('express').Router()
const db = require('../models')

// Index (Read All) Route
router.get('/', async (req, res) => {
    try {
        const creatures = await db.creature.findAll({ raw: true })
        // console.log(dinos)
        // res.send()
        res.render('creatures/index', { creatures })
    } catch (err) {
        console.log(err)
    }
})


// New Dino Form Route
router.get('/new', (req, res) => {
    res.render("creatures/new")
})



// Show (Show One) Route
router.get('/:id', async (req, res) => {
    try {
        const creature = await db.creature.findByPk(req.params.id, { raw: true })
        console.log(creature);
        res.render('creatures/show', { creature })
    } catch (err) {
        console.log(err)
    }
})

// Create Route
router.post('/', async(req, res) => {
    try {
        // console.log(req.body);
        const newCreature = await db.creature.create({
            name: req.body.name,
            type: req.body.type
        })
        res.redirect(`/creatures/${newCreature.id}`);
    } catch(err) {
        console.log(err)
    }
})

// Update route
router.put('/:id', async (req, res) => {
    try {
        const creature = await db.creature.findByPk(req.params.id)
        const updatedCreature = await create.update({
            name: req.body.name,
            type: req.body.type
        })
        res.redirect(`/creatures/${req.params.id}`)
    } catch (err) {
        console.log(err)
    }
})

// Delete route
router.delete('/:id', async (req, res) => {
    try {
        const creature = await db.creature.findByPk(req.params.id)
        const deletedCreature = await creature.destroy();
        res.redirect('/creatures');
    } catch (err) {
        console.log(err)
    }
})

module.exports = router