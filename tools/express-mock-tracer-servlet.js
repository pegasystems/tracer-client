const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');
const cors = require('cors');


app.get('/', cors(), (req, res) => {
    fs.readFile( './resources/TraceOutput.xml', function(err, data) {
        res.send(data)
    });
})

app.listen(port, () => {
    console.log("Example app listening on port" + port)}
);