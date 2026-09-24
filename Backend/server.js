const express = require("express");
const cors = require("cors");
const multer=require("multer");
const {PDFParse}=require("pdf-parse");
const fs=require("fs");

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

app.post("/api/resume/upload", upload.single("resume"),async(req,res)=>{
    try{
        console.log("File Received: ",req.file.originalname);

        const dataBuffer=fs.readFileSync(req.file.path);

        const parser=new PDFParse({
            data:dataBuffer
        });

        const result=await parser.getText();

        console.log("Extracted resume text");
        console.log(result.text);

        await parser.destroy();

        res.json({
            message:"Resume uploaded and text extracted successfully",
            text:result.text
        });
    }
    catch(error){
        console.error("Error processing resume:",error);

        res.status(500).json({
            message:"Failed to process resume!"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});