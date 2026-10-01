import { useState } from "react";
import{useNavigate} from "react-router-dom"



function ResumeUpload(){
    const[resume,setResume]=useState(null);
    const[error,setError]=useState("");
    const[message,setMessage]=useState("");

    const navigate=useNavigate();

async function testBackend() {
    const response=await fetch("http://localhost:5000/api/health");
    const message=await response.text();
    alert(message);
}

    function handleFileChange(event){
        const selectFile=event.target.files[0];
        
        setError("");
        setMessage("");
        if(!selectFile){
            setResume(null);
            return;
        }
        setResume(selectFile);
    }
    async function uploadResume(){
        setError("");
        setMessage("");
            if(!resume){
                setError("Please select a resume first.");
                return;
            }

            const allowedTypes = [
            "application/pdf"
            ];

            if(!allowedTypes.includes(resume.type)){
                setError("Only PDF is  allowed.");
                return;
            }

            const maxSize=5*1024*1024;

            if(resume.size>maxSize){
                setError("File size must be less than 5MB");
                return;
            }

            const formData=new FormData();
            formData.append("resume",resume);

            try{
                const response=await fetch("http://localhost:5000/api/resume/upload",
                    {
                        method:"Post",
                        body: formData
                    }
                );

                const data=await response.json();
                navigate("/results",{
                    state:{
                        analysis:data.analysis
                    }
                })
            }
           catch(error){
                setError("Unable to connect to the backend.");
           }
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
                    <p>Supported formats: PDF</p>
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

                {message &&(
                    <p>
                        {message}
                    </p>
                )}
                <button className="analyze-button" onClick={uploadResume}>Analyze resume</button>
                <button className="analyze-button" onClick={testBackend}>Test Backend</button>
            </section>
            
        </main>
    )
}
export default ResumeUpload;