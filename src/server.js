import express from "express";
import { people } from "./people";
import bodyParser from "body-parser";
//fs package comes with node and has both sync and async functions. promises is imported to use async functions.
import { promises as fs } from "fs";

//this creates the server which is named as app
let app = express();

/* bodyParser is a plugin that is used with express. It takes the data sent with request
   and puts it in the req object of the post endpoint */
app.use(bodyParser.json());

/*configuring a get request with endpoint /hello. 
  get takes two parameters req (for the request object) and res (for the response object to sent) */
app.get("/hello", (req, res) => {
  res.send("Hello world!");
});

// simple get request to send json response
app.get("/people", (req, res) => {
  res.json(people);
});

// get request with query param
app.get("/people/:name", (req, res) => {
  let { name } = req.params;
  let person = people.find((x) => x.name === name);
  res.json(person);
});

// get request to read data from file
app.get("/file-data", async (req, res) => {
  let data = await fs.readFile(__dirname + "/people-data.json");
  //__dirname is a predefined constant in JS whose value is the abs path of the currently executing file, server.js in this context
  let people = JSON.parse(data);

  res.json(people);
});

// post request to add new person to people array
app.post("/people", (req, res) => {
  let newPerson = req.body;
  people.push(newPerson);
  res.json(people);
});

//this runs the server on port 3000
app.listen(3000, () => {
  console.log("Server is listening on port 3000.");
});
