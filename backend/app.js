const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');


app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World');
});

module.exports = app;
// app.listen(3000, () => {
//     console.log('Server is running http://localhost:3000');
// });
