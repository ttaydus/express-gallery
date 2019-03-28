const router = require("express").Router();
const Users = require("../database/models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const Artwork = require("../database/models/Artwork");
passport.serializeUser((user, done) => {
  console.log("serializeUser", user);
  done(null, {
    email: user.email,
    zomg: "randomData"
  });
});

passport.deserializeUser((user, done) => {
  console.log("desrializing User", user);
  Users.where({ email: user.email })
    .fetch()
    .then(user => {
      user = user.toJSON();
      done(null, user);
    })
    .catch(err => {
      console.log("err", err);
    });
});

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    console.log("lcoal is being called");
    Users.where({ email })
      .fetch()
      .then(user => {
        user = user.toJSON();
        // if (user.password === password) {
        //   done(null, user);
        // } else {
        //   done(null, false);
        // }
        bcrypt.compare(password, user.password).then(res => {
          if (res) {
            done(null, user);
          } else {
            done(null, false);
          }
        });
      })
      .catch(err => {
        done(null, false);
      });
  })
);

//hello world
router.get("/auth/register", (req, res) => {
  console.log(req);
  res.render("register");
});

const SALT_ROUNT = 12;
router.post("/auth/register", (req, res) => {
  const { email, password } = req.body;
  console.log("body", req.body);

  bcrypt
    .genSalt(12)
    .then(salt => {
      console.log("salt", salt);
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      console.log("hash", hash);
      return Users.forge({ email, password: hash }).save();
    })
    .then(user => {
      user = user.toJSON();
      res.redirect("/"); //Never send entire user obj to user
      //res.sendStatus(200)
      //res.redirect('/api/auth/secret')
    })
    .catch(err => {
      console.log("err", err);
      res.json(err);
    });
});

router.post(
  "/auth/login",
  passport.authenticate("local", { failureRedirect: "/" }),
  (req, res) => {
    console.log("You Have Succesfully Logged In");
    //grab the user on record
    //compare req.body.password to password on record
    res.redirect("/gallery");
  }
);

router.post("/auth/logout", (req, res) => {
  req.logout();
  console.log("loggingOff");
  res.redirect("/");
});

router.get("/auth/sercret", isAuthenticated, (req, res) => {
  res.send("YOU HAVE FOUND DA SEKRET");
});

//routes for gallery
router.post("/gallery", isAuthenticated, (req, res) => {
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

router.post("/gallery/:id/delete", isAuthenticated, (req, res) => {
  let id = req.params.id;
  return new Artwork({ id })
    .destroy()
    .then(res.redirect("/gallery"))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

function isAuthenticated(req, res, done) {
  if (req.isAuthenticated()) {
    done();
  } else {
    res.redirect("/");
  }
}

module.exports = router;
