const contacts = require("../../models/contacts");

const { HttpError } = require("../../Helpers");

const addSchema = require("../../schemas/contacts");

const addContact = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  console.log(error);
  if (error) {
    throw HttpError(400, "Missing required name field!!!");
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

module.exports = addContact;
