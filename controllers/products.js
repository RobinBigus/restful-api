import pg from "pg";
const { Client } = pg;

// Get all
export const getProducts = async (req, res) => {
  try {
    const client = new Client({ connectionString: process.env.PG_URI });
    client.connect();

    const result = await client.query("SELECT * FROM products");

    client.end();

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

// Create one
export const createProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    const client = new Client({ connectionString: process.env.PG_URI });
    client.connect();

    const result = await client.query(
      "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *",
      [name, price, description]
    );

    client.end();

    res.status(201).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

// Get one
export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const client = new Client({ connectionString: process.env.PG_URI });
    client.connect();

    const result = await client.query(
      "SELECT (name, description) FROM products WHERE id=$1",
      [id]
    );

    client.end();

    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

// Update one
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    if (!name || !price || !description)
      return res.status(400).send("Please fill out all required fields");

    const client = new Client({ connectionString: process.env.PG_URI });
    client.connect();

    const result = await client.query(
      "UPDATE products SET name=$2, price=$3, description=$4 WHERE id=$1 RETURNING *",
      [id, name, price, description]
    );

    client.end();

    res.status(200).json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send("Something went wrong");
  }
};

// Delete one
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const client = new Client({ connectionString: process.env.PG_URI });
    client.connect();

    const result = await client.query("DELETE FROM products WHERE id=$1", [id]);

    client.end();

    if (result.rowCount > 0) {
      return res.status(200).send("Product deleted successfully");
    } else {
      return res.status(404).send("Product not found or could not be deleted");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something went wrong");
  }
};
