const express = require("express");
const { from } = require("../database");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  
    const { maxPrice, availableReservations, title, createdAfter, limit } = unpackParams(request); // This step will throw if any params are invalid
    const reservations = await knex('reservation').select('*')

    let result = await knex('meal').select('*')

    if (maxPrice != Number.MAX_VALUE) {
      result = await knex('meal').select('*').where('price', '<', maxPrice)
    }
    if (title.length !== 0) {
      result = result.filter(meal => {
        const text = meal.title.toLowerCase()
        return text.includes(title)})
    }
    if (createdAfter !== new Date(1991, 5, 3)){
      result = result.filter(meal => (meal.created_date > createdAfter))
    }
    if (limit != Number.MAX_VALUE) {
      result = result.orderBy('id', "desc").limit(limit);
    }
    if (availableReservations === 'true') {
       result = result.filter((meal) => {
          const reservationsForMeal = reservations.filter((reservation) => meal.id === reservation.meal_id)
          const totalNumberOfGuests = reservationsForMeal.reduce((acc, reservation) => acc + reservation.number_of_guests, 0);
          return meal.max_reservations > totalNumberOfGuests;
        });
    }
    
    response.json(result)

});




// Few things that are sent in should be bigger than Number.MAX_VALUE, and all strings include the empty string, the date could be some even older value
const defaultParams = {
  maxPrice: Number.MAX_VALUE,
  availableReservations: '',
  title: '',
  createdAfter: new Date(1991, 5, 3),
  limit: Number.MAX_VALUE
};

function unpackParams(request) {
  const sentParams = {};

  if (request.query.maxPrice) {
    const maxPrice = parseInt(request.query.maxPrice);
    if (isNaN(maxPrice) || maxPrice < 1) {
      throw new Error('maxPrice param must be a positive number');
    }
    sentParams['maxPrice'] = maxPrice;
  }

  if (request.query.availableReservations) {
     const availableReservations = request.query.availableReservations.toLowerCase();
    if (availableReservations !== 'false' && availableReservations !== 'true' ) {
      throw new Error('availableReservations param must be a boolean');
    }
    sentParams['availableReservations'] = availableReservations;
  }

  if (request.query.limit) {
    const limit = parseInt(request.query.limit);
    if (isNaN(limit) || limit < 1) {
      throw new Error('limit param must be a positive number');
    }
    sentParams['limit'] = limit;
  }


  if (request.query.createdAfter) {
    const createdAfter = Date.parse(request.query.createdAfter);
    if (isNaN(createdAfter)) {
      throw new Error('createdAfter param must be a valid date in format YYYY-MM-DD');
    }
    sentParams['createdAfter'] = createdAfter;
  }

  if (request.query.title) {
    sentParams['title'] = request.query.title;
  }

  return Object.assign({}, defaultParams, sentParams); // Create a new object, then merge defaultParams into that and then sentParams on top of that which overrides the defaults with whatever params were sent and that are valid
}


router.post("/", async (req, res) => {
  try {
    const result = await knex("meal").insert([{ title: req.body.title, description: req.body.description, location: req.body.location, when: req.body.when, max_reservations: req.body.max_reservations, price: req.body.price, created_date: req.body.created_date }])
    res.json(result);
  } catch (error) {
    console.log(error);
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
      throw new Error('Something went wrong internally');
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
      throw new Error('Something went wrong internally');
    }
  }
})

module.exports = router;