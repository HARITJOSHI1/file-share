const fs = require('fs');
const path = require('path');
const Email = require("../utils/Email");

exports.finder = async (user, fileName) => {
    const inputPath = path.join(`${__dirname}../docs`, fileName);
    const file = fs.readFileSync(inputPath);
    await new Email(user, file).send('Hello', "Test");
}