const express = require("express");
const app = express();
const { adminAuth } = require("./middlewares/auth");

// app.use((req, res) =>{
//     res.send("Hello Welcome, to BuzzCabs");
// });

// work for /ac, /abc due to ? sign. Here b is optional
// app.get("/ab?c", (req, res) =>{
//     res.send({firstname: "Chandan Kumar", lastname: "Kumar"});
// });

// // work for /abc, /abbc, /abbb...c due to + sign
// app.get("/ab+c", (req, res) =>{
//     res.send({firstname: "Chandan Kumar", lastname: "Kumar"});
// });

// // work for /abcd and ab....cd it will work due to * sign
// app.get("/ab*c", (req, res) =>{
//     res.send({firstname: "Chandan Kumar", lastname: "Kumar"});
// });

// // anything that will end with fly it will work
// app.get("/.*fly$/", (req, res) =>{
//     res.send({firstname: "Chandan Kumar", lastname: "Kumar"});
// });

// app.get("/user/:userId", (req, res) =>{
//     console.log(req.params);
//     res.send({firstname: "Chandan Kumar", lastname: "Kumar"});
// });

// app.use(
//   "/user",
//   (req, res, next) => {
//     console.log("Handling the route user 1")
//     // res.send("Response 1!!");
//     // here using next argumnents we can redirect the res to the next res if first res is not cathed
//     next();
//   },
//   (req, res, next) => {
//     console.log("Handling the route user 2")
//     // res.send("Response 2!!");
//     next();
//   }
// );

// Handle Auth Middleware for all requests like GET, POST, DELETE....
// app.use("/admin", adminAuth);

// app.get("/admin/getAllData", (req, res) => {
//   res.send({ firstname: "Chandan Kumar", lastname: "Kumar" });
// });

// app.get("/admin/deleteUser", (req, res) => {
//   res.send("user deleted!!");
// });

// Here /user work but admin auth is not get checked and show the user data not the admin data
app.get("/user", (req, res) => {
  throw new Error("dddghsnsk");
  res.send({ firstname: "Chandan Kumar", lastname: "Kumar" });
});

// error handling and always use this in the last 
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
