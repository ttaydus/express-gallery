const express = require("express");
const bodyParser = require("body-parser");
const User = require("./database/models/User");
const Artwork = require("./database/models/Artwork");
const hbs = require('express-handlebars');

// data vars
const PORT = process.env.PORT;
const SESSION_SECRET = process.env.SESSION_SECRET;
const REDIS_HOSTNAME = process.env.REDIS_HOSTNAME;

if (!PORT) {
  console.log("No Port Found");
}
if (!SESSION_SECRET) {
  console.log("No Session Secret Found");
}
if (!REDIS_HOSTNAME) {
  console.log("No Redis Hostname Found");
}
if (!PORT || !SESSION_SECRET || !REDIS_HOSTNAME) {
  return process.exit(1);
}

// setup server middleware
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.engine('hbs', hbs({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');

// routes
app.get("/api/smoke", (req, res) => {
  res.json({ smoke: "test" });
});

app.get("/api/users", (req, res) => {
  return new User()
    .fetchAll()
    .then(users => {
      return res.json(users);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post("/api/users", (req, res) => {
  const username = req.body.username;
  return new User({ username })
    .save()
    .then(user => {
      return res.json({ success: true });
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//ROUTES FOR ALL THE ARTWORK GALLERY
//gets request for all artwork images
app.get("/gallery", (req, res) => {
  return new Artwork()
    .fetchAll()
    .then(artwork => {
      return res.json(artwork);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.get("/:id", function(req, res) {
  const galleryID = req.params.id;
  return new Artwork()
    .where({ id: galleryID })
    .fetch()
    .then(artwork => {
      return res.json(artwork);
    });
});

//allows clients to add new images to the table via postman
app.post("/gallery", (req, res) => {
  let data = req.body;
  let author = data.author;
  let url = data.url;
  let description = data.description;
  return new Artwork({ author, url, description })
    .save()
    .then(data => {
      res.send("it worked");
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//allows clients to delete images via postman
app.delete("/gallery/:id", (req, res) => {
  let id = req.params.id;
  return new Artwork({ id })
    .destroy()
    .then(data => {
      res.send("You have deleted image ID " + id);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//allows clients to edit via postman
app.put("/gallery/:id", (req, res) => {
  let newId = req.params.id;
  let data = req.body;
  let newAuthor = data.author;
  let newUrl = data.url;
  let newDescription = data.description;
  return new Artwork({
    id: newId,
    author: newAuthor,
    url: newUrl,
    description: newDescription
  })
    .save(null, { method: "update" })
    .then(data => {
      res.send("You have updated image ID " + newId);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});
// start server
app.listen(PORT, () => {
  console.log(`Server stated on port: ${PORT}`);
});
