const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 5000;
app.use(cors());

app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Backend is running"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});