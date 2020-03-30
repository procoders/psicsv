const Papa = require("papaparse");
const fs = require("fs");

module.exports = {
  toJson: async (filepath, options = { header: true }) => {
    const file = fs.createReadStream(filepath);
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        ...options,
        complete(results, file) {
          resolve(results);
        },
        error(err, file) {
          reject(err);
        }
      });
    });
  },
  addToFile: (filepath, record, options = { flags: "a+" }) => {
      const stringData = record.map(el => '"' + el + '"').join(",") + "\n";
    fs.createWriteStream(filepath, options ).write(stringData)
  }
};
