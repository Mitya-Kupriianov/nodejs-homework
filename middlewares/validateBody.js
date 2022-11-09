const { HttpError } = require("../Helpers");

const validateBody = (schema) => {
  const func = (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(HttpError(400, "Missing fields!111"));
    }
    next();
  };
  return func;
};

module.exports = validateBody;
