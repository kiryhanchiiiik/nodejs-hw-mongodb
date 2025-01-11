import { Router } from 'express';
import * as ContactsController from './../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/multer.js';
import {
  contactsAddSchema,
  contactsUpdateSchema,
} from '../validation/validateContacts.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(ContactsController.getContactsController));

contactsRouter.get(
  '/:contactId',
  isValidId,
  ctrlWrapper(ContactsController.getContactsByIdController),
);
// upload.array('poster', 8 - count files) - in one
contactsRouter.post(
  '/',
  upload.single('photo'),
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
