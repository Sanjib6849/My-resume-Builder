// Mock data for resume builder

export const mockResumeData = {
  personalInfo: {
    fullName: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.com',
    summary: 'Experienced software engineer with 5+ years of expertise in full-stack development. Passionate about building scalable applications and leading technical teams.'
  },
  experience: [
    {
      id: '1',
      company: 'Tech Corp',
      position: 'Senior Software Engineer',
      location: 'San Francisco, CA',
      startDate: '2021-01',
      endDate: 'Present',
      current: true,
      description: 'Led development of microservices architecture serving 1M+ users. Mentored junior engineers and improved team productivity by 40%.'
    },
    {
      id: '2',
      company: 'StartUp Inc',
      position: 'Full Stack Developer',
      location: 'Remote',
      startDate: '2019-06',
      endDate: '2020-12',
      current: false,
      description: 'Built and deployed web applications using React and Node.js. Collaborated with design team to create user-friendly interfaces.'
    }
  ],
  education: [
    {
      id: '1',
      school: 'University of California',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      location: 'Berkeley, CA',
      startDate: '2015-09',
      endDate: '2019-05',
      gpa: '3.8'
    }
  ],
  skills: {
    technical: ['JavaScript', 'React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'],
    soft: ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration']
  },
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Built a full-stack e-commerce platform with payment integration',
      technologies: ['React', 'Node.js', 'Stripe'],
      link: 'github.com/johndoe/ecommerce'
    }
  ],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2022-03'
    }
  ],
  languages: [
    { id: '1', language: 'English', proficiency: 'Native' },
    { id: '2', language: 'Spanish', proficiency: 'Professional' }
  ],
  customSections: []
};

export const mockTemplates = [
  { id: 'modern', name: 'Modern', description: 'Clean and contemporary design' },
  { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
  { id: 'creative', name: 'Creative', description: 'Stand out with bold design' },
  { id: 'minimal', name: 'Minimal', description: 'Simple and elegant' },
  { id: 'professional', name: 'Professional', description: 'Corporate-friendly format' },
  { id: 'bold', name: 'Bold', description: 'Make a strong impression' },
  { id: 'executive', name: 'Executive', description: 'Premium design for senior roles' }
];

export const mockAISuggestions = {
  experienceDescriptions: [
    'Spearheaded the development of a microservices architecture, resulting in 50% improved system scalability',
    'Implemented CI/CD pipelines reducing deployment time by 60% and improving code quality',
    'Collaborated with cross-functional teams to deliver features on time and within budget'
  ],
  skills: [
    'TypeScript', 'GraphQL', 'Kubernetes', 'PostgreSQL', 'Redis', 'Jest', 'Git'
  ],
  summaries: [
    'Results-driven software engineer with proven track record of delivering high-quality solutions',
    'Innovative developer passionate about creating efficient, scalable applications',
    'Tech-savvy professional with strong problem-solving skills and collaborative mindset'
  ]
};

export const mockExportFunctions = {
  exportToPDF: (resumeData, template) => {
    console.log('Exporting to PDF...', { resumeData, template });
    setTimeout(() => {
      alert('PDF download started! (Mock)');
    }, 500);
  },
  exportToWord: (resumeData, template) => {
    console.log('Exporting to Word...', { resumeData, template });
    setTimeout(() => {
      alert('Word document download started! (Mock)');
    }, 500);
  },
  exportToText: (resumeData) => {
    console.log('Exporting to Plain Text...', resumeData);
    setTimeout(() => {
      alert('Plain text download started! (Mock)');
    }, 500);
  }
};

export const getAISuggestions = async (type, context) => {
  console.log('Getting AI suggestions...', { type, context });
  return new Promise((resolve) => {
    setTimeout(() => {
      if (type === 'experience') {
        resolve(mockAISuggestions.experienceDescriptions);
      } else if (type === 'skills') {
        resolve(mockAISuggestions.skills);
      } else if (type === 'summary') {
        resolve(mockAISuggestions.summaries);
      }
    }, 1000);
  });
};

// ATS Analyzer Mock Function
export const analyzeATSScore = async (resumeData, jobDescription) => {
  console.log('Analyzing ATS compatibility...', { resumeData, jobDescription });
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock ATS analysis results
      const score = Math.floor(Math.random() * 30) + 65; // Random score between 65-95
      
      resolve({
        score: score,
        scoreDescription: score >= 80 
          ? 'Excellent! Your resume is highly ATS-compatible' 
          : score >= 60 
          ? 'Good, but there\'s room for improvement' 
          : 'Needs improvement for better ATS compatibility',
        missingKeywords: [
          'Kubernetes',
          'CI/CD',
          'Agile',
          'Cloud Architecture',
          'REST APIs',
          'Microservices'
        ],
        matchingKeywords: [
          'JavaScript',
          'React',
          'Node.js',
          'Python',
          'AWS',
          'Docker',
          'MongoDB'
        ],
        recommendations: [
          'Add more quantifiable achievements with specific metrics (e.g., "increased performance by 40%")',
          'Include relevant technical keywords from the job description in your experience section',
          'Use standard section headings like "Work Experience" instead of creative alternatives',
          'Add a skills section with both hard and soft skills mentioned in the job posting',
          'Keep formatting simple - avoid tables, text boxes, and complex layouts that ATS cannot parse',
          'Use standard date formats (MM/YYYY) for all positions',
          'Include relevant certifications mentioned in the job requirements'
        ],
        formattingIssues: [
          'Consider using a simpler template for better ATS parsing',
          'Ensure all section headings are clearly labeled',
          'Avoid using headers and footers as they may not be read by ATS'
        ]
      });
    }, 2000); // 2 second delay to simulate API call
  });
};