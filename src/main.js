#!/usr/bin/env node

const program = require("commander");
const pkg = require("../package.json");
const convertBTC = require("./ConvertBTC");

program
  .version(pkg.version)
  .description(pkg.description)
  .option("-C, --currency <currency>", "Currency to be convert to. (Default: USD)")
  .option("-A, --amount <amount>", "Value (in Bitcoin) to convert. (Default: 1)")
  .parse(process.argv);

console.log(convertBTC(program.currency, program.amount));
