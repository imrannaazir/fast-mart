/* eslint-disable no-console */

import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import colors from 'colors';
import { keepServerAlive, seedSuperAdmin } from './app/DB';
let server: Server;
const port = process.env.PORT || 3000;
async function main() {
  try {
    if (!config.database_url) {
      throw new Error(
        'DATABASE_URL is not defined in the environment variables',
      );
    }
    await mongoose.connect(config.database_url as string);
    await seedSuperAdmin();
    server = app.listen(
      port,

      () => {
        console.log(colors.green.bold(`App listening on port ${port} ✔️`));
      },
    );
    // pink the server
    keepServerAlive();
  } catch (error) {
    console.log(error);
  }
}

main();

// handle unhandledRejection
process.on('unhandledRejection', (error) => {
  console.log(
    colors.red.bold('😈 unhandledRejection is detected, shutting down...'),
    error,
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// handle uncaughtException
process.on('uncaughtExceptionMonitor', (error) => {
  console.log(
    colors.red.bold('😈 unhandledRejection is detected, shutting down...'),
    error,
  );
});
