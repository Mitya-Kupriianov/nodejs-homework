const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactID,
} = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../Helpers");

const { validateBody } = require("../../middlewares");

const schemas = require("../../schemas/contacts");

router.get("/", ctrlWrapper(listContacts));

router.get("/:contactId", ctrlWrapper(getContactById));

router.post("/", validateBody(schemas), ctrlWrapper(addContact));

router.put("/:contactId", validateBody(schemas), ctrlWrapper(updateContactID));

router.delete("/:contactId", ctrlWrapper(removeContact));

module.exports = router;
