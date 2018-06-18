const mongo = require('mongodb').MongoClient
const express = require('express')

// Connect to mongo for database = test
mongo.connect('mongodb://127.0.0.1/test', (err, client) => {
    if (err) {
        throw err;
    }
    console.log('MongoDB connected...');

    // get the database object
    const db = client.db('test');

    //select port for listening
    const PORT = 5000 | process.env.PORT

    // init express
    const app = express()

    app.get('/api/all', (req, res) => {

        // get collection ref
        let test = db.collection('my_collection');

        // Get chats from mongo collection
        test.find().limit(100).sort({
            _id: 1
        }).toArray((err, result) => {
            if (err) {
                throw err;
            }

            res.json(result)
        });


    })

    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))

});