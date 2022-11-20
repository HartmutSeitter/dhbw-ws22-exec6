const express = require("express");
const app = express();
var session = require("express-session");

app.use(session({secret:"abcdefghijkl", resave:false,saveUninitialized:true}));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use("/api/tickets", require("./routes/api/tickets"));

app.listen(3001, () => console.log('Server started'));

