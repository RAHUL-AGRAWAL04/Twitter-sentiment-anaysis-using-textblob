const express = require("express");
const ejs = require("ejs");
const fetch = require("node-fetch");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  fetch("http://127.0.0.1:8000/get-sentiment/")
    .then((response) => response.json())
    .then((json) => {
      // console.log(json);
      const data = eval(json); 
      res.render("honeypot", { data: data });
    });
});


app.post("/search", async function (req, res = {}) {
  // event.preventDefault();
  console.log(req.body);
  dta = req.body;
  fetch(`http://localhost:8000/get-tweets/`+dta['topic']+`/`+dta['count'])
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      fetch(`http://localhost:8000/get-sentiment/`)
      .then((response) => response.json())
      .then((json) => {
       console.log(json);
      const data = eval(json);
      res.render("honeypot", { data:data});
    })
    })
    .catch((err) => console.log(err));
});



app.listen(3001,'');
console.log("LISTENING ON PORT 3001....");

