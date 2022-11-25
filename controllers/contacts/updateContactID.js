const contacts = require("../../models/contacts");

const { HttpError } = require("../../Helpers");

const updateContactID = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContactID(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = updateContactID;
