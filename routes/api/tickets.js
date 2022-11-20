const { application } = require("express");
const express = require("express");
const router = express.Router();


//const uuid = require("uuid");
// can be used to generte a unique number - this sample works only with integer numbers

let tickets = require("../../Tickets");

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
 function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    );
}

router.get("/", (req, res) => {
  //return res.status(200).send("logged in");
  res.json(tickets);
});
 
router.get("/:id", (req, res) => {
  console.log(req);
  const found = tickets.some(ticket => tickets.id === parseInt(req.params.id));
  if (found) {
    res.json(tickets.filter(ticket => tickets.id === parseInt(req.params.id)));
  } else {
    res.sendStatus(400);
  }
});

router.post("/", (req, res) => {
  const newTicket = {
    id: between(10,100000),
    //id: uuid.v4()
      id: id,
      tickettitle: req.body.tickettitle,
      location: req.body.location,
      category: req.body.category,
      price: req.body.price,
      sellerid: req.body.sellerid
  };

  tickets.push(newTicket);
  res.json(tickets);
});

//Update ticket

//......

//Delete ticket

//....

module.exports = router;