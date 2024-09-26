import express from "express";
import { productsRouter } from "./routes/products.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());
app.use(productsRouter);

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
