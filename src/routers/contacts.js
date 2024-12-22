import { Router } from 'express';
import * as ContactsController from './../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from '../validation/validateContacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(ContactsController.getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(ContactsController.getContactsByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactsAddSchema),
  ctrlWrapper(ContactsController.addContactsController),
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactsUpdateSchema),
  ctrlWrapper(ContactsController.patchContactsController),
);

contactsRouter.delete(
  '/:contactId',
  isValidId,
  ctrlWrapper(ContactsController.deleteContactsController),
);

export default contactsRouter;
