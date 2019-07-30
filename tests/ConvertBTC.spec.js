const nock = require("nock");
const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chai = require("chai");
const expect = chai.expect;

chai.use(sinonChai);

const convertBTC = require("../src/ConvertBTC");

describe("ConvertBTC", () => {
  let consoleStub;

  const responseMock = {
    "success": true,
    "price": 19108.06,
    "time": "2019-07-30 11:49:46"
  };

  beforeEach(() => {
    consoleStub = sinon.stub(console, "log");
  });

  afterEach(() => {
    console.log.restore();
  });

  it("should use USD as the default currency and 1 as the default amount", (done) => {
    nock("https://apiv2.bitcoinaverage.com")
      .get("/convert/global")
      .query({"from": "BTC", "to": "USD", amount: 1})
      .reply(200, responseMock);

    convertBTC();

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith("1 BTC to USD = 19108.06");
      done();
    }, 300);
  });

  it("should use USD as currency and 10 as the amount", (done) => {
    nock("https://apiv2.bitcoinaverage.com")
      .get("/convert/global")
      .query({"from": "BTC", "to": "USD", amount: 10})
      .reply(200, responseMock);

    convertBTC("USD", 10);

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith("10 BTC to USD = 19108.06");
      done();
    }, 300);
  });

  it("should use BRL as currency and 1 as the amount", (done) => {
    nock("https://apiv2.bitcoinaverage.com")
      .get("/convert/global")
      .query({"from": "BTC", "to": "BRL", amount: 1})
      .reply(200, responseMock);

    convertBTC("BRL");

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith("1 BTC to BRL = 19108.06");
      done();
    }, 300);
  });

  it("should message user when the api throws an error", (done) => {
    nock("https://apiv2.bitcoinaverage.com")
      .get("/convert/global")
      .query({"from": "BTC", "to": "BRL", amount: 1})
      .replyWithError("Error");

    convertBTC("BRL");

    setTimeout(() => {
      expect(consoleStub).to.have.been.calledWith("Something went wrong with the API. Try again in a few minutes.");
      done();
    }, 300);
  });
});
