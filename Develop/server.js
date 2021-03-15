const express = require("express");

const app = express();
const PORT = process.PORT || 3000;
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// created calls here so it will grab and data that is 'wanted' 
require("./routes/apiroutes")(app);
require("./routes/htmlroutes")(app);
// module export app for both of them (kept names same to be consistent)
// where the server is being opened @
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));