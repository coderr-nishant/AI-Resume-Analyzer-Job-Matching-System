async function analyzeResume(resumeText) {
    try{
        const response=await fetch("http://localhost:11434/api/generate", {
        method:"POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            model: "qwen2.5:7b",
            prompt: `You are a resume information extraction system.

                Your task is to read the resume text and extract information that is explicitly supported by the resume.

                The resume may belong to:
                - a student
                - a fresher
                - an experienced professional
                - a technical candidate
                - a non-technical candidate
                - a researcher
                - a person with academic, organizational, volunteer, freelance, or leadership experience

                The resume may use any layout, section names, ordering, or writing style.

                IMPORTANT:
                - Extract information from the resume; do not create information.
                - Do not guess missing information.
                - Do not infer information only because it seems likely.
                - Do not convert assumptions into facts.
                - Do not use "N/A", "Unknown", "Not Available", or similar placeholders.
                - If information is not explicitly available, use an empty string "".
                - Do not duplicate the same item unnecessarily.
                - Preserve the meaning of the resume.
                - Do not add information that is not present in the resume.

                RETURN FORMAT:

                Return ONLY valid JSON.
                Do not return Markdown.
                Do not return explanations.
                Do not return comments.
                Do not return text before or after the JSON.

                Use exactly this structure:

                {
                "skills": [],
                "education": [],
                "experience": [],
                "projects": [],
                "certifications": []
                }

                --------------------------------------------------
                SKILLS
                --------------------------------------------------

                Extract individual skills explicitly mentioned in the resume.

                Return each skill as a separate string.

                For example, if the resume contains:

                "Programming Languages: C, C++, Java, Python"

                return:

                [
                "C",
                "C++",
                "Java",
                "Python"
                ]

                Rules:
                - Do not combine multiple skills into one string.
                - Do not include category names such as "Programming Languages", "Technical Skills", or "Tools" as skills.
                - Do not invent skills.
                - Include technical skills and other explicitly listed professional skills.
                - If no skills are found, return [].

                --------------------------------------------------
                EDUCATION
                --------------------------------------------------

                Extract every education entry explicitly mentioned in the resume.

                For each entry return:

                {
                "degree": "",
                "field": "",
                "year": ""
                }

                Rules:
                - "degree" is the qualification or education level explicitly written in the resume.
                - "field" is the specialization/subject/branch only when explicitly associated with that education entry.
                - "year" is the explicitly stated year, graduation year, expected graduation year, or study period.
                - Do not infer the field from the degree.
                - Do not use generic classifications such as "Engineering", "Secondary School", "Primary School", or "Science" unless the resume explicitly identifies them as the field/subject for that entry.
                - Do not convert Class X or Class XII into another education label.
                - Do not guess missing years.
                - If a field is not explicitly available, use "".
                - If a year is not explicitly available, use "".

                --------------------------------------------------
                EXPERIENCE
                --------------------------------------------------

                Extract experience that is explicitly presented in the resume.

                This can include, when actually presented as experience:
                - employment
                - internships
                - apprenticeships
                - freelance work
                - volunteer work
                - student leadership
                - club positions
                - coordinator roles
                - organizational roles
                - research roles
                - teaching or mentoring roles
                - other relevant positions of responsibility

                For each entry return:

                {
                "role": "",
                "organization": "",
                "responsibilities": []
                }

                Definitions:

                "role":
                The person's title, designation, responsibility, or role.

                Examples:
                - Software Engineer
                - Intern
                - Class Coordinator
                - Club Coordinator
                - PR & Outreach Member
                - Research Intern

                "organization":
                The company, institution, club, organization, team, department, or other entity explicitly associated with that role.

                Examples:
                - ABC Technologies
                - GeeksforGeeks
                - Business and Finance Club
                - XYZ University

                Rules:
                - Keep "role" and "organization" separate.
                - Do not assume that the second part of a phrase is an organization.
                - Use the surrounding resume context to determine the relationship.
                - If an organization is not explicitly identifiable, use "".
                - Do not use "N/A".
                - Do not invent an organization.
                - "responsibilities" must ALWAYS be an array of separate strings.
                - Convert clearly separate bullet points or responsibilities into separate array items.
                - Do not invent responsibilities.
                - If responsibilities are not provided, return [].

                --------------------------------------------------
                PROJECTS
                --------------------------------------------------

                Extract actual projects explicitly described in the resume.

                Projects may appear under headings such as:
                - Projects
                - Academic Projects
                - Personal Projects
                - College Projects
                - Mini Projects
                - Major Projects
                - Final Year Project
                - Capstone Project
                - Research Project
                - Software Projects
                - similar headings

                For each project return:

                {
                "name": "",
                "description": ""
                }

                Rules:
                - Include something as a project only when the resume indicates that the candidate actually worked on, built, developed, designed, implemented, researched, or created it.
                - Do not classify an achievement, award, event, competition, hackathon, workshop, conference, certification, course, club activity, or simple participation as a project by itself.
                - A hackathon or competition may be associated with a project, but only extract the project if the actual project is clearly described.
                - Do not create a project from a competition name alone.
                - Do not invent project descriptions.
                - Keep the description faithful to the resume.
                - If no actual projects are present, return [].

                --------------------------------------------------
                CERTIFICATIONS
                --------------------------------------------------

                Extract certifications explicitly mentioned in the resume.

                For each certification return:

                {
                "name": "",
                "organization": ""
                }

                Rules:
                - "name" is the certification name.
                - "organization" is the issuing organization when explicitly mentioned.
                - Do not confuse certifications with courses, education, skills, achievements, awards, or workshops.
                - Do not invent an issuing organization.
                - If the organization is not available, use "".
                - If no certifications are found, return [].

                --------------------------------------------------
                FINAL VALIDATION
                --------------------------------------------------

                Before returning the answer, verify all of the following:

                1. The response is valid JSON.
                2. The response contains ONLY these top-level keys:
                "skills", "education", "experience", "projects", "certifications"

                3. "skills" is an array of strings.

                4. "education" is an array of objects with exactly:
                "degree", "field", "year"

                5. "experience" is an array of objects with exactly:
                "role", "organization", "responsibilities"

                6. Every "responsibilities" value is an array of strings.

                7. "projects" is an array of objects with exactly:
                "name", "description"

                8. "certifications" is an array of objects with exactly:
                "name", "organization"

                9. Missing information is represented by "" or [].
                10. No "N/A", "Unknown", or guessed information is used.
                11. Multiple skills are never combined into one skill string.
                12. Competitions and hackathons are not automatically classified as projects.
                13. Do not add fields that are not requested.
                14. Do not invent information.

                Resume text:

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