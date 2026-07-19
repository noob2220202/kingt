module.exports = {
  apps: [
    {
      name: "king-gift-card-shop",
      script: "node_modules/.bin/next",
      args: "start -p 3000",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        ADMIN_SESSION_SECRET: "change-this-to-a-long-random-value",
      },
    },
  ],
};
