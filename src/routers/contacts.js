import { Router } from 'express';
import * as ContactsController from './../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(ContactsController.getContactsController));

contactsRouter.get(
  '/:contactId',
  ctrlWrapper(ContactsController.getContactsByIdController),
);

contactsRouter.post('/', ctrlWrapper(ContactsController.addContactsController));

contactsRouter.patch(
  '/:contactId',
  ctrlWrapper(ContactsController.patchContactsController),
);

contactsRouter.delete(
  '/:contactId',
  ctrlWrapper(ContactsController.deleteContactsController),
);

export default contactsRouter;
