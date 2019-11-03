// app.js
//
// Uses express and google translate to make translate API requests

const express = require("express");
const app = express();

// Google translate
const { Translate } = require('@google-cloud/translate').v2;
const util = require("util");

const dotenv = require('dotenv');
dotenv.config();

let translateCache = {};
let translate = new Translate({
    projectId: process.env.PROJECT_ID,
    key: process.env.GOOGLE_API_KEY
});

app.use(express.static("public"));

// Translate the word passed in using Google Translate
app.get("/translate/:language/:englishword", function (request, response) {

    sendToTranslateAPIIfNotInCache(request.params.englishword, request.params.language)
        .then(translation => {
            response.send(translation)
        })
        .catch(e => { console.log(e, "error") })
});

const listener = app.listen(process.env.PORT, function () {
    console.log("Your app is listening on port " + listener.address().port);
});

app.get("/", function (request, response) {
    response.sendFile(__dirname + "/views/index.html");
});

// Send translation to Google Translate
// englishWord
// targetLanguage // ex - "zh-CN";
async function sendToTranslateAPIIfNotInCache(englishWord, targetLanguage) {
    // Check to see if english word was already translated
    if (translateCache[englishWord] && translateCache[englishWord][targetLanguage]) {
        // if already translated, send the translation immediately
        return translateCache[englishWord][targetLanguage];
    } else {
        // if not translated, get translation from google
        const [translation] = await translate.translate(englishWord, targetLanguage);
        // put translation into translateCache
        if (!translateCache[englishWord]) translateCache[englishWord] = {};
        translateCache[englishWord][targetLanguage] = translation
        return translation;
    }
    // something went wrong
    return null;
}
