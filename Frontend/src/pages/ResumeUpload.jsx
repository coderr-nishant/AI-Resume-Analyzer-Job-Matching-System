import { useState } from "react";




function ResumeUpload(){
    const[resume,setResume]=useState(null);
    const[error,setError]=useState("");

async function testBackend() {
    const response=await fetch("http://localhost:5000/api/health");
    const message=await response.text();
    alert(message);
}

    function handleFileChange(event){
        const selectFile=event.target.files[0];
        
        setError("");

        if(!selectFile){
            setResume(null);
            return;
        }
        setResume(selectFile);
    }
    function validateResume(){
            if(!resume){
                setError("Please select a resume first.");
                return;
            }

            const allowedTypes = [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ];

            if(!allowedTypes.includes(resume.type)){
                setError("Only PDF, DOC, and DOCX files are allowed.");
                return;
            }

            const maxSize=5*1024*1024;

            if(resume.size>maxSize){
                setError("File size must be less than 5MB");
                return;
            }

            setError("");
            alert("Resume is valid and ready for analysis");
        }
    return(
        <main className="upload-page">
            <section className="upload-card">
                <p className="tag-line">AI-Powered Career Assistant</p>
                <h1>Uplaod your resume</h1>

                <p className="upload-description">
                Upload your resume to analyze your skills, education and experience.
                </p>

                <div className="file-box">
                    <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange}/>
                    <p>Supported formats: PDF, DOC, DOCX</p>
                    <p>Maximum file size: 5 MB</p>
                </div>
                {resume &&(
                    <p>
                        Selected file: <strong>{resume.name}</strong>
                    </p>
                )}

                {error &&(
                    <p className="error-message">
                        {error}
                    </p>
                )}
                <button className="analyze-button" onClick={validateResume}>Analyze resume</button>
                <button className="analyze-button" onClick={testBackend}>Test Backend</button>
            </section>
            
        </main>
    )
}
export default ResumeUpload;