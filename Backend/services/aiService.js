async function analyzeResume(resumeText) {
    try{
        const response=await fetch("http://localhost:11434/api/generate", {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
        model: "qwen2.5:7b",
        prompt: `Analyze the following resume and extract the candidate's information.

                Return ONLY valid JSON.
                Do not include markdown.
                Do not include explanations.
                Do not include any text before or after the JSON.

                Use exactly this structure:

            {
                "skills": [],
                "education": [],
                "experience": [],
                "projects": [],
                "certifications": []
            }
            Resume:
            ${resumeText}`,
            stream: false,
            format:"json"
        })
    });

    if(!response.ok){
        throw new Error("Ollama request failed");
    }

    const data = await response.json();
    const analysis=JSON.parse(data.response);   //Converts AI response to object type so that JS can work with it properly
    return analysis;

    } catch(error){
        console.error("AI analysis error:",error);
        throw new error("Failed to analyze the resume with AI.")
    }
    
}

module.exports = { analyzeResume };