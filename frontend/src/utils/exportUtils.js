import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * Export utilities for resume downloads
 */

// Export resume as PDF
export const exportToPDF = async (resumeData, template) => {
  try {
    // Get the preview element
    const previewElement = document.querySelector('.resume-preview-content');
    
    if (!previewElement) {
      throw new Error('Resume preview not found');
    }

    // Convert HTML to canvas
    const canvas = await html2canvas(previewElement, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff'
    });

    // Calculate PDF dimensions
    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Download
    const fileName = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
    pdf.save(fileName);

    return true;
  } catch (error) {
    console.error('PDF Export Error:', error);
    throw error;
  }
};

// Export resume as plain text
export const exportToText = (resumeData) => {
  try {
    let textContent = '';

    // Personal Info
    const { personalInfo } = resumeData;
    textContent += `${personalInfo.fullName}\n`;
    textContent += `${personalInfo.email} | ${personalInfo.phone}\n`;
    textContent += `${personalInfo.location}\n`;
    if (personalInfo.linkedin) textContent += `LinkedIn: ${personalInfo.linkedin}\n`;
    if (personalInfo.website) textContent += `Website: ${personalInfo.website}\n`;
    textContent += `\n`;

    // Summary
    if (personalInfo.summary) {
      textContent += `PROFESSIONAL SUMMARY\n`;
      textContent += `${'-'.repeat(50)}\n`;
      textContent += `${personalInfo.summary}\n\n`;
    }

    // Work Experience
    if (resumeData.experience && resumeData.experience.length > 0) {
      textContent += `WORK EXPERIENCE\n`;
      textContent += `${'-'.repeat(50)}\n`;
      resumeData.experience.forEach(exp => {
        textContent += `\n${exp.position} at ${exp.company}\n`;
        textContent += `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
        if (exp.location) textContent += ` | ${exp.location}`;
        textContent += `\n${exp.description}\n`;
      });
      textContent += `\n`;
    }

    // Education
    if (resumeData.education && resumeData.education.length > 0) {
      textContent += `EDUCATION\n`;
      textContent += `${'-'.repeat(50)}\n`;
      resumeData.education.forEach(edu => {
        textContent += `\n${edu.degree} in ${edu.field}\n`;
        textContent += `${edu.school}`;
        if (edu.location) textContent += ` | ${edu.location}`;
        textContent += `\n${edu.startDate} - ${edu.endDate}`;
        if (edu.gpa) textContent += ` | GPA: ${edu.gpa}`;
        textContent += `\n`;
      });
      textContent += `\n`;
    }

    // Skills
    if (resumeData.skills) {
      textContent += `SKILLS\n`;
      textContent += `${'-'.repeat(50)}\n`;
      if (resumeData.skills.technical && resumeData.skills.technical.length > 0) {
        textContent += `Technical: ${resumeData.skills.technical.join(', ')}\n`;
      }
      if (resumeData.skills.soft && resumeData.skills.soft.length > 0) {
        textContent += `Soft Skills: ${resumeData.skills.soft.join(', ')}\n`;
      }
      textContent += `\n`;
    }

    // Projects
    if (resumeData.projects && resumeData.projects.length > 0) {
      textContent += `PROJECTS\n`;
      textContent += `${'-'.repeat(50)}\n`;
      resumeData.projects.forEach(proj => {
        textContent += `\n${proj.name}\n`;
        textContent += `${proj.description}\n`;
        if (proj.technologies && proj.technologies.length > 0) {
          textContent += `Technologies: ${proj.technologies.join(', ')}\n`;
        }
        if (proj.link) textContent += `Link: ${proj.link}\n`;
      });
      textContent += `\n`;
    }

    // Certifications
    if (resumeData.certifications && resumeData.certifications.length > 0) {
      textContent += `CERTIFICATIONS\n`;
      textContent += `${'-'.repeat(50)}\n`;
      resumeData.certifications.forEach(cert => {
        textContent += `${cert.name} - ${cert.issuer} (${cert.date})\n`;
      });
      textContent += `\n`;
    }

    // Languages
    if (resumeData.languages && resumeData.languages.length > 0) {
      textContent += `LANGUAGES\n`;
      textContent += `${'-'.repeat(50)}\n`;
      resumeData.languages.forEach(lang => {
        textContent += `${lang.language}: ${lang.proficiency}\n`;
      });
    }

    // Create and download file
    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Text Export Error:', error);
    throw error;
  }
};

// Export resume as Word document (using HTML format that Word can open)
export const exportToWord = (resumeData, template) => {
  try {
    // Create HTML content for Word
    let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${resumeData.personalInfo.fullName} - Resume</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
    h1 { font-size: 28px; margin-bottom: 10px; color: #333; }
    h2 { font-size: 20px; border-bottom: 2px solid #333; padding-bottom: 5px; margin-top: 20px; }
    .contact-info { margin-bottom: 20px; color: #666; }
    .section { margin-bottom: 25px; }
    .experience-item, .education-item, .project-item { margin-bottom: 15px; }
    .job-title { font-weight: bold; font-size: 16px; }
    .company { color: #555; }
    .date { color: #888; float: right; }
    ul { margin: 5px 0; padding-left: 20px; }
  </style>
</head>
<body>
`;

    // Personal Info
    const { personalInfo } = resumeData;
    htmlContent += `<h1>${personalInfo.fullName}</h1>`;
    htmlContent += `<div class="contact-info">`;
    htmlContent += `${personalInfo.email} | ${personalInfo.phone} | ${personalInfo.location}`;
    if (personalInfo.linkedin) htmlContent += ` | ${personalInfo.linkedin}`;
    if (personalInfo.website) htmlContent += ` | ${personalInfo.website}`;
    htmlContent += `</div>`;

    // Summary
    if (personalInfo.summary) {
      htmlContent += `<div class="section">`;
      htmlContent += `<h2>Professional Summary</h2>`;
      htmlContent += `<p>${personalInfo.summary}</p>`;
      htmlContent += `</div>`;
    }

    // Experience
    if (resumeData.experience && resumeData.experience.length > 0) {
      htmlContent += `<div class="section">`;
      htmlContent += `<h2>Work Experience</h2>`;
      resumeData.experience.forEach(exp => {
        htmlContent += `<div class="experience-item">`;
        htmlContent += `<div class="job-title">${exp.position}</div>`;
        htmlContent += `<div class="company">${exp.company}${exp.location ? ` - ${exp.location}` : ''}</div>`;
        htmlContent += `<div class="date">${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}</div>`;
        htmlContent += `<p>${exp.description}</p>`;
        htmlContent += `</div>`;
      });
      htmlContent += `</div>`;
    }

    // Education
    if (resumeData.education && resumeData.education.length > 0) {
      htmlContent += `<div class="section">`;
      htmlContent += `<h2>Education</h2>`;
      resumeData.education.forEach(edu => {
        htmlContent += `<div class="education-item">`;
        htmlContent += `<div class="job-title">${edu.degree} in ${edu.field}</div>`;
        htmlContent += `<div class="company">${edu.school}</div>`;
        htmlContent += `<div class="date">${edu.startDate} - ${edu.endDate}</div>`;
        if (edu.gpa) htmlContent += `<p>GPA: ${edu.gpa}</p>`;
        htmlContent += `</div>`;
      });
      htmlContent += `</div>`;
    }

    // Skills
    if (resumeData.skills) {
      htmlContent += `<div class="section">`;
      htmlContent += `<h2>Skills</h2>`;
      if (resumeData.skills.technical && resumeData.skills.technical.length > 0) {
        htmlContent += `<p><strong>Technical:</strong> ${resumeData.skills.technical.join(', ')}</p>`;
      }
      if (resumeData.skills.soft && resumeData.skills.soft.length > 0) {
        htmlContent += `<p><strong>Soft Skills:</strong> ${resumeData.skills.soft.join(', ')}</p>`;
      }
      htmlContent += `</div>`;
    }

    // Projects
    if (resumeData.projects && resumeData.projects.length > 0) {
      htmlContent += `<div class="section">`;
      htmlContent += `<h2>Projects</h2>`;
      resumeData.projects.forEach(proj => {
        htmlContent += `<div class="project-item">`;
        htmlContent += `<div class="job-title">${proj.name}</div>`;
        htmlContent += `<p>${proj.description}</p>`;
        if (proj.technologies && proj.technologies.length > 0) {
          htmlContent += `<p><strong>Technologies:</strong> ${proj.technologies.join(', ')}</p>`;
        }
        if (proj.link) htmlContent += `<p><strong>Link:</strong> ${proj.link}</p>`;
        htmlContent += `</div>`;
      });
      htmlContent += `</div>`;
    }

    // Certifications
    if (resumeData.certifications && resumeData.certifications.length > 0) {
      htmlContent += `<div class="section">`;
      htmlContent += `<h2>Certifications</h2>`;
      htmlContent += `<ul>`;
      resumeData.certifications.forEach(cert => {
        htmlContent += `<li>${cert.name} - ${cert.issuer} (${cert.date})</li>`;
      });
      htmlContent += `</ul>`;
      htmlContent += `</div>`;
    }

    // Languages
    if (resumeData.languages && resumeData.languages.length > 0) {
      htmlContent += `<div class="section">`;
      htmlContent += `<h2>Languages</h2>`;
      htmlContent += `<ul>`;
      resumeData.languages.forEach(lang => {
        htmlContent += `<li>${lang.language}: ${lang.proficiency}</li>`;
      });
      htmlContent += `</ul>`;
      htmlContent += `</div>`;
    }

    htmlContent += `</body></html>`;

    // Create and download file
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return true;
  } catch (error) {
    console.error('Word Export Error:', error);
    throw error;
  }
};
