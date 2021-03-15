
var fs = require("fs");
var util = require("util");
var path = require("path");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        readFileAsync(path.join(__dirname + "/db/db.json"), "utf8") 
        .then(function(data){
            notes=[].concat(JSON.parse(data))
            return res.json(notes);
        })
    });


    app.post("/api/notes", (req, res) => {
        var notenew = req.body;
        readFileAsync(path.join(__dirname + "/db/db.json"), "utf8") 
        .then(function (data) {
            notes = [].concat(JSON.parse(data));
            notenew.id = notes.length ++;
            notes.push(notenew);
            return notes
        }).then(function(data){
        writeFileAsync(path.join(__dirname + "/db/db.json"), JSON.stringify(data))
            res.json(notenew);
        })
})


    app.delete("/api/notes/:id", function(req, res){
        var notedel = parseInt(req.params.id);
        readFileAsync(path.join(__dirname + "/db/db.json"), "utf8")
        .then(function(data){
            notes = [].concat(JSON.parse(data));
            const notenew = [];
            notes.forEach((note) => 
            notedel !== note.id ? notenew.push(note) : 
            console.log("note has been deleted! "));
            return notenew
        }).then(function(notes){
            writeFileAsync(path.join(__dirname + "/db/db.json"), JSON.stringify(notes))
            res.send(notes);
        })
    });
}