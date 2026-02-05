const app = require("./app");
require("./config/db"); 

const { PORT } = require("./config/env");

app.listen(PORT || 3000, () => {
  console.log(`✅ Server running on http://localhost:${PORT || 3000}`);
});
