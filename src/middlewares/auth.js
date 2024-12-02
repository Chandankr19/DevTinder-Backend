const adminAuth = (req, res, next) => {
  console.log("Admin auth is getting checked!!");
  const token = "xyz";
  const isAdminAuthorized = token === "xyz";
  if (isAdminAuthorized) {
    next();
  } else {
    res.status(401).send({ message: "Unauthorized! " });
  }
};

module.exports ={
  adminAuth
}
