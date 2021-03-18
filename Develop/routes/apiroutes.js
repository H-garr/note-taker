
var fs = require("fs");
var util = require("util");
var path = require("path");

// ability to add and change the files
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        // get route then reading the file
        readFileAsync(path.join(__dirname + "/database/db.json"), "utf8") 
        .then(function(data){
            const notes=[].concat(JSON.parse(data))
            console.log(notes)
            return res.json(notes);
        })
    });


    app.post("/api/notes", (req, res) => {
        var createnewnote = req.body;
        readFileAsync(path.join(__dirname + "/database/db.json"), "utf8") 
        .then(function (data) {
            console.log(data)
           const notes = [].concat(JSON.parse(data));
            createnewnote.id = notes.length ++;
            notes.push(createnewnote);
            return notes
        }).then(function(data){
        writeFileAsync(path.join(__dirname + "/database/db.json"), JSON.stringify(data))
            res.json(createnewnote);
        })
})


    app.delete("/api/notes/:id", function(req, res){
        const deletelenote = parseInt(req.params.id);
        // read as a string for some reason so i had to pase the data
        readFileAsync(path.join(__dirname + "/database/db.json"), "utf8")
        .then(function(data){
            notes = [].concat(JSON.parse(data));
            const createnewnote = [];
            notes.forEach((note) => 
            deletelenote !== note.id ? createnewnote.push(note) : 
            console.log("note has been deleted."));
            return createnewnote
        }).then(function(notes){
            writeFileAsync(path.join(__dirname + "/database/db.json"), JSON.stringify(notes))
            res.send(notes);
        })
    });
}