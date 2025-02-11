const express = require("express");
const axios = require("axios");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 8080;
const SERVER_API = "http://192.168.56.5:3000/products";


app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

app.get("/fetch-products", async (req, res) => {
    try {
        const response = await axios.get(SERVER_API);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching products" });
    }
});

app.listen(PORT, () => {
    console.log(`Client server running on http://0.0.0.0:${PORT}`);
});

