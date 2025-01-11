import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

import { createDirIfNotExists } from './utils/createDirIfNotExists.js';

import { TEMPLATES_DIR, UPLOADS_DIR } from './constants/index.js';

const boostrap = async () => {
  await createDirIfNotExists(TEMPLATES_DIR);
  await createDirIfNotExists(UPLOADS_DIR);
  await initMongoConnection();
  setupServer();
};

boostrap();
