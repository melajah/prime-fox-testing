const { User } = require("../models");

class UserController {

  static register(req, res, next) {
    const form = req.body
    User
      .create({
        name: form.name,
        email: form.email,
        password: form.password
      })
      .then(user => {
        res.status(201).json({
          name: user.name,
          email: user.email
        })
      })
      .catch(err => {
        if (err.name === "SequelizeUniqueConstraintError") {
          res.status(400).json({
            errors: ["email has beed used"]
          })
        }else{
          res.status(500).json({
            msg: ["internal server error"]
          })
        }
      })
  }

}

module.exports = UserController