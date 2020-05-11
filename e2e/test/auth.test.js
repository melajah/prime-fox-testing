// jadi membuat sebuat auth: register dan login
// harapan register: ketika dia success register harapannya mengembalikan json dalam object dan juga status Code 201
// register: ketika memasukkan email duplicate dia bakal mengembalikkan json dalam bentuk object dan status code 400

const request = require("supertest")
const app = require("../app");

const { sequelize } = require("../models")
const { queryInterface } = sequelize

afterAll((done) => {
  console.log("biasanya dsni melakukan penghapusan seluruh data")
  queryInterface
    .bulkDelete('Users', null, {})
    .then(() => {
      done()
    })
    .catch(err=> {
      done(err)
    })
})

describe("/auth", function () {
  
  describe("/auth/register", function () {
    // test success: "masukkan sesuatu yang valid"

   const formUser = {
      name: "raka",
      email: "raka@mail.com",
      password: "12345"
    }

    it("should create a new user with send object. ( code: 201 )", function (done) {
      request(app)
        .post("/auth/register")
        .send(formUser)
        .then(response => {
          // response.body
          // response.status
          const { body, status } = response
          expect(status).toEqual(201)
          // {
          //   name: "raka",
          //   email: "raka@mail.com",
          // }
          expect(body).toHaveProperty("name", formUser.name)
          expect(body).toHaveProperty("email", formUser.email)
          done()
        })
        .catch(err => {
          done(err)
        })
    })

    // test failed: "email duplicate"

    it("duplicate email. should send errors. (code: 400)", function (done) {
      request(app)
        .post("/auth/register")
        .send(formUser)
        .then(response => {
          const { body, status } = response
          // {
          //   errors: ["email has beed used"]
          // }
          //  ["email has beed used"]
          const errors = ["email has beed used"]
          expect(status).toBe(400)
          expect(body).toHaveProperty("errors")
          expect(body.errors).toEqual(expect.arrayContaining(errors))
          // ["email has beed used"] === ["email has beed used"]
          done()
        })
        .catch(err => {
          done(err)
        })
    })

  })

})