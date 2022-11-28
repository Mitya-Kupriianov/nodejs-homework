const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContactID,
  updateContactFavorite,
} = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../Helpers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

router.get("/", ctrlWrapper(listContacts));

router.get("/:contactId", isValidId, ctrlWrapper(getContactById));

router.post("/", validateBody(schemas.addSchema), ctrlWrapper(addContact));

router.put(
  "/:contactId",
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(updateContactID),
);

router.delete("/:contactId", isValidId, ctrlWrapper(removeContact));

router.patch(
  "/:contactId/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(updateContactFavorite),
);

module.exports = router;
