const express = require("express");
const cors = require("cors");
const multer=require("multer");

const app = express();

const PORT = 5000;
app.use(cors());
const upload=multer({dest:"uploads/"});



app.get("/api/health", (req, res) => {
    res.json({
        status: "OK",
        message: "Backend is running"
    });
});

app.post("/api/resume/upload", upload.single("resume"),(req,res)=>{
    console.log(req.file);

    res.json({
        message:"Resume uploaded Successfully!",
        file: req.file
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});