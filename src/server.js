import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import * as contactsService from './services/contactsService.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  //   app.use(
  //     pino({
  //       transport: {
  //         target: 'pino-pretty',
  //       },
  //     }),
  //   );

  app.get('/contacts', async (req, res) => {
    const contacts = await contactsService.getContacts();

    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await contactsService.getContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found',
      });
    }

    res.json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
    console.log(req.params);
  });

  app.use((req, res) => {
    res.status(404).json({
      message: `Not found`,
    });
  });

  app.use((error, res, req, next) => {
    res.status(500).json({
      message: 'Server error',
      error: error.message,
    });
  });

  const port = Number(getEnvVar('PORT', 3000));

  app.listen(port, () => console.log(`Server running on ${port} port`));
};
