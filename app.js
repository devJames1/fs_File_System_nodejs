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

    //commands
    const CREATE_FILE = "create a file";
    const DELETE_FILE = "delete the file";
    const RENAME_FILE = "rename the file";
    const ADD_TO_FILE = "add to the file";

    // function to create a file on any path
    const createFile = async (path) => {

        try {
            //check if file already exist
            const existingFileHandle = await fs.open(path, "r");
            // we already have the file
            existingFileHandle.close();
            return console.log(`The file ${path} already exists.`)
        } catch (err) {
            //we dont have the file we should create it
            const newFileHandle = await fs.open(path, "w");
            console.log("A new file was successfully created");
            newFileHandle.close();
        }
    }

    // function to delete a file on any path
    const deletFile = async (path) => {

        try {
            console.log(`Deleting ${path}...`);
            await fs.unlink(path);
            console.log('File deleted successfully!');
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.error('File not found:', path);
            } else {
                console.error('Error deleting file:', err);
            }
        }

    }

    // function to rename a file on any path
    // this can also be used to move file to another dir
    const renameFile = async (oldPath, newPath) => {
        try {
            console.log(`Renaming ${oldPath} to ${newPath}`);
            await fs.rename(oldPath, newPath);
            console.log('File renamed successfully!');
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.error('File not found:', oldPath);
            } else {
                console.error('Error renaming file:', err);
            }
        }
    }


    //handling double write, but this has it's tradeoffs where you can't write something twice.
    let addedContent;

    // function to add  to any file on any path
    const addToFile = async (path, content) => {
        if (addedContent === content) return;
        try {
            // Check if the file exists before writing
            const fileStats = await fs.stat(path);
            if (fileStats.isFile()) {

                console.log(`Adding to ${path}`);
                console.log(`Content: ${content}`);
                await fs.appendFile(path, content + '\n');
                addedContent = content;
                console.log('Content written to file successfully!');
            } else {
                console.error('The provided path is not a file:', path);
            }
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.error('File not found:', path);
            } else {
                console.error('Error writing content to file:', err);
            }
        }

    }


    // reading from command.txt
    const commandFileHandler = await fs.open("./command.txt", "r");

    //filehandlers are eventEmitters and can be coded this way
    commandFileHandler.on("change", async () => {
        //get the size of our file
        const size = (await commandFileHandler.stat()).size;

        //allocate just enough memory
        const buff = Buffer.alloc(size);

        //offset: where to start filling in the file
        const offset = 0;

        //position: the location where to begin reading data from the file
        const position = 0;

        //length: the size of bytes to read
        const length = buff.byteLength;

        // we want to read the content the whole content(from begininig to end)
        await commandFileHandler.read(buff, offset, length, position);

        //decoder 01010 => meaningful
        //encoder meaningful => 01010
        const command = buff.toString("utf-8");

        //create a file:
        //create a file <path>
        if (command.includes(CREATE_FILE)) {
            const filePath = command.substring(CREATE_FILE.length + 1);
            createFile(filePath);
        }

        //delete a file
        //delete the file <path>
        if (command.includes(DELETE_FILE)) {
            const filePath = command.substring(DELETE_FILE.length + 1);
            deletFile(filePath);
        }

        //rename file:
        //rename the file <path> to <new-path>
        if (command.includes(RENAME_FILE)) {
            const _index = command.indexOf(" to ");
            const oldFilePath = command.substring(RENAME_FILE.length + 1, _index);
            const newFilePath = command.substring(_index + 4);

            renameFile(oldFilePath, newFilePath);
        }

        //add to file:
        // add to the file <path> this content: <content>
        if (command.includes(ADD_TO_FILE)) {
            const _index = command.indexOf(" this content: ");
            const filePath = command.substring(ADD_TO_FILE.length + 1, _index);
            const content = command.substring(_index + 15);

            addToFile(filePath, content);
        }
    });


    //watcher...
    const watcher = fs.watch("./command.txt");

    for await (const event of watcher) {
        if (event.eventType == "change") {
            //emmit the event define above
            commandFileHandler.emit("change");
        }
    }
})();
