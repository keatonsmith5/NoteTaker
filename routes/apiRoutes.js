const fs = require("fs");

//require data from json file and save it in a variable
noteData = require("../db/db.json");

module.exports = function(app) {

    //create a function that writes the notes to the db file
    const writeToDB = (notes) => {
        // create variable that takes the json and converts it to a string
        notes = JSON.stringify(notes);
        // write the string back to the db file
        fs.writeFileSync("./db/db.json", notes, (error) => {
            if(error) {
                return console.log(error);
            }
        });
    }

    //GET request that sends json data
    app.get("/api/notes", (req, res) => {
        res.json(noteData);
    })

    //POST request
    app.post("/api/notes", (req, res) => {
        //set an id to each new post
        if(noteData.length === 0) {
            req.body.id = "0";
        }
        else {
            req.body.id = JSON.stringify(JSON.parse(noteData[noteData.length - 1].id) + 1);
        }
        console.log("id:" + req.body)
        //push the body of the note to JSON file
        noteData.push(req.body);

        //use function above to write to file
        writeToDB(noteData);

        //respond with the note in JSON
        res.json(req.body);
    })
        

    // Delete note with certain id
    app.delete("/api/notes/:id", (req, res) => {
        //convert the data of that id from json to string
        let id = req.params.id.toString();

        //iterate through the notes data array and find matching id
        for (i=0; i < noteData.length; i++) {
            if(noteData[i].id === id) {
                //respond note to be deleted
                res.send(noteData[i]);
                //remove note from array
                noteData.splice(i, 1);
                break;
            }
        }

        // write entire note array to db again
        writeToDB(noteData);

    })

       
}


