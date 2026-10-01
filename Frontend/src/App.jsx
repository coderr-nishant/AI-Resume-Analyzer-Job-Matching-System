import {BrowserRouter, Routes, Route, useNavigate} from "react-router-dom";
import ResumeUpload from "./pages/ResumeUpload";

import ResumeAnalysis from "./pages/analysis";

function Home(){
  const navigate=useNavigate();
  function handleGetStarted(){
    navigate("/upload");
  }
  return(
    <main className="home">
      <section className="hero">
        <p className="tag-line">AI-Powered Career Assistant</p>
        <h1>AI Resume Analyzer & Job Matching System</h1>
        <p className="description">
           Analyze your resume and discover job roles that match your skills,
           education, and experience.
        </p>

        <button className="button" onClick={handleGetStarted}>Get Started</button>
      </section>
    </main>
  )
}
function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/upload" element={<ResumeUpload/>}/>
        <Route path="/results" element={<ResumeAnalysis/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App;