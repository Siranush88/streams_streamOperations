import fs from 'node:fs';
import { Transform } from 'stream';

function readWriteStream(inputPath, outputPath, operation) {

    let uppercase;
    let lowercase;
    let reverse;

    const readStreamInput = fs.createReadStream(inputPath);
    readStreamInput.on('data', (chunk) => {
        console.log(chunk);
    });

    const writeStreamOutput = fs.createWriteStream(outputPath);
    writeStreamOutput.on('data', (chunk) => {
        console.log(chunk);
    });

    readStreamInput.on('data', (chunk) => {
        writeStreamOutput.write(chunk);
    })

    const handleError = () => {
        console.log("error");
        readStreamInput.destroy();
        writeStreamOutput.end("Finished with error"); // error message jshtel
    }

    switch (operation) {
        case 'uppercase':
            uppercase = new Transform({
                transform(chunk, encoding, callback) {
                    callback(null, chunk.toString().toUpperCase());
                }
            })
            break;

        case 'lowercase':
            lowercase = new Transform({
                transform(chunk, encoding, callback) {
                    callback(null, chunk.toString().toUpperCase());
                }
            })
            break;

        case 'reverse':
            reverse = new Transform({
                transform(chunk, encoding, callback) {
                    callback(null, chunk.toString().reverse());
                }
            })
            break;

        default:
            console.log('Invalid Operation');
    }


    return readStreamInput.pipe(operation).pipe(writeStreamOutput)
        .on('error', handleError )
        .on('end', () => { console.log("Stream ended.") });
    // readStream.pipe(lowercase).pipe(writeStream).on('error', () => {console.log("Some issue with streams!")}).on('end', () => {console.log("Stream ended.")});
    // readStream.pipe(reverse).pipe(writeStream).on('error', () => {console.log("Some issue with streams!")}).on('end', () => {console.log("Stream ended.")});
}

readWriteStream('./text.txt', './new_text.txt', 'uppercase');