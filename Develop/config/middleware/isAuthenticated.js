// This is middleware for restricting routes a user is not allowed to visit if not logged in
module.exports = function(req, res, next) {
  // If the user is logged in, continue with the request to the restricted route
  if (req.user) {
    return next();
  }

  // If the user isn't logged in, redirect them to the login page
  return res.redirect("/");
};

//------------------------------------------------------------------------------------
//Creates a module that exports a fucntion that takes three parameters
//if user is logged in, function returns next() parameters
//else, if user is not logged in, user is redirected to "/" path