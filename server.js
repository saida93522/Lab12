// server code , connects express
let express = require('express');
let api_routes = require('./routes/api.js')
//require path
let path = require('path')
//app config
let app = express();

//Server vue client files
let vueClientPath = path.join(__dirname, 'student-sign-in-client', 'dist')
app.use(express.static(vueClientPath))

//handle requests with JSON bodies
app.use(express.json())
app.use('/api', api_routes) // api path to server location

////handle errors if api routes does not match path
app.use(function (req, res, next) {
    res.status(404).send('Not Found')
})
//handle server errors
app.use(function (err, req, res, next) {
    console.log(err.stack); // for developers
    res.status(500).send('Server error') // for user/client
})


//server that will run Web app
//waits for clients to make request
let server = app.listen(process.env.PORT || 3000, () => { //specifying which port APP should send a request to (localhost:3000 or localhost:8080)
    console.log(`Express server running on port ${server.address().port}`); //verifying that our server is running 
})