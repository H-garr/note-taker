const path = require("path");
const router = require("express").Router();

router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
//creates the /notes linking the html file to /notes

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
//   the * is just grabbing everything from the index just like the /notes above.
  module.exports = router;
