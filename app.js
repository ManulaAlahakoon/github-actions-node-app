const express = require('express');

function createApp(loadEnv = true) {
  if (loadEnv) {
    require('dotenv').config(); // only load .env if requested
  }

  const app = express();

  const SECRET_KEY = process.env.SECRET_KEY;

  app.get('/', (req, res) => {
    res.json({
      message: "Node app is running",
      secret_set: SECRET_KEY ? true : false
    });
  });

  app.get('/health', (req, res) => {
    res.json({ status: "OK" });
  });

  return app;
}

// only run server if this is main file
if (require.main === module) {
  const app = createApp(); // load .env
  app.listen(3000, () => {
    console.log("App running on http://localhost:3000");
  });
}

module.exports = createApp;
