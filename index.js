require('dotenv').config();         // read environment variables from .env file
const express = require('express'); 
const cors = require('cors');       // middleware to enable CORS (Cross-Origin Resource Sharing)

const app = express();
const port = process.env.PORT;	 	
const host = process.env.HOST;

app.use(cors()); //enable ALL CORS requests (client requests from other domain)
app.use(express.json()); //enable parsing JSON body data

// root route -- /api/
app.get('/', function (req, res) {
    res.status(200).json({ message: 'Welcome to Alumni API!' });
});

// routing middleware
app.use('/users', require('./routes/users.routes.js'))
app.use('/posts', require('./routes/posts.routes.js'))
app.use('/events', require('./routes/events.routes.js'))
app.use('/apaths', require('./routes/apaths.routes.js'))
app.use('/ppaths', require('./routes/ppaths.routes.js'))


// handle invalid routes
app.all('*', function (req, res) {
	res.status(400).json({ error: `The API does not recognize the request on ${req.url}` });
})

app.use((err, req, res, next) => {
    const errorStatus = err.statusCode || 500;
    const errorMessage = err.message || "Internal server error" + err.stack;
  
    return res.status(errorStatus).json({
      success: false,
      msg: errorMessage,
    });
  });

app.listen(port, host, () => console.log(`App listening at http://${host}:${port}/`));
