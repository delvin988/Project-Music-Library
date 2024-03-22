const { Favourite, User, Order } = require("../models");
const { signToken } = require("../helper/jwt");
const request = require("supertest");
const app = require("../app");
const { describe } = require("node:test");

let access_token

beforeAll(async () => {
    const user = await User.create({
       username: "delvin",
       email: "delvinn@gmail.com",
       password: "delvin",
       role: "Premium"
    });
    access_token = signToken({ id: user.id, role: user.role, email: user.email });

    await Favourite.bulkCreate([
        {
           artistName: "abcdef",
           genres: "asihdbasdhb",
           imgUrl: "jakarta",
           album: "asdasdgmail.com",
           title: "asdasdasd",
           preview: "asdasdasd",
           lyric: "hjwbefwjhebfwe",
        },
        {
           artistName: "abcsdef",
           genres: "bkfjgnbfjgb",
           imgUrl: "jakarta",
           album: "asdasssdgmail.com",
           title: "mmmmmm",
           preview: "asdasdasd",
           lyric: "asdasdjndbfgjb",
        },
     ]);
})

describe("POST /login", () => {
    test("should return access token on successful login", async () => {
       const response = await request(app).post("/login").send({
          email: "delvinn@gmail.com",
          password: "delvin",
       });
 
       expect(response.status).toBe(200);
 
       access_token = response.body.access_token;
       expect(response.body).toHaveProperty("access_token");
    });
 
    test("should return status 400 and message Email is required on empty email", async () => {
       const response = await request(app).post("/login").send({
          email: "",
          password: "delvin",
       });
 
       expect(response.status).toBe(400);
       expect(response.body).toHaveProperty("message", "Email is required");
    });
    test("should return status 400 and message Password is required on empty password", async () => {
       const response = await request(app).post("/login").send({
          email: "delvin@gmail.com",
          password: "",
       });
 
       expect(response.status).toBe(400);
       expect(response.body).toHaveProperty("message", "Password is required");
    });
 
    test("should return status 401 and message error invalid username or email or password on wrong email", async () => {
       const response = await request(app).post("/login").send({
          email: "invalidEmail@gmail.com",
          password: "delvin",
       });
 
       expect(response.status).toBe(401);
       expect(response.body).toHaveProperty("message", "error invalid username or email or password");
    });
 
    test("should return status 401 and message error invalid username or email or password on wrong password", async () => {
       const response = await request(app).post("/login").send({
          email: "delvin@gmail.com",
          password: "invalidPassword",
       });
 
       expect(response.status).toBe(401);
       expect(response.body).toHaveProperty("message", "error invalid username or email or password");
    });
 });

describe("POST /register", () => {

   test("should return status 400 and message email is required if email is not entered", async () => {
      const response = await request(app).post("/register").set("Authorization", `Bearer ${access_token}`).send({
         username: "newuser",
         password: "newpassword",
         role: "Member",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email is required");
   });

   test("should return status 400 and message password is required if password is not entered", async () => {
      const response = await request(app).post("/register").set("Authorization", `Bearer ${access_token}`).send({
         username: "newuser",
         email: "newuser@example.com",
         role: "Member",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "password is required");
   });

   test("should return status 400 and message email is required on empty email", async () => {
      const response = await request(app).post("/register").set("Authorization", `Bearer ${access_token}`).send({
         username: "newuser",
         email: "",
         password: "newpassword",
         role: "Member",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Email is required");
   });

   test("should return status 400 and message password is required on empty password", async () => {
      const response = await request(app).post("/register").set("Authorization", `Bearer ${access_token}`).send({
         username: "newuser",
         email: "newuser@example.com",
         password: "",
         role: "Member",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "password is required");
   });

   test("should return status 400 and message Invalid email format if email have a wrong format", async () => {
      const response = await request(app).post("/register").set("Authorization", `Bearer ${access_token}`).send({
         username: "newuser",
         email: "newuser@example.com//",
         password: "sacascasc",
         role: "Member",
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("message", "Invalid email format");
   });
});

describe("GET /favourite", () => {
   test("should response list of favourite", async () => {
      const response = await request(app).get("/favourite").set("Authorization", `Bearer ${access_token}`);

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body[0]).toHaveProperty("id", expect.any(Number));
      expect(response.body[0]).toHaveProperty("artistName", expect.any(String));
      expect(response.body[0]).toHaveProperty("genres", expect.any(String));
      expect(response.body[0]).toHaveProperty("imgUrl", expect.any(String));
      expect(response.body[0]).toHaveProperty("album", expect.any(String));
      expect(response.body[0]).toHaveProperty("title", expect.any(String));
      expect(response.body[0]).toHaveProperty("preview", expect.any(String));
      expect(response.body[0].User).toHaveProperty("UserId", expect.any(Number));
   });

   test("should return status 401 and message Invalid Token if the user has not logged in", async () => {
      const response = await request(app).get("/favourite");

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid Token");
   });

   test("should return status 401 and message Invalid Token if the token is invalid ", async () => {
      const response = await request(app).get("/favourite").set("Authorization", `Bearer invalidToken`);

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty("message", "Invalid Token");
   });
});


 afterAll(async () => {
   await User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
   });

   await Favourite.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
   });
});