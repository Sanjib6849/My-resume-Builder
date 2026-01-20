import React from 'react';

const PreviewPanel = ({ resumeData, template }) => {
  const { personalInfo, experience, education, skills, projects, certifications, languages } = resumeData;

  // Template styles
  const templateStyles = {
    modern: {
      container: 'bg-white',
      header: 'bg-blue-600 text-white p-8',
      section: 'mb-6',
      sectionTitle: 'text-xl font-bold text-blue-600 border-b-2 border-blue-600 pb-2 mb-3',
      text: 'text-gray-700'
    },
    classic: {
      container: 'bg-white',
      header: 'border-b-4 border-gray-800 p-6',
      section: 'mb-6',
      sectionTitle: 'text-xl font-bold text-gray-800 uppercase mb-3',
      text: 'text-gray-700'
    },
    creative: {
      container: 'bg-gradient-to-br from-purple-50 to-pink-50',
      header: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8 rounded-t-lg',
      section: 'mb-6',
      sectionTitle: 'text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3',
      text: 'text-gray-700'
    },
    minimal: {
      container: 'bg-white',
      header: 'p-6',
      section: 'mb-6',
      sectionTitle: 'text-lg font-semibold text-gray-900 mb-3',
      text: 'text-gray-600'
    },
    professional: {
      container: 'bg-white',
      header: 'bg-gray-900 text-white p-8',
      section: 'mb-6',
      sectionTitle: 'text-xl font-bold text-gray-900 mb-3 border-l-4 border-gray-900 pl-3',
      text: 'text-gray-700'
    },
    bold: {
      container: 'bg-black text-white',
      header: 'bg-yellow-400 text-black p-8',
      section: 'mb-6',
      sectionTitle: 'text-xl font-bold text-yellow-400 mb-3',
      text: 'text-gray-300'
    },
    executive: {
      container: 'bg-gray-50',
      header: 'bg-gradient-to-r from-slate-800 to-slate-900 text-white p-10',
      section: 'mb-8',
      sectionTitle: 'text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-300',
      text: 'text-gray-800'
    }
  };

  const style = templateStyles[template.id] || templateStyles.modern;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Preview</h2>
        <span className="text-sm text-gray-500">Template: {template.name}</span>
      </div>

      {/* Resume Preview */}
      <div className={`${style.container} shadow-lg rounded-lg overflow-hidden border border-gray-200 resume-preview-content`} style={{ minHeight: '800px' }}>
        {/* Header */}
        <div className={style.header}>
          <h1 className="text-3xl font-bold mb-2">{personalInfo.fullName}</h1>
          <div className="flex flex-wrap gap-4 text-sm">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>{personalInfo.phone}</span>}
            {personalInfo.location && <span>{personalInfo.location}</span>}
          </div>
          {personalInfo.linkedin && (
            <div className="mt-2 text-sm">
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>

        <div className="p-8">
          {/* Summary */}
          {personalInfo.summary && (
            <div className={style.section}>
              <h2 className={style.sectionTitle}>Professional Summary</h2>
              <p className={style.text}>{personalInfo.summary}</p>
            </div>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <div className={style.section}>
              <h2 className={style.sectionTitle}>Work Experience</h2>
              {experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                      <p className="text-gray-700">{exp.company} {exp.location && `- ${exp.location}`}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className={`${style.text} text-sm mt-2`}>{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {education.length > 0 && (
            <div className={style.section}>
              <h2 className={style.sectionTitle}>Education</h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                      <p className="text-gray-700">{edu.school}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                  {edu.gpa && <p className={`${style.text} text-sm mt-1`}>GPA: {edu.gpa}</p>}
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {(skills.technical.length > 0 || skills.soft.length > 0) && (
            <div className={style.section}>
              <h2 className={style.sectionTitle}>Skills</h2>
              {skills.technical.length > 0 && (
                <div className="mb-2">
                  <span className="font-semibold text-gray-900">Technical: </span>
                  <span className={style.text}>{skills.technical.join(', ')}</span>
                </div>
              )}
              {skills.soft.length > 0 && (
                <div>
                  <span className="font-semibold text-gray-900">Soft Skills: </span>
                  <span className={style.text}>{skills.soft.join(', ')}</span>
                </div>
              )}
            </div>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <div className={style.section}>
              <h2 className={style.sectionTitle}>Projects</h2>
              {projects.map((project) => (
                <div key={project.id} className="mb-4">
                  <h3 className="font-semibold text-gray-900">{project.name}</h3>
                  <p className={`${style.text} text-sm mt-1`}>{project.description}</p>
                  {project.technologies.length > 0 && (
                    <p className="text-sm text-gray-600 mt-1">
                      <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                    </p>
                  )}
                  {project.link && (
                    <p className="text-sm text-blue-600 mt-1">{project.link}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {certifications.length > 0 && (
            <div className={style.section}>
              <h2 className={style.sectionTitle}>Certifications</h2>
              {certifications.map((cert) => (
                <div key={cert.id} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-900">{cert.name}</h3>
                      <p className="text-gray-700">{cert.issuer}</p>
                    </div>
                    <span className="text-sm text-gray-600 whitespace-nowrap ml-4">
                      {cert.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {languages.length > 0 && (
            <div className={style.section}>
              <h2 className={style.sectionTitle}>Languages</h2>
              <div className="grid grid-cols-2 gap-2">
                {languages.map((lang) => (
                  <div key={lang.id}>
                    <span className="font-semibold text-gray-900">{lang.language}</span>
                    <span className={`${style.text} text-sm`}> - {lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;