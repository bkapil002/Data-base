const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./Controller/userController')
const PORT = 5000

const app = express();
app.use(cors());
app.use(bodyParser.json());


app.post('/api/signup',userController.signup )
app.post('/api/login' , userController.login)

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
