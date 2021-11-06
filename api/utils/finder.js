const fs = require('fs');
const path = require('path');
const Email = require("../utils/Email");

exports.finder = async (file) => {
    const inputPath = path.join(__dirname, `../docs/${file.name}`);
    const ffile = fs.readFileSync(inputPath);
    await new Email(ffile, file).send("From fileshare app");
}