var path = require('path')
const express = require('express')
const app = express()
const mockAPIResponse = require('./mockAPI.js')
//add instance to get variable from env file
const dotenv = require('dotenv');
dotenv.config();
/* Middleware*/
const bodyParser = require('body-parser')

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors  = require('cors');
app.use(cors());
const fetch = require("node-fetch");
// local variable
const base_url = 'https://api.meaningcloud.com/sentiment-2.1'

// Initialize the main project folder
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
const meaningcloudRequest = async (url = '',data={}) => {
    console.log('url',url);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData
    } catch (error) {
        console.log("error", error);
    }
}
// prepare object for client side
const prepareResultResponse = (response)=>{
    const resultObj = {
        status_code: response.status.code,
        model: response.model,
        score_tag: response.score_tag,
        agreement: response.agreement,
        subjectivity: response.subjectivity
    }
    return resultObj;
}
//consume request from meaningcloud 
app.post('/meaningcloud-api', async (req, res) => {
    try {
        const full_path= `${base_url}?key=${process.env.API_KEY}&url=${req.body.url}&lang=en`;
        meaningcloudRequest(full_path,{}).then(response=>{   
            const resultObj = prepareResultResponse(response);
            res.send(resultObj);
        });          
    } catch (error) {
        console.log(error.message)
    }
})
