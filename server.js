const mongo = require('mongodb').MongoClient
const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')


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

    // use template engine for dynamic pages
    app.engine('html', mustacheExpress())
    app.set('view engine', 'html')
    app.set('views', `${__dirname}/views`)

    // middleware to use static files
    app.use(express.static(`${__dirname}/public`))

    // middleware to parse the body of post methods
    app.use(bodyParser.urlencoded())

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

    app.get('/', (req, res) => {
        res.render(`index.html`, { logo: "Server Logo" })
    })

    app.post('/api/post', (req, res) => {
        // do stuff here
        console.log(req.body)
        res.render('posted.html', { post: req.body })
    })

    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`))

});