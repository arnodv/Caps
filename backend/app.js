const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const helmet = require("helmet");
app.use(helmet());
var cors = require('cors');
app.use(cors());
var favorites = [];

//returns the favorites array
app.get('/favs', function(req, res) {
    res.send(favorites);
})
//add an object to the array
app.post('/', (req, res) => {       
    var data = `${req.query.data}`;
    data = data.split('|');
    var dataJson = {"artistName":data[0], "trackName": data[1], "kind":data[2]};
    favorites.push(dataJson);
    res.send('Project added');
})
//remove an object from the array
app.delete('/', (req, res) => {
    var removeID = `${req.query.id}`- 1;
    favorites.splice(removeID, 1);
    res.send('Project deleted');
})      

app.use(function(err, req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log(err.stack)
    res.status(500).send('Something broke!')
    next();
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
