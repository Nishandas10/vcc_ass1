const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());

const products = [
    { id: 1, name: "Laptop", price: 1000, stock: 5 },
    { id: 2, name: "Smartphone", price: 500, stock: 10 },
    { id: 3, name: "Headphones", price: 100, stock: 20 }
];

app.get("/products", (req, res) => {
    res.json(products);
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});

