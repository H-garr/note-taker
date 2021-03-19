const path = require("path");


module.exports = function (app) {
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    //   added a get for the homepage to display the data.
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
//creates the /notes linking the html file to /notes

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
    });
//   the * is just grabbing everything from the index just like the /notes above.
};