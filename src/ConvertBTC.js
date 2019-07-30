const request = require("request");

function convertBTC(currency = "USD", amount = 1) {
  const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;

  request(url, (error, response, body) => {
    try {
      let apiResponse = JSON.parse(body);
      console.log(`${amount} BTC to ${currency} = ${apiResponse.price}`);
    } catch(parseError) {
      console.log("Something went wrong with the API. Try again in a few minutes.");
    }
  });
}

module.exports = convertBTC;
