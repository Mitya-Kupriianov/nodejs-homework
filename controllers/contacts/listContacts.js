const { Contact } = require("../../models/contacts");

const { HttpError } = require("../../Helpers");

const listContacts = async (req, res, next) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  const result = await Contact.find(
    {
      $and: [
        { owner },
        {
          favorite: favorite === undefined ? { $in: [true, false] } : favorite,
        },
      ],
    },
    "-createdAt -updatedAt",
    {
      skip,
      limit,
    },
  ).populate("owner", "name email");
  res.json(result);
};

module.exports = listContacts;
