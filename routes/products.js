import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/products.js";

export const productsRouter = express.Router();

// Routing
productsRouter
  .route("/products")
  .get(getProducts)
  .post(createProduct)
  .all((req, res) => {
    res.status(405).send(`Method ${req.method} not allowed. Use GET or POST.`);
  });

productsRouter
  .route("/products/:id")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct)
  .all((req, res) => {
    res
      .status(405)
      .send(`Method ${req.method} not allowed. Use GET, PUT, or DELETE`);
  });

// Alternative Routing
// productsRouter.get("/products", getProducts);
// productsRouter.post("/products", createProduct);

// productsRouter.get("/products/:id", getProduct);
// productsRouter.put("/products/:id", updateProduct);
// productsRouter.delete("/products/:id", deleteProduct);
