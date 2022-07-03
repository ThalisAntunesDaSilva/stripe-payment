const express = require("express");
const app = express();
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const cors = require("cors");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

/*
app.get("/v1/products", async (req, res) => {
  try {
    const products = await stripe.products.list({
      limit: 3,
    });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
});
*/

app.post("/payment", async (req, res) => {
  console.log(req.body);
  let { amount, id } = req.body;
  console.log(amount);
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "BRL",
      description: "Controle de video game",
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
