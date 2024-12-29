import createError from 'http-errors';
import * as contactsService from '../services/contactsService.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';

import { sortByList } from '../db/models/Contact.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query, sortByList);
  const userId = req.user._id;

  const data = await contactsService.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    userId,
  });

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data,
  });
};

export const getContactsByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { contactId } = req.params;

  const contact = await contactsService.getContactById({ contactId, userId });

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const addContactsController = async (req, res) => {
  const { _id: userId } = req.user;
  const data = await contactsService.addContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data,
  });
};

export const patchContactsController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  console.log(contactId);

  console.log(userId);
  const updatedContact = await contactsService.updateContact(
    { userId, _id: contactId },
    req.body,
  );

  console.log(updatedContact);

  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: updatedContact,
  });
};

export const deleteContactsController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;

  const contact = await contactsService.deleteContact({ userId, contactId });

  if (!contact) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
};
