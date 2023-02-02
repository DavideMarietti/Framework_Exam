const fs = require('fs');


function userFromFilename(filename) {
    const pieces = filename.split(".");
    const purename = pieces[0];
    return purename;
}

exports.writeUserData = (userObj) => {
    const filename = userObj.username + ".json";
    const write = fs.writeFile(filename, JSON.stringify(userObj), (err) => {
        console.log("Error writing file: " + filename);
    });
};

exports.userExists = (username) => {
    const files = fs.readdirSync(".");
    return files.some((fn) =>
        userFromFilename(fn) === username);
};

exports.sendFile = (username, writestream)  => {
    const filename = username + ".json";
    const read = fs.createReadStream(filename);
    read.pipe(writestream);
}