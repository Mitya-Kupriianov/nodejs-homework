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

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/contacts");

router.get("/", authenticate, ctrlWrapper(listContacts));

router.get("/:contactId", authenticate, isValidId, ctrlWrapper(getContactById));

router.post(
  "/",
  authenticate,
  validateBody(schemas.addSchema),
  ctrlWrapper(addContact),
);

router.put(
  "/:contactId",
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  ctrlWrapper(updateContactID),
);

router.delete(
  "/:contactId",
  authenticate,
  isValidId,
  ctrlWrapper(removeContact),
);

router.patch(
  "/:contactId/favorite",
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(updateContactFavorite),
);

module.exports = router;
