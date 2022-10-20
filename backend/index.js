const express = require('express');
const toConnectDatabase = require('./db');
const cors = require('cors');

toConnectDatabase();

const port = 5000;
const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.send('Welcome to the express server');
})

app.use('/auth/user' , require('./routes/userRoutes'));
app.use('/auth/book' , require('./routes/bookRoutes'));

app.listen(port , ()=>{
    console.log('listening on port ' + port);
});