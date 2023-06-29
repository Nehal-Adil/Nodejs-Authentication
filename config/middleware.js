/**

Middleware function to set flash messages in locals
@param {Object} req - The request object
@param {Object} res - The response object
@param {Function} next - The next middleware function
*/
module.exports.setFlash = function (req, res, next) {
  res.locals.flash = {
    success: req.flash("success"),
    error: req.flash("error"),
  };
  next();
};
