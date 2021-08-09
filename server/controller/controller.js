var Userdb = require("../model/model");

// Create and save new user
exports.create = (req, res) => {
  // Validate
  if (!req.body) {
    res.status(404).send({ message: "Content cannot be empty" });
    return null;
  }
  // new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });
  // Save
  user
    .save(user)
    .then(res.redirect("/"))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// retering and return all users || retriving and return a single user
exports.find = (req, res) => {
  if (!req.query.id) {
    Userdb.find()
      .then((users) => res.send(users))
      .catch((err) => res.status(500).send({ message: err.message }));
  } else {
    Userdb.findById(req.query.id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Not Found with that id" });
        } else {
          res.send(data);
        }
      })
      .catch((err) => res.status(500).send({ message: err }));
  }
};

// Update a new identified user by user id
exports.update = (req, res) => {
  // Validate
  if (!req.body) {
    res.status(400).send({ message: "Cannot be empty" });
  }

  const id = req.params.id;

  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${id}.Maybe user not found.`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Delete
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id).then((data) => {
    if (!data) {
      res
        .status(404)
        .send({ message: `Cannot Delete with id ${id}.Maybe id is wrong` });
    } else {
      res.send({ message: `User was deleted successfully` });
    }
  });
};
