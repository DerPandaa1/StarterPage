var fs = require('fs');

var jsonData = JSON.parse(fs.readFileSync('websites.json', 'utf8'));

fs.close;

const express = require('express');

const app = express();

app.use(express.static('public'));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());



app.post('/readJson', (req, res) => {
    res.status(200);
    res.send(jsonData);
});



app.post('/addJson', (req, res) => {
    //res.send('test');
    var websites = jsonData;
    var website = req.body.website;

    var duplicate = false;

    for (var i = 0; i < websites.websites.length; i++){
        if(websites.websites[i].name === website.name){
            res.status(200);
            res.send('Duplicate found');
            return;
        }
    }



    websites.websites[websites.websites.length] = website;

    websites = JSON.stringify(websites);


    
    fs.writeFileSync('websites.json', websites, 'utf8');
    fs.close;
    res.status(200);
    res.send('Data added');
});




app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});