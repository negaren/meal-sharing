const express = require("express");
const { limit } = require("../database");
const router = express.Router();
const knex = require("../database");

router.get('/', async (req, res) => {
    try {
        const allReviews = await knex('review').select('*');
        res.json(allReviews);
    } catch (error) {
        throw error
    }
});

router.post('/', async (req, res) => {
    try {
        const result = await knex('review').insert([{ title: req.body.title, meal_id: req.body.meal_id, created_date: req.body.created_date, description: req.body.description, stars : req.body.stars}]);
        res.json(result);
    } catch (error) {
        throw error;
    }
});

router.get('/:id', async (req, res) => {
    try {
        if (isNaN(Number(req.params.id))) {
            res.status(404).end();
        }
        const result = await knex('review').select('*').where('id', Number(req.params.id));
        res.json(result);
    } catch (error) {
        throw error
    }
});

router.put('/:id', async (req, res) => {
    try {
        if (isNaN(Number(req.params.id))) {
            res.status(404).end();
    }
    else {
        const result = await knex('review').where('id', req.params.id).update('title', req.body.title);
        res.json(result);
    } 
 } catch (error) {
        throw error;
    }
});

router.delete('/:id', async (req, res) => {
    try {
        if (isNaN(Number(req.params.id))) {
            res.status(404).end();
        }
        else {
            const result = await knex('review').where('id', Number(req.params.id)).delete();
            res.json(result);
        }
    } catch (error) {
        throw error;
    }
});

module.exports = router;