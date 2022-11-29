const { Contact } = require("../../models/contacts");

const { HttpError } = require("../../Helpers");

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, "-createdAt -updatedAt");
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = getContactById;
