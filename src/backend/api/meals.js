const express = require("express");
const { limit } = require("../database");
const router = express.Router();
const knex = require("../database");


router.get("/", async (request, response) => {
  if ('maxPrice' in request.query && request.query.length == 1) {
    if (isNaN(Number(request.query.maxPrice))) {
      response.send(404);
    }
    else {
      try {
        const meals = await knex('meal').select('*');
        const mealsWithMaxPrice = meals.filter(meal => Number(meal.price) < Number(request.query.maxPrice))
        response.json(mealsWithMaxPrice);
      } catch (error) {
        throw error
      }
    }
  }
  else if ('availableReservations' in request.query) {
    if (request.query.availableReservations) {
      const meals = await knex('meal').select('*');
      const reservations = await knex('reservation').select('*');
      let totalNumberOfGuests = 0;
      let availableResMeals = [];
      meals.forEach(meal => {
        reservations.forEach(reservation => {
          if (meal.id == reservation.meal_id) {
            totalNumberOfGuests += reservation.number_of_guests;
          }
        })
        if (meal.max_reservations > totalNumberOfGuests) {
          availableResMeals.push(meal);
        }
      })
      response.json(availableResMeals);
    }
  }
  else if ('title' in request.query) {
    try {
       const titleArr = request.query.title.split(' ');
       let result = [];
       // titleArr.forEach(async searchTitle => 
          for (let searchTitle of titleArr){
          result = await knex('meal').select('*').where(`title`, 'like', `%${searchTitle}%`);
          if (result.length !== 0) {
            response.json(result);
            break;
          }
        }
    } catch (error) {
      throw error;
    }
  }
  else if ('createdAfter' in request.query) {
    const toDateFormat = Date.parse(request.query.createdAfter);
    if (isNaN(toDateFormat)) {
      response.status(400).end();
    }
    else {
      
      var convertedStartDate = new Date(request.query.createdAfter);
      const result = await knex('meal').where('created_date', '>', convertedStartDate);
      response.json(result);
    }
  }
  else if ('limit' in request.query && request.query.length == 1) {
    if (isNaN(Number(request.query.limit))) {
      response.status(400).end();
    }
    else {
      const result = await knex ('meal').select('*').orderBy('id', "desc").limit(request.query.limit);
      response.json(result);
    }
  }
  else if ('limit' in request.query && 'maxPrice' in request.query) {
    if (isNaN(Number(request.query.maxPrice)) || isNaN(Number(request.query.limit))) {
      response.status(400).end();
    } else {
      const result = await knex('meal').select('*').where('price', '<', Number(request.query.maxPrice));
      console.log('HI');
      response.json(result);
    }
  }
  else {
    try {
      // knex syntax for selecting things. Look up the documentation for knex for further info
      const titles = await knex("meal").select("*");
      response.json(titles);
    } catch (error) {
      throw error;
    }
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await knex("meal").insert([{ title: req.body.title, description: req.body.description, location: req.body.location, when: req.body.when, max_reservations: req.body.max_reservations, price: req.body.price, created_date: req.body.created_date }])
    res.json(result);
  } catch (error) {
    throw error
  }
});

router.get("/:id", async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    res.send(404);
  }
  else {
    try {
      const result = await knex("meal").select('*').where('id', Number(req.params.id));
      res.send(result);
    } catch (error) {
      throw error;
    }
  }
});

router.put("/:id", async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    res.send(404);
  }
  else {
    try {
      const result = await knex("meal").where({ id: Number(req.params.id) }).update({ title: req.body.title });
      res.json(result);
    } catch (error) {
      throw error;
    }
  }
});

router.delete("/:id", async (req, res) => {
  if (isNaN(Number(req.params.id))) {
    res.send(404);
  }
  else {
    try {
      const result = await knex("meal").where({ id: Number(req.params.id) }).delete();
      res.json(result);
    } catch (error) {
      throw error;
    }
  }
})



module.exports = router;
