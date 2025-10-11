
exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    pageTitle: 'Login - StayFinder',
    currentPage: 'login',
    isLoggedIn: false,
  });
};

exports.postLogin = (req, res, next) => {
  req.session.isLoggedIn = true;
  // res.cookie('isLoggedIn', true); // set cookie
  // req.session.isLoggedIn = true;
  res.redirect("/");
}

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
  // res.cookie("isLoggedIn", false);
  // res.redirect("/login");
};
