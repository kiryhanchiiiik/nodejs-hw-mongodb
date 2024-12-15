import ContactCollection from '../db/models/Contact.js';

export const getContacts = () => ContactCollection.find();

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = (payload) => ContactCollection.create(payload);

export const updateContact = async (_id, payload) => {
  const result = await ContactCollection.findOneAndUpdate({ _id }, payload, {
    new: true,
  });

  return result;
};

export const deleteContact = async (_id) => {
  const contact = await ContactCollection.findOneAndDelete({ _id });

  return contact;
};
