const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json);

app.use(cors());

app.post("/payment", async (req, res) => {
  console.log("OLAAAAAAA")
  console.log(req.body);
  let { amount, id } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "BRL",
      description: "Produto em teste",
      payment_method: id,
      confirm: true,
    });
    console.log("Payment", payment);
    res.json({
      message: "Pagamento realizado com sucesso",
      success: true,
    });
  } catch (error) {
    console.log("Deu ruim", error),
      res.json({
        message: "Pagemento falhou",
        success: false,
      });
  }
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Server ativado na porta 4000");
});
