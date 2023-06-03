import fs from 'node:fs';
import { Transform } from 'stream';
import * as readline from "readline";



function streamOperation(inputPath, outputPath, operation) {

    let uppercase;
    let lowercase;
    let reverse;

    let readStreamInput;
    let writeStreamOutput;

    const streamErrorMessage = "Some issue with streams.";

    if (fs.existsSync(inputPath)) {

        readStreamInput = fs.createReadStream(inputPath);

        writeStreamOutput = fs.createWriteStream(outputPath);


        switch (operation) {

            case 'uppercase':
                uppercase = new Transform({
                    transform(chunk, encoding, callback) {
                        callback(null, chunk.toString().toUpperCase());
                    }
                })
                return readStreamInput.pipe(uppercase).pipe(writeStreamOutput)
                    .on('error', () => console.log(streamErrorMessage));


            case 'lowercase':
                lowercase = new Transform({
                    transform(chunk, encoding, callback) {
                        callback(null, chunk.toString().toLowerCase());
                    }
                })
                return readStreamInput.pipe(lowercase).pipe(writeStreamOutput)
                    .on('error', () => console.log(streamErrorMessage));



            case 'reverse':
                reverse = new Transform({
                    transform(chunk, encoding, callback) {
                        callback(null, chunk.reverse());
                    }
                })
                return readStreamInput.pipe(reverse).pipe(writeStreamOutput)
                    .on('error', () => console.log(streamErrorMessage));


            default:
                console.log('Invalid Operation');
        }


    } else {
        console.log('File not found!');
    }

}




const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


function createCommand(question) {
    let answerArr = [];

    rl.question(question, async (answer) => {

        answerArr = answer.split(' ');

        if (answerArr.length == 5 && answerArr[0] == 'node') { // && answerArr[1] == 'index.js'

            streamOperation(answerArr[2], answerArr[3], answerArr[4]);

        }

        else if (answerArr.length !== 5) {
            console.log('Error, missing argument(s)...');
            //process.exit();
        }
        createCommand(question);
    })

}

createCommand("Type command >> ");