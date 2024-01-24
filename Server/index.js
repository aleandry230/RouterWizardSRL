const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const https = require("https");
const fs = require("fs");

const createAuthRoutes = require("./Routes/Auth");
const createProductRoutes = require("./Routes/Products");
const createEcommerceRoutes = require("./Routes/Ecommerce");

const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "ecommerce",
});

const app = express();
app.use(express.static("public"));
const PORT = 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://www.aziendaagricolabianco.com",
      "https://admin.aziendaagricolabianco.com",
    ],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(
  session({
    secret: "T^pX#z1$0%V@l2&nHbO8yGcLsAaE!WuPq4Rv7*3Sd9MwYjNfCmKgJiBkD5F",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 172800000,
    },
  })
);
app.use(cookieParser());

const authRoutes = createAuthRoutes(db);
app.use("/Auth", authRoutes);

const productRoutes = createProductRoutes(db);
app.use("/Products", productRoutes);

const ecommerceRoutes = createEcommerceRoutes(db);
app.use("/Ecommerce", ecommerceRoutes);

// Avvia il server su HTTPS
app.listen(PORT, () => {
  console.log(
    `Server Express in ascolto sulla porta ${PORT} in modalità HTTPS`
  );
});
