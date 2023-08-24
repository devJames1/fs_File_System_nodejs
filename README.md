# File Management Utility Readme

This Node.js script provides a file management utility that enables users to interact with files by executing commands specified in a `command.txt` file. The utility supports the creation, deletion, renaming, and appending of content to files.

## Features

- **Create a File:** Users can create a new file at a specified path.
- **Delete a File:** Users can delete an existing file from a given path.
- **Rename a File:** Users can rename an existing file or move it to a different directory.
- **Append Content:** Users can add content to an existing file.

## Getting Started

1. Clone or download the repository to your local machine.
2. Install Node.js if you haven't already.
3. Open a terminal window and navigate to the repository's root directory.
4. Run `npm install` to install the required dependencies.
5. Create a `command.txt` file in the same directory, where you will input your file management commands.

## Usage

1. Open the `command.txt` file.
2. Add one of the supported commands, followed by any required parameters, as shown below:

```
create a file <path>
delete the file <path>
rename the file <old-path> to <new-path>
add to the file <path> this content: <content>

```

Replace `<path>`, `<old-path>`, `<new-path>`, and `<content>` with the actual paths and content.

3. Save the `command.txt` file.

## Running the Utility

1. In the terminal, navigate to the repository's root directory.
2. Run the utility using the command: `node script.js`.
3. The utility will monitor changes to the `command.txt` file and execute the specified commands accordingly.

## Notes

- If the specified file doesn't exist for a particular operation, an error message will be displayed.
- To avoid multiple appends of the same content, the utility tracks the previously added content.
- multiple appends may still occur randomly due to unstable `fs` module.

## Error Handling

- If a file is not found for an operation, an appropriate error message will be displayed.
- General errors during file operations are logged.

## Dependencies

- The script uses the `fs/promises` module for asynchronous file operations.
- Events and event handling are used to trigger file management actions upon changes to the `command.txt` file.

## Contributing

Feel free to contribute to this project by opening issues or submitting pull requests on the GitHub repository.

## License

This project is licensed under the [MIT License](LICENSE).

## Authors
[James Okolie](https://www.linkedin.com/in/james-okolie)

Specail thanks to [Cododev](https://www.youtube.com/@Cododev) 