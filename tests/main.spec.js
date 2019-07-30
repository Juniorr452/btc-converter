const expect = require("chai").expect;
const pkg = require("../package.json");

const exec = require("child_process").exec;
const btcConverter = "node .\\src\\main.js";

describe("Main CLI", () => {
  it("should return the current version", (done) => {
    exec(`${btcConverter} --version`, (err, stdout, stderr) => {
      if(err) throw err;
      expect(stdout.replace("\n", "")).to.be.equal(pkg.version);
      done();
    });
  });

  it("should return the currency option when btc-converter --help", (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if(err) throw err;
      expect(stdout.includes("--currency")).to.be.true;
      done();
    });
  });

  it("should return the amount option when btc-converter --help", (done) => {
    exec(`${btcConverter} --help`, (err, stdout, stderr) => {
      if(err) throw err;
      expect(stdout.includes("--amount")).to.be.true;
      done();
    });
  });
});
