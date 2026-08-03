// ================================================
// SERVER.JS — ponto de entrada único do backend.
// Aqui só "ligamos as peças". A lógica de cada
// módulo fica nos ficheiros de routes/controllers.
// ================================================
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const rotasChat = require("./routes/chat");
const rotasFinanceiro = require("./routes/financeiro");
const rotasAgenda = require("./routes/agenda");

const app = express();
app.use(cors());
app.use(express.json());

// Cada módulo tem o seu próprio prefixo de rota.
// Se um módulo tiver erro, os outros continuam a funcionar.
app.use("/api/chat", rotasChat);
app.use("/api/financeiro", rotasFinanceiro);
app.use("/api/agenda", rotasAgenda);

app.get("/", (req, res) => {
  res.send("Backend do Meu Portfólio IA está no ar 🚀");
});

const PORTA = process.env.PORT || 3000;
app.listen(PORTA, () => {
  console.log(`Servidor a correr na porta ${PORTA}`);
});
