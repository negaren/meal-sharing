const express = require("express");
const { limit, where } = require("../database");
const router = express.Router();
const knex = require("../database");

router.get('/', async (req, res) => {
    try {
        const reservation = await knex('reservation').select('*');
        res.json(reservation);
    } catch (error) {
        throw error
    }

});

router.post('/', async (req, res) => {
    try {
        const result = await knex('reservation').insert([{ number_of_guests: req.body.number_of_guests, meal_id: req.body.meal_id, created_date: req.body.created_date, contact_phonenumber: req.body.phonenumber, contact_name: req.body.name, contact_email: req.body.email }]);
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
        const reservation = await knex('reservation').select('*').where('id', Number(req.params.id));
        res.json(reservation);
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
            const result = await knex('reservation').where('id', req.params.id).update('contact_name', req.body.name);
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
            const result = await knex('reservation').where('id', Number(req.params.id)).delete();
            res.json(result);
        }
    } catch (error) {
        throw error;
    }
});

module.exports = router;