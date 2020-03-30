#!/usr/bin/env node

var Promise = require("bluebird");

const chalk = require("chalk");
const clear = require("clear");
const figlet = require("figlet");
const cliProgress = require("cli-progress");

const validUrl = require("valid-url");

const psi = require("./lib/psi");
const papa = require("./lib/papa");
const files = require("./lib/files");

clear();

console.log(
  chalk.yellow(figlet.textSync("PSI csv", { horizontalLayout: "full" }))
);
console.log("   by Procoders.tech [https://procoders.tech/] \n\n");

const argv = require("minimist")(process.argv.slice(2));

const dataFilePath = argv["f"];
const threadsCount = argv["t"] || 5;
const columnFile = argv["c"] || "URL";
const headersFile = !(argv["h"] === "false");

if (!dataFilePath && dataFilePath.lastIndexOf(".csv") === -1) {
  console.log(chalk.red("No CSV file in arguments. Add -f <file>"));
}

const dataFileOutputPath =
  dataFilePath.substr(0, dataFilePath.lastIndexOf(".csv")) + ".output.csv";

const run = async () => {
  try {

    const { meta, data } = await papa.toJson(dataFilePath, {
      header: headersFile
    });
    let urlsDone = [];
    if (!files.fileExists(dataFileOutputPath)) {
      papa.addToFile(
        dataFileOutputPath,
        meta.fields.concat(["PSI", "FirstContentfulPaint", "TimeToInteractive"])
      );
    } else {
      urlsDone = (
        await papa.toJson(dataFileOutputPath, {
          header: headersFile
        })
      ).data.map(row => row[columnFile]);
    }

    let stepProgress = 0;
    await Promise.map(
      data,
      async row => {
        const url = row[columnFile];
        stepProgress++;
        // progressBar.increment();
        console.log(`Processing [${stepProgress}/${data.length}]: ${url}`);

        if (!validUrl.isUri(url)) {
          console.log(chalk.yellow(`Skipped on valid url: ${url}`));
          return false;
        }
        if (urlsDone.includes(url)) {
          console.log(chalk.yellow(`Already processed url: ${url}`));
          return false;
        }
        const psiData = await psi.getUrlPSI(url);
        const psiDataToSave = [
          Math.round(
            psiData.lighthouseResult.categories.performance.score * 100
          ),
          (
            psiData.lighthouseResult.audits.metrics.details.items[0]
              .firstContentfulPaint / 1000
          ).toFixed(1) + " s",
          (
            psiData.lighthouseResult.audits.metrics.details.items[0]
              .interactive / 1000
          ).toFixed(1) + " s"
        ];

        papa.addToFile(
          dataFileOutputPath,
          Object.values(row).concat(psiDataToSave)
        );
      },
      { concurrency: threadsCount }
    );

    console.log(chalk.green(`All ${data.length} done!`));

    console.log(chalk.blue(`Output file: ${dataFileOutputPath}`));

  } catch (err) {
    console.log(chalk.red(err));
  }
};

run();
