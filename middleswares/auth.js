import ErrorHandler from "../utils/ErrorHandler.js";

export const isAuthenticated = (req, res, next) => {
  const token = req.cookies["connect.sid"]; // to make isAuthenticated function working cookie parser must be import in app.js
  // console.log(token);

  if (!token) {
    //if the token not exist
    return next(new ErrorHandler("Not Logged In", 401));
  }
  next(); //if token exist then next
};

export const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== "admin") { // if not admin
    return next(new ErrorHandler("Only Admin Allowed", 405));
  }
  next(); // if admin then go next
};
