var express = require('express');
const { sendNotification }  = require('./firebase_handler.js');

var app = express();

const PORT =3000



app.listen(PORT, "0.0.0.0",async () => {
    await sendNotification();
    console.log("Server is listening on port 3030");
});


