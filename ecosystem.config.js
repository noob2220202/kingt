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
        // Overrides the footer's 대표자 name. Leave unset to use the code default (전민재).
        // BUSINESS_CEO_NAME: "전민재",
      },
    },
  ],
};
