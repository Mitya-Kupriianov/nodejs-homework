const contacts = require("../../models/contacts");

const { HttpError } = require("../../Helpers");

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: "contact deleted" });
};

module.exports = removeContact;
