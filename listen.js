const { PORT = 9093 } = process.env;
const app = require("./app");

app.listen(PORT, () => console.log(`Listening on ${PORT}...`));
