const app = require("./app");
require("./config/db");
const createTables = require("./config/schema");

const { PORT } = require("./config/env");

// Create tables on startup
createTables();

app.listen(PORT || 3000, () => {
  console.log(`✅ Server running on http://localhost:${ PORT || 3000 }`);
});
