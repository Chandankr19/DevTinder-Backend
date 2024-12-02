const express = require("express");
const app = express();

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

app.use(
  "/user",
  (req, res, next) => { 
    console.log("Handling the route user 1")
    // res.send("Response 1!!");
    // here using next argumnents we can redirect the res to the next res if first res is not cathed
    next();
  },
  (req, res, next) => {
    console.log("Handling the route user 2")
    // res.send("Response 2!!");
    next();
  } 
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
