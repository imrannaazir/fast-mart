// keep server alive

import config from '../config';

export const keepServerAlive = () => {
  const minInterval = 12 * 60 * 1000; // 12 minutes
  const maxInterval = 14 * 60 * 1000; // 14 minutes
  function pingServer() {
    const interval = Math.floor(
      Math.random() * (maxInterval - minInterval + 1) + minInterval,
    );

    setTimeout(async () => {
      const response = await fetch(config.app_url as string);
      const data = (await response.json()) as Record<string, unknown>;
      if (data.success) {
        console.log(data.message as string);
      } else {
        console.log(`App has been died😒!`);
      }

      pingServer(); // Schedule the next ping
    }, interval);
  }

  pingServer(); // Start the ping cycle
};
