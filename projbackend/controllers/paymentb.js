var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "frgwwk54ps5dzzgw",
  publicKey: "hp3h6zvvg5zbn8m3",
  privateKey: "2a7f7934663a746c83b24861f72098bb"
});
  

// getting a token
exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, function (error, response) {
        if(error) {
            res.status(500).send(error)
        }
        else {
            res.send(response)
        }
      });

}


exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (error, result) {
          if(error) {
              res.status(500).json(error)
          }
          else {
              res.json(result)
          }
      });
    
}