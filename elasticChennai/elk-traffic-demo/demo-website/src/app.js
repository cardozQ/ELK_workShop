const express = require("express");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const requestLogger = require("./middleware/requestLogger");
const latency = require("./middleware/latency");
const forceError = require("./middleware/forceError");
const randomFailure = require("./middleware/randomFailure");
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(requestLogger);
app.use(latency);
app.use(forceError);
app.use(randomFailure);
app.use(cors({
  origin: 'http://localhost:5173'
}));

// Routes
app.use("/products", productRoutes);
app.use("/cart", cartRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "demo-ecommerce" });
});

module.exports = app;
