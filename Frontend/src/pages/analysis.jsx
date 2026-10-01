
import { useLocation } from "react-router-dom";

function Resumeanalysis() {
  const location = useLocation();

  const analysis = location.state?.analysis;

  if (!analysis) {
    return (
      <main className="analysis-page">
        <section className="analysis-container">
          <h1>No analysis available</h1>
          <p>Please upload and analyze a resume first.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="analysis-page">

      <section className="analysis-container">

        <p className="tagline">
          AI-Powered Career Assistant
        </p>

        <h1>Resume Analysis</h1>

        {/* Skills */}
        <div className="analysis-card">
          <h2>Skills</h2>

          <div className="skills-container">
            {analysis.skills.length > 0 ? (
              analysis.skills.map((skill, index) => (
                <span className="skill-badge" key={index}>
                  {skill}
                </span>
              ))
            ) : (
              <p>No skills found.</p>
            )}
          </div>
        </div>

        {/* Education */}
        <div className="analysis-card">
          <h2>Education</h2>

          {analysis.education.length > 0 ? (
            analysis.education.map((education, index) => (
              <div className="education-detail" key={index}>

                <h3>{education.degree}</h3>

                {education.field && (
                  <p>{education.field}</p>
                )}

                {education.year && (
                  <p>{education.year}</p>
                )}

              </div>
            ))
          ) : (
            <p>No education information found.</p>
          )}
        </div>

        {/* Experience */}
        <div className="analysis-card">
          <h2>Experience</h2>

          {analysis.experience.length > 0 ? (
            analysis.experience.map((experience, index) => (
              <div className="experience-detail" key={index}>

                <h3>{experience.role}</h3>

                {experience.organization && (
                  <p className="experience-organization">
                    {experience.organization}
                  </p>
                )}

                {Array.isArray(experience.responsibilities) &&
                  experience.responsibilities.length > 0 && (
                    <ul>
                      {experience.responsibilities.map(
                        (responsibility, responsibilityIndex) => (
                          <li key={responsibilityIndex}>
                            {responsibility}
                          </li>
                        )
                      )}
                    </ul>
                  )}

              </div>
            ))
          ) : (
            <p>No experience found.</p>
          )}
        </div>

        {/* Projects */}
        <div className="analysis-card">
          <h2>Projects</h2>

          {analysis.projects.length > 0 ? (
            analysis.projects.map((project, index) => (
              <div className="project-detail" key={index}>

                <h3>{project.name}</h3>

                <p>{project.description}</p>

              </div>
            ))
          ) : (
            <p>No projects found.</p>
          )}
        </div>

        {/* Certifications */}
        <div className="analysis-card">
          <h2>Certifications</h2>

          {analysis.certifications.length > 0 ? (
            analysis.certifications.map((certification, index) => (
              <div className="certification-item" key={index}>

                <h3>{certification.name}</h3>

                {certification.organization && (
                  <p>{certification.organization}</p>
                )}

              </div>
            ))
          ) : (
            <p>No certifications found.</p>
          )}
        </div>

      </section>

    </main>
  );
}

export default Resumeanalysis;

