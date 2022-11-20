const { application } = require("express");
const express = require("express");
const router = express.Router();


//const uuid = require("uuid");
// can be used to generte a unique number - this sample works only with integer numbers

let orders = require("../../Orders");


/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
 function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    );
}

router.get("/", (req, res) => {
  res.json(orders);
});
 
router.get("/:id", (req, res) => {
  console.log(req);
  const found = orders.some(ticket => orders.id === parseInt(req.params.id));
  if (found) {
    res.json(orders.filter(ticket => orders.id === parseInt(req.params.id)));
  } else {
    res.sendStatus(400);
  }
});

router.post("/", (req, res) => {
  const newOrder = {
    id: between(10,100000),
    //id: uuid.v4()
      id: id,
      status: 'ordercreate',
      ticketid: 1,
      expires: 15,
      buyerid: 0
  };

  orders.push(newOrder);
  res.json(tickets);
});

//Update ticket

//......

//Delete ticket

//....

module.exports = router;