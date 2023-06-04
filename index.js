import fs from 'node:fs';
import { Transform } from 'stream';


const pathOne = process.argv[2];
const pathTwo = process.argv[3];
const oper = process.argv[4];


function streamOperation(inputPath, outputPath, operation) {

    let readStreamInput;
    let writeStreamOutput;

    const streamErrorMessage = "Some issue with streams.";

    if (process.argv.length !== 5) {

        console.log('Error, missing argument(s)...');

    } else if (fs.existsSync(inputPath)) {

        if (operation == 'uppercase') {
            operation = new Transform({
                transform(chunk, encoding, callback) {
                    callback(null, chunk.toString().toUpperCase());
                }
            })
        } else if (operation == 'lowercase') {
            operation = new Transform({
                transform(chunk, encoding, callback) {
                    callback(null, chunk.toString().toLowerCase());
                }
            })
        } else if (operation == 'reverse') {
            operation = new Transform({
                transform(chunk, encoding, callback) {
                    callback(null, chunk.reverse());
                }
            })
        } else {
            console.log('Invalid Operation');
            return;
        }

        readStreamInput = fs.createReadStream(inputPath);
        writeStreamOutput = fs.createWriteStream(outputPath);

        return readStreamInput.pipe(operation).pipe(writeStreamOutput)
            .on('error', () => console.log(streamErrorMessage));


    } else {
        console.log('File not found!');
    }

}

streamOperation(pathOne, pathTwo, oper);







