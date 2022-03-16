const express = require("express");
const { limit } = require("../database");
const router = express.Router();
const knex = require("../database");


// Few things that are sent in should be bigger than Number.MAX_VALUE, and all strings include the empty string, the date could be some even older value
// const defaultParams = {
//   maxPrice: Number.MAX_VALUE,
//   availableReservations: Number.MAX_VALUE,
//   title: '',
//   createdAfter: new Date(1991, 5, 3),
//   limit: Number.MAX_VALUE
// };

// function unpackParams(request) {
//   const sentParams = {};

//   if (request.query.maxPrice) {
//     const maxPrice = parseInt(request.query.maxPrice);
//     if (isNaN(maxPrice) || maxPrice < 1) {
//       throw new Error('maxPrice param must be a positive number');
//     }
//     sentParams['maxPrice'] = maxPrice;
//   }

//   if (request.query.availableReservations) {
//     const availableReservations = parseInt(request.query.availableReservations);
//     if (isNaN(availableReservations) || availableReservations < 1) {
//       throw new Error('availableReservations param must be a positive number');
//     }
//     sentParams['availableReservations'] = availableReservations;
//   }

//   if (request.query.limit) {
//     const limit = parseInt(request.query.limit);
//     if (isNaN(limit) || limit < 1) {
//       throw new Error('limit param must be a positive number');
//     }
//     sentParams['limit'] = limit;
//   }


//   if (request.query.createdAfter) {
//     const createdAfter = Date.parse(request.query.createdAfter);
//     if (isNaN(createdAfter)) {
//       throw new Error('createdAfter param must be a valid date in format YYYY-MM-DD');
//     }
//     sentParams['createdAfter'] = createdAfter;
//   }

//   if (request.query.title) {
//     sentParams['title'] = title;
//     console.log(sentParams['title']);
//   }

//   return Object.assign({}, defaultParams, sentParams); // Create a new object, then merge defaultParams into that and then sentParams on top of that which overrides the defaults with whatever params were sent and that are valid
// }

// router.get("/", async (request, response) => {
//   try {
//     const { maxPrice, availableReservations, title, createdAfter, limit } = unpackParams(request); // This step will throw if any params are invalid

//     const meals = await knex('meal').select('*');
//     const reservations = await knex('reservation').select('*');

//     const mealsBelowMaxPrice = meals.filter((meal) => meal.price < maxPrice);

//     const mealsBigEnoughForGroup = mealsBelowMaxPrice.filter((meal) => {
//       const reservationsForMeal = reservations.filter((reservation) => meal.id === reservation.meal_id)
//       const totalNumberOfGuests = reservationsForMeal.reduce((acc, reservation) => acc + reservation.number_of_guests, 0);
//       return meal.max_reservations > totalNumberOfGuests;
//     });

//     const mealsForSearch = mealsBigEnoughForGroup.filter((meal) => meal.title.includes(title)); // You could do this in Knex also

//     const newMeals = mealsForSearch.filter((meal) => meal.created_date > createdAfter); // You could do this in Knex also

//     const topMeals = newMeals.slice(0, limit);

//     response.json(topMeals);
//   } catch (error) {
//     console.log(error);
//     response.status(500).send('Internal server error');
//   }
// });


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
        throw new Error('Something went wrong internally');
        //res.status(500).send('Internal server error')
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
      throw new Error('Something went wrong internally');
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
      throw new Error('Something went wrong internally');
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
