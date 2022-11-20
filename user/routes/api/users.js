const { application } = require("express");
const express = require("express");
const router = express.Router();

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://mqtt:1883');


//const uuid = require("uuid");
// can be used to generte a unique number - this sample works only with integer numbers

let users = require("../../Users");

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
 function between(min, max) {  
    return Math.floor(
      Math.random() * (max - min) + min
    );
}
router.get('/ticketsystem', (req, res) =>  {
  if(!req.session.user) {
    return res.status(401).send();
  } 
  return res.status(200).send("logged in");
})

router.get("/", (req, res) => {
  res.json(users);
});
 
router.get("/:id", (req, res) => {
  console.log(req);
  const found = users.some(user => user.id === parseInt(req.params.id));
  if (found) {
    res.json(users.filter(user => user.id === parseInt(req.params.id)));
  } else {
    res.sendStatus(400);
  }
});

router.post("/", (req, res) => {
  const newUser = {
    id: between(10,100000),
    //id: uuid.v4()
    userid: req.body.userid,
    name: req.body.name,
    vorname: req.body.vorname,
    street: req.body.street,
    no: req.body.no,
    city: req.body.city,
    email: req.body.email,
    password: req.body.password
  };
  
  if (!newUser.name || !newUser.email) {
    return res.sendStatus(400);
  }
  users.push(newUser);
  res.json(users);
  
  client.publish('user/UserCreated',  JSON.stringify(newUser));


});

//Update User

router.put("/:id", (req, res) => {

  const found = users.some(user => user.id === parseInt(req.params.id));
  if (found) {
    console.log("user found");
    const updateUser = req.body;
    users.forEach(user => {
      if (user.id === parseInt(req.params.id)) {
        user.name = updateUser.name ? updateUser.name : user.name;
        user.email = updateUser.email ? updateUser.email : user.email;
        res.json({ msg: "User updated", user });
        client.publish('user/UserUpdated',  JSON.stringify(users));
      }
    });

  } else {
    res.sendStatus(400);
  }
}); 

//Delete User

router.delete("/:id", (req, res) => {
  
  const found = users.some(user => user.id === parseInt(req.params.id))
  if (found) {
    users = users.filter(user => user.id !== parseInt(req.params.id))
    client.publish('user/UserDeleted',  JSON.stringify(users));
    console.log('user deleted');
    res.sendStatus(200);
  }

});
/************************************************************/
/* handle log in
/************************************************************/
router.post('/login', (req,res) => {
  var userid = req.body.userid;
  var password = req.body.password;

  const found = users.find((user => user.userid === userid) && (user => user.password === password));

    if(!found) {
      console.log('no such userid/password');
      return res.status(404).send();
    }
    req.session.user = users;
    return res.status(200).send('userid and password defined');
});

module.exports = router;