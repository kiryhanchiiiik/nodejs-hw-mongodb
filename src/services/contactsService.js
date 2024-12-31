import ContactCollection from '../db/models/Contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
export const getContacts = async ({
  userId,
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = 'asc',
}) => {
  const limit = perPage;
  const skip = (page - 1) * limit;
  const filter = { userId };
  const data = await ContactCollection.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder });

  const total = await ContactCollection.countDocuments(filter);

  const paginationData = calculatePaginationData({ total, page, perPage });

  return {
    data,
    page,
    perPage,
    totalItems: total,
    ...paginationData,
  };
};

export const getContactById = ({ contactId, userId }) =>
  ContactCollection.findOne({ _id: contactId, userId });

export const getContact = (filter) => ContactCollection.findOne(filter);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (filter, payload) => {
  const result = await ContactCollection.findOneAndUpdate(filter, payload);

  return result;
};

export const deleteContact = async ({ contactId, userId }) => {
  const contact = await ContactCollection.findOneAndDelete({
    _id: contactId,
    userId,
  });

  return contact;
};
