import Joi from 'joi';
import { typeList } from '../constants/contacts.js';

export const contactsAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phoneNumber: Joi.number().required(),
  email: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string()
    .valid(...typeList)
    .required(),
});

export const contactsUpdateSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  phoneNumber: Joi.number(),
  email: Joi.string(),
  isFavourite: Joi.boolean(),
  contactType: Joi.string().valid(...typeList),
});
