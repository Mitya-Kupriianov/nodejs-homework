const contacts = require("../../models/contacts");

const { HttpError } = require("../../Helpers");

const addSchema = require("../../schemas/contacts");

const updateContactID = async (req, res, next) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "Missing fields");
  }
  const { contactId } = req.params;
  const result = await contacts.updateContactID(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateContactID;
