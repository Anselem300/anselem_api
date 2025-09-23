const isAuthenticated = (req, res, next) => {
  // Check if session exists and user is logged in
  if (!req.session || !req.session.user) {
    return res.status(401).json({ message: "You do not have access" });
  }

  // User is authenticated
  next();
};

module.exports = { isAuthenticated };
