const express = require("express");
const bodyParser = require("body-parser");
const User = require("./database/models/User");
const Artwork = require("./database/models/Artwork");
const hbs = require("express-handlebars");

const musashi =
  "https://media.proprofs.com/images/QM/user_images/2169923/1516426900.jpg";

//authorization variables
const session = require("express-session");
const RedisStore = require("connect-redis")(session);
const passport = require("passport");

const Tasks = require("./database/models/Tasks");
const AuthRoutes = require("./routes/auth");

// data vars testing hello
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
app.use(bodyParser.json());

//more middleware for authorization stuff
app.use(
  session({
    store: new RedisStore(),
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

//connects server.js to auth.js through router
app.use("/api", AuthRoutes);

app.engine(
  "hbs",
  hbs({
    defaultLayout: "main",
    extname: "hbs"
  })
);
app.set("view engine", "hbs");

app.use(express.static(__dirname + "/public"));
// app.use(express.static(__dirname + "/photos"));
app.use("/gallery", express.static("public"));
app.use("/api/auth", express.static("public"));

// app.use("/gallery", express.static("/photos"));
// routes
app.get("/api/smoke", (req, res) => {
  res.json({ smoke: "test" });
});

//homepage get request
app.get("/", (req, res) => {
  res.render("login");
});

app.get("/api/users", (req, res) => {
  return new User()
    .fetchAll()
    .then(users => {
      return res.json(users.serialize());
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post("/api/users", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  return new User({ email, password })
    .save()
    .then(user => {
      return res.json({ success: true });
    })
    .catch(err => {
      console.log("hi", err);
      res.sendStatus(500);
    });
});

//Routes for Authrorization
//authorization requests

app.get("/api/users/:user_id", (req, res) => {
  let id = req.params.user_id;
  return new User()
    .where({ id })
    .fetchAll()
    .then(user => {
      console.log(user);
      res.json(user.serialize());
    })
    .catch(err => {
      console.log("hi");
      res.json(err);
    });
});

//create task by user id
// app.post("/api/users/:user_id/tasks/new", (req, res) => {
//   const { user_id } = req.params;
//   const payload = {
//     name: req.body.name
//   };
//   Tasks.forge(payload)
//     .save()
//     .then(result => {
//       res.json(result);
//     })
//     .catch(err => {
//       console.log("error", err);
//       res.json(err);
//     });
// });

//upadate task by task id
// app.put("/api/tasks/:task_id/edit", (req, res) => {
//   const { task_id } = req.params;

//   const payload = {
//     name: req.body.name,
//     is_complete: req.body.is_complete
//   };
//   Tasks.where({ task_id })
//     .fetch()
//     .then(task => {
//       return task.save(payload);
//     })
//     .then(result => {
//       console.log("result", result);
//       res.json(result);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

//delete task by task id
// app.delete("/api/tasks/:task_id/delete", (req, res) => {
//   const { task_id } = req.params;

//   Tasks.where({ task_id })
//     .destroy()
//     .then(result => {
//       res.json(result);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

//ROUTES FOR ALL THE ARTWORK GALLERY
//gets request for all artwork images
app.get("/gallery", (req, res) => {
  return new Artwork()
    .fetchAll()
    .then(data => {
      let artObj = {};
      let array = [];
      // let a = data.models[0]._previousAttributes;
      data.models.forEach(item => {
        // console.log(item._previousAttributes);
        array.push(item._previousAttributes);
      });
      let notFeatured = array.filter(x => {
        return array.indexOf(x) !== 0;
      });
      artObj.featured = array[0];
      artObj.listings = notFeatured;

      console.log(artObj);
      res.render("gallery", artObj);
      // return res.json(artwork);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//loads page with form to post new art
app.get("/gallery/new", (req, res) => {
  console.log("hello");
  res.render("newArt");
});

//loads error posting page
app.get("/gallery/errorPosting", (req, res) => {
  res.render("errorPosting");
});

//

//loads specific art page
app.get("/gallery/:id", (req, res) => {
  let galleryID = req.params.id;
  return new Artwork()
    .where({ id: galleryID })
    .fetch()
    .then(artwork => {
      let artObj = artwork._previousAttributes;
      return res.render("art", artObj);
    });
});

//loads specific art page
// app.get("/gallery/:id", function(req, res) {
//   const galleryID = req.params.id;
//   return new Artwork()
//     .where({ id: galleryID })
//     .fetch()
//     .then(artwork => {
//       return res.json(artwork);
//     });
// });

//loads editing form
app.get("/gallery/:id/edit", (req, res) => {
  let galleryID = req.params.id;
  return new Artwork()
    .where({ id: galleryID })
    .fetch()
    .then(artwork => {
      let artObj = artwork._previousAttributes;
      console.log(artObj);
      return res.render("editArt", artObj);
    });
});

//loads error editing page
app.get("/gallery/:id/edit/error", (req, res) => {
  let galleryID = req.params.id;
  return new Artwork()
    .where({ id: galleryID })
    .fetch()
    .then(artwork => {
      let artObj = artwork._previousAttributes;
      res.render("errorEditing", artObj);
    });
});

//loads delete form page
app.get("/gallery/:id/delete", (req, res) => {
  let galleryID = req.params.id;
  return new Artwork()
    .where({ id: galleryID })
    .fetch()
    .then(artwork => {
      let artObj = artwork._previousAttributes;
      res.render("deleteArt", artObj);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

//allows clients to delete art via browser
// app.post("/gallery/:id/delete", (req, res) => {
//   let id = req.params.id;
//   return new Artwork({ id })
//     .destroy()
//     .then(res.redirect("/gallery"))
//     .catch(err => {
//       console.log(err);
//       res.sendStatus(500);
//     });
// });
//allows clients to add new images to the table via browser
app.post("/gallery", (req, res) => {
  let data = req.body;
  let author = data.author;
  let url = data.url;
  let description = data.description;
  if (author === "" || description === "" || url === "") {
    res.redirect("/gallery/errorPosting");
  } else {
    return new Artwork({ author, url, description })
      .save()
      .then(data => {
        res.redirect("/gallery");
        // res.send("it worked");
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(500);
      });
  }
});

//allows clients to edit art via browser
app.post("/gallery/:id/edit", (req, res) => {
  let newId = req.params.id;
  let data = req.body;
  let newAuthor = data.author;
  let newUrl = data.url;
  let newDescription = data.description;
  if (newAuthor === "" || newUrl === "" || newDescription === "") {
    res.redirect(`/gallery/${newId}/edit/error`);
  } else {
    return new Artwork({
      id: newId,
      author: newAuthor,
      url: newUrl,
      description: newDescription
    })
      .save()
      .then(res.redirect("/gallery"))
      .catch(err => {
        console.log("hi", err);
        res.sendStatus(500);
      });
  }
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
  console.log(data);

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
      console.log("hi", err);
      res.sendStatus(500);
    });
});
// start server
app.listen(PORT, () => {
  console.log(`Server stated on port: ${PORT}`);
});
