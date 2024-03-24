/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import colors from 'colors';
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    server = app.listen(config.port, () => {
      console.log(colors.green.bold(`App listening on port ${config.port} ✔️`));
    });
  } catch (error) {
    console.log(error);
  }
}

main();

// handle unhandledRejection
process.on('unhandledRejection', () => {
  console.log(
    colors.red.bold('😈 unhandledRejection is detected, shutting down...'),
  );

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

// handle uncaughtException
process.on('uncaughtExceptionMonitor', () => {
  console.log(
    colors.red.bold('😈 unhandledRejection is detected, shutting down...'),
  );
});
