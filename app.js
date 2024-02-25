var fs = require('fs');

var jsonData = JSON.parse(fs.readFileSync('websites.json', 'utf8'));

fs.close;

const express = require('express');

const app = express();

const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets/images/logos/');
    },
    filename: (req, file, cb) => {
        cb(null, (file.originalname));
    }
});

const upload = multer({storage: storage});

app.use(express.static('public'));


// File upload
app.get("/upload", (req, res) => {
    res.render("Upload file");
});


app.post("/upload", upload.single('websiteIcon'), (req, res) => {
    let websiteName = req.body.websiteName;
    let websiteURL = req.body.websiteURL;
    let fileName = req.file.originalname;
    if(!websiteURL.includes('http')){
        websiteURL = 'https://' + websiteURL;
    }
    // Insert website in json file
    var websites = jsonData;
    var website = {name: websiteName, url: websiteURL, icon: fileName}

    for (var i = 0; i < websites.websites.length; i++){
        if(websites.websites[i].name === website.name){
            res.status(200);
            res.send('Website bereits vorhanden');
            return;
        }
    }



    websites.websites[websites.websites.length] = website;

    websites = JSON.stringify(websites);


    
    fs.writeFileSync('websites.json', websites, 'utf8');
    fs.close;
    res.status(200);
    res.redirect('index.html');
});



// Parse JSON bodies (as sent by API clients)
app.use(express.json());


// Json Datei auslesen und client übergeben
app.post('/readJson', (req, res) => {
    res.status(200);
    res.send(jsonData);
});


/*
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
*/



app.listen(3000, () => {
    console.log('Listening on http://localhost:3000');
});