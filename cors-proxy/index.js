const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send("Missing url query parameter");

    try {
        const response = await axios.get(url, {
            responseType: "arraybuffer", // <- necessário para binários
        });

        // Define o content-type da resposta original (por ex: image/jpeg)
        res.set("Content-Type", response.headers["content-type"]);

        // Retorna o corpo binário da imagem
        res.end(response.data, "binary");
    } catch (error) {
        res.status(500).send("Error in proxying request: " + error.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`CORS proxy running on port ${PORT}`);
});
