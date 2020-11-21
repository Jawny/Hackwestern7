const Tesseract = require('tesseract.js');
const imageDir = '../src/assets/images';

// Append named-capture feature to JS RegExp
const named = require('named-regexp').named;

// Suuport for useful JS functions
const _ = require('underscore');

// Font language for cheque
const LANGUAGE_CODE = "micr";
const MICR_CHARACTERS = '0123456789abcd';

const CANADIAN_CHEQUE_REGEX = named(/[0-9]+ca(:<transit>[0-9]{4,5})d(:<institution>[0-9]{3})a(:<account>[dc0-9]+)/);

// To target the numbers on the bottom of the cheque
const SYMBOL_CONFIDENCE_THRESHOLD_PERCENT = 45;

const worker = Tesseract.createWorker();

const getConfidentSymbols = words => {
    // Flatten a multi-dimensional array into a 1D array and then filter array
    // with confidence level > 45
    return _.flatten(words.map(val => {
        return val.symbols;
    }))
        .filter(val => {
            return val.confidence > SYMBOL_CONFIDENCE_THRESHOLD_PERCENT;
    })
}

const readCheque = async (image, callback) => {
    await worker.load();
    await worker.loadLanguage(LANGUAGE_CODE);
    await worker.initialize(LANGUAGE_CODE);
    await worker.setParameters({
        // Setting white list characters makes the result only contain these
        // characters
        tessedit_char_whitelist: MICR_CHARACTERS,
    });
    await worker.recognize(image)
        .then(res => {
            var response = {
                rawText: res.text,
            }

            // If can't find any text
            if (res.data.lines === 0 || res.data.lines.length === 0) {
                return callback({ error: "NO_TEXT_FOUND" }, response);
            }

            var lines = res.data.lines; // Get lines
            var chequeLineWords = lines[lines.length - 1].words;    // Get words in lines
            var confidentSymbols = getConfidentSymbols(chequeLineWords);    // Get confidence level of each word
            var averageConfidence = confidentSymbols.reduce((val, symbol) => {  // Get average confidence level
                return val + symbol.confidence
            }, 0) / confidentSymbols.length;
            var parsedChequeLine = confidentSymbols.map((val) => {  // Get the text of the words and join them
                return val.text
            }).join("");
            var chequeMatches = CANADIAN_CHEQUE_REGEX.exec(parsedChequeLine);   // Check if the text is a Canadian cheque

            if (!chequeMatches) {
                return callback({ error: "NO_CHEQUE_NUMBNERS_FOUND" }, response);
            }

            response.confidence = averageConfidence;
            response.body = {
                transit: chequeMatches.captures.transit[0].replace(/\D/g, ''),
                institution: chequeMatches.captures.institution[0].replace(/\D/g, ''),
                account: chequeMatches.captures.account[0].replace(/\D/g, ''),
            }

            return callback(null, response);
        })
    await worker.terminate();
}

readCheque(`${imageDir}/testCheque1.jpg`, function (err, res) {
    if (err) {
        console.error(err);
    } else {
        console.log(res.body);
    }
});
