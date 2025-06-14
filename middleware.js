module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must before login here !!")
        return res.redirect("/login")
    }
    next()
}

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next()
}


module.exports.isAdmin = (req, res, next) => {
  if (req.isAuthenticated() && req.user && req.user.roles.includes("admin")) {
    return next();
  }
  req.flash("error", "Admins only. Please log in.");
  return res.redirect("/admin/login");
};


