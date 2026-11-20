// pm2 config for the no1.ticketking.store instance.
// Lives in its own checkout (e.g. /var/www/no1.ticketking.store) so its build,
// .env.production and .data/store.json stay separate from the first site.
// Secrets and business info go in .env.production at the checkout root, not here.

module.exports = {
  apps: [
    {
      name: "ticketking-no1",
      script: "node_modules/.bin/next",
      args: "start -p 3001 -H 127.0.0.1",
      cwd: `${__dirname}/../..`,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
