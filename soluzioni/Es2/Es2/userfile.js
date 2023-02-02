const fs = require('fs');

exports.counter = 0;

function codeFromFilename(fname) {
    const pieces = fname.split(".");
    const purename = pieces[0];
    if (!purename.startsWith("user")) return -1;
    const code = purename.substring(4);
    if (isNaN(code)) return -1;
    const codeNum = parseInt(code);
    return codeNum;
}

exports.createFile = (readstream) => {
    const filename = "user" + exports.counter + ".json";
    exports.counter = exports.counter+1;
    const write = fs.createWriteStream(filename);
    readstream.pipe(write);
};

exports.userExists = (usercode) => {
    const files = fs.readdirSync(".");
    return files.some((fn) =>
        codeFromFilename(fn) === usercode);
};

exports.sendFile = (usercode, writestream)  => {
    const filename = "user" + usercode + ".json";
    const read = fs.createReadStream(filename);
    read.pipe(writestream);
}