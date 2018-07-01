const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const genres = [
  { id: 1, name: 'Action' },  
  { id: 2, name: 'Horror' },  
  { id: 3, name: 'Romance' },  
];

//Getting all Genres
app.get('/api/genres', (req, res) => {
    res.send(genres);
});

// Getting a Genre by ID
app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    
    if(!genre) return res.status(404).send("Genre Not found with this ID");

    res.send(genre);

});

// Adding a new Genre
app.post('/api/genres', (req, res) => {
    //this technique is known as object destructuring.
    const { error } = validateGenre(req.body);

    if (error) return res.status(404).send(error.details[0].message);

    const genre = {
        id : genres.length + 1,
        name : req.body.name
    };

    genres.push(genre);
    res.send(genre);
});

// Updating a Genre
app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    
    if(!genre) return res.status(404).send("Genre Not found with this ID");

    const { error } = validateGenre(req.body);

    if (error) return res.status(404).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

// Deleting a Genre
app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    
    if(!genre) return res.status(404).send("Genre Not found with this ID");

    const index = genres.indexOf(genre);
    genres.splice(index,1);
    res.send(genre); 
});

//Validation for genre request
function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(genre,schema);
}

//PORT
//global object --- process
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));