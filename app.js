// const fs = require("fs");


//first example
// let content = fs.readFileSync("./text.txt");
// let readableContent = content.toString("utf-8");
// console.log(readableContent);


// Three ways to handle files
//1. Promises API
//2. Callback API
//3. Synchronous API

//Examples
// Promise API //
// const fs = require("fs/promises");
// (async () => {
//     try {
//         await fs.copyFile("text.txt", "copied-promise.txt");
//     } catch (error) {
//         console.log(error);
//     }

// })();

// Callback API //
// const fs = require("fs");
// fs.copyFile("text.txt", "copied-callback.txt", (error) => {
//     if (error)
//         console.log(error);
// });

// Synchronous API //
// const fs = require("fs");
// fs.copyFileSync("text.txt", "copied-sync.txt");


// ***** Main Project ***** //

const fs = require('fs/promises');

(async () => {
    const commandFileHandler = await fs.open("./command.txt", "r");
    const watcher = fs.watch("./command.txt");

    for await (const event of watcher) {
        if (event.eventType == "change") {
            //the file was changed ...
            console.log("This file was changed");

            //get the size of our file
            const size = (await commandFileHandler.stat()).size;
            //console.log(size)

            // we want to read the content, Buffer to allocate memory needed
            const content = await commandFileHandler.read(Buffer.alloc(size))

            console.log(content);
        }
    }
})();
