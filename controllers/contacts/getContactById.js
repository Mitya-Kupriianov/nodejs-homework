const contacts = require("../../models/contacts");

const { HttpError } = require("../../Helpers");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = getContactById;
