import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, Trash2, Sparkles, GripVertical } from 'lucide-react';
import { aiAPI } from '../api/client';
import { toast } from '../hooks/use-toast';

const EditorPanel = ({ resumeData, setResumeData }) => {
  const [loadingAI, setLoadingAI] = useState(false);

  const handlePersonalInfoChange = (field, value) => {
    setResumeData({
      ...resumeData,
      personalInfo: { ...resumeData.personalInfo, [field]: value }
    });
  };

  const handleExperienceChange = (id, field, value) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    });
  };

  const addExperience = () => {
    setResumeData({
      ...resumeData,
      experience: [
        ...resumeData.experience,
        {
          id: Date.now().toString(),
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    });
  };

  const deleteExperience = (id) => {
    setResumeData({
      ...resumeData,
      experience: resumeData.experience.filter(exp => exp.id !== id)
    });
  };

  const handleEducationChange = (id, field, value) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    });
  };

  const addEducation = () => {
    setResumeData({
      ...resumeData,
      education: [
        ...resumeData.education,
        {
          id: Date.now().toString(),
          school: '',
          degree: '',
          field: '',
          location: '',
          startDate: '',
          endDate: '',
          gpa: ''
        }
      ]
    });
  };

  const deleteEducation = (id) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter(edu => edu.id !== id)
    });
  };

  const handleProjectChange = (id, field, value) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.map(proj =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    });
  };

  const addProject = () => {
    setResumeData({
      ...resumeData,
      projects: [
        ...resumeData.projects,
        {
          id: Date.now().toString(),
          name: '',
          description: '',
          technologies: [],
          link: ''
        }
      ]
    });
  };

  const deleteProject = (id) => {
    setResumeData({
      ...resumeData,
      projects: resumeData.projects.filter(proj => proj.id !== id)
    });
  };

  const handleCertificationChange = (id, field, value) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.map(cert =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    });
  };

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [
        ...resumeData.certifications,
        {
          id: Date.now().toString(),
          name: '',
          issuer: '',
          date: ''
        }
      ]
    });
  };

  const deleteCertification = (id) => {
    setResumeData({
      ...resumeData,
      certifications: resumeData.certifications.filter(cert => cert.id !== id)
    });
  };

  const handleLanguageChange = (id, field, value) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.map(lang =>
        lang.id === id ? { ...lang, [field]: value } : lang
      )
    });
  };

  const addLanguage = () => {
    setResumeData({
      ...resumeData,
      languages: [
        ...resumeData.languages,
        {
          id: Date.now().toString(),
          language: '',
          proficiency: ''
        }
      ]
    });
  };

  const deleteLanguage = (id) => {
    setResumeData({
      ...resumeData,
      languages: resumeData.languages.filter(lang => lang.id !== id)
    });
  };

  const handleAISuggestion = async (type) => {
    setLoadingAI(true);
    try {
      const response = await aiAPI.getSuggestions(type, '');
      const suggestions = response.suggestions;
      
      toast({
        title: "AI Suggestions Ready",
        description: `Generated ${suggestions.length} suggestions for ${type}`,
      });
      
      // Log suggestions for now (will show in UI later)
      console.log('AI Suggestions:', suggestions);
      
      // TODO: Show suggestions in a modal or dropdown for user to select
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI suggestions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Edit Your Resume</h2>
        <p className="text-gray-600 text-sm">Fill in your information to create a professional resume</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="more">More</TabsTrigger>
        </TabsList>

        {/* Personal Info Tab */}
        <TabsContent value="personal" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={resumeData.personalInfo.fullName}
              onChange={(e) => handlePersonalInfoChange('fullName', e.target.value)}
              placeholder="John Doe"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={resumeData.personalInfo.location}
              onChange={(e) => handlePersonalInfoChange('location', e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={resumeData.personalInfo.linkedin}
                onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={resumeData.personalInfo.website}
                onChange={(e) => handlePersonalInfoChange('website', e.target.value)}
                placeholder="johndoe.com"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="summary">Professional Summary</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAISuggestion('summary')}
                disabled={loadingAI}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                AI Suggest
              </Button>
            </div>
            <Textarea
              id="summary"
              value={resumeData.personalInfo.summary}
              onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
              placeholder="Brief professional summary..."
              rows={4}
            />
          </div>
        </TabsContent>

        {/* Experience Tab */}
        <TabsContent value="experience" className="space-y-4 mt-4">
          {resumeData.experience.map((exp, index) => (
            <div key={exp.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                  <span className="font-medium text-gray-700">Experience #{index + 1}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteExperience(exp.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                    placeholder="Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Input
                    value={exp.position}
                    onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)}
                    placeholder="Job Title"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  value={exp.location}
                  onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={exp.startDate}
                    onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={exp.endDate}
                    onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                    disabled={exp.current}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Description</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleAISuggestion('experience')}
                    disabled={loadingAI}
                  >
                    <Sparkles className="h-4 w-4 mr-1" />
                    AI Improve
                  </Button>
                </div>
                <Textarea
                  value={exp.description}
                  onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                  placeholder="Describe your responsibilities and achievements..."
                  rows={3}
                />
              </div>
            </div>
          ))}
          <Button onClick={addExperience} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-4 mt-4">
          {resumeData.education.map((edu, index) => (
            <div key={edu.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                  <span className="font-medium text-gray-700">Education #{index + 1}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteEducation(edu.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>School/University</Label>
                  <Input
                    value={edu.school}
                    onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)}
                    placeholder="University Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Degree</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                    placeholder="Bachelor of Science"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Field of Study</Label>
                  <Input
                    value={edu.field}
                    onChange={(e) => handleEducationChange(edu.id, 'field', e.target.value)}
                    placeholder="Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={edu.location}
                    onChange={(e) => handleEducationChange(edu.id, 'location', e.target.value)}
                    placeholder="City, State"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-2">
                  <Label>Start Date</Label>
                  <Input
                    type="month"
                    value={edu.startDate}
                    onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>End Date</Label>
                  <Input
                    type="month"
                    value={edu.endDate}
                    onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GPA (Optional)</Label>
                  <Input
                    value={edu.gpa}
                    onChange={(e) => handleEducationChange(edu.id, 'gpa', e.target.value)}
                    placeholder="3.8"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addEducation} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Education
          </Button>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-4 mt-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Technical Skills</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleAISuggestion('skills')}
                disabled={loadingAI}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                AI Suggest
              </Button>
            </div>
            <Input
              value={resumeData.skills.technical.join(', ')}
              onChange={(e) => setResumeData({
                ...resumeData,
                skills: { ...resumeData.skills, technical: e.target.value.split(',').map(s => s.trim()) }
              })}
              placeholder="JavaScript, React, Node.js"
            />
          </div>
          <div className="space-y-2">
            <Label>Soft Skills</Label>
            <Input
              value={resumeData.skills.soft.join(', ')}
              onChange={(e) => setResumeData({
                ...resumeData,
                skills: { ...resumeData.skills, soft: e.target.value.split(',').map(s => s.trim()) }
              })}
              placeholder="Leadership, Communication, Problem Solving"
            />
          </div>
        </TabsContent>

        {/* Projects Tab */}
        <TabsContent value="projects" className="space-y-4 mt-4">
          {resumeData.projects.map((project, index) => (
            <div key={project.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <GripVertical className="h-5 w-5 text-gray-400 cursor-move" />
                  <span className="font-medium text-gray-700">Project #{index + 1}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteProject(project.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Project Name</Label>
                <Input
                  value={project.name}
                  onChange={(e) => handleProjectChange(project.id, 'name', e.target.value)}
                  placeholder="E-commerce Platform"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={project.description}
                  onChange={(e) => handleProjectChange(project.id, 'description', e.target.value)}
                  placeholder="Brief description of the project..."
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Technologies</Label>
                  <Input
                    value={project.technologies.join(', ')}
                    onChange={(e) => handleProjectChange(project.id, 'technologies', e.target.value.split(',').map(s => s.trim()))}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Link (Optional)</Label>
                  <Input
                    value={project.link}
                    onChange={(e) => handleProjectChange(project.id, 'link', e.target.value)}
                    placeholder="github.com/username/project"
                  />
                </div>
              </div>
            </div>
          ))}
          <Button onClick={addProject} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </TabsContent>

        {/* More Tab (Certifications, Languages, Custom) */}
        <TabsContent value="more" className="space-y-6 mt-4">
          {/* Certifications */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Certifications</h3>
            {resumeData.certifications.map((cert, index) => (
              <div key={cert.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 text-sm">Certification #{index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCertification(cert.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Certification Name</Label>
                    <Input
                      value={cert.name}
                      onChange={(e) => handleCertificationChange(cert.id, 'name', e.target.value)}
                      placeholder="AWS Certified Solutions Architect"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Issuing Organization</Label>
                    <Input
                      value={cert.issuer}
                      onChange={(e) => handleCertificationChange(cert.id, 'issuer', e.target.value)}
                      placeholder="Amazon Web Services"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Date Obtained</Label>
                  <Input
                    type="month"
                    value={cert.date}
                    onChange={(e) => handleCertificationChange(cert.id, 'date', e.target.value)}
                  />
                </div>
              </div>
            ))}
            <Button onClick={addCertification} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Certification
            </Button>
          </div>

          {/* Languages */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
            {resumeData.languages.map((lang, index) => (
              <div key={lang.id} className="border border-gray-200 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700 text-sm">Language #{index + 1}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteLanguage(lang.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Input
                      value={lang.language}
                      onChange={(e) => handleLanguageChange(lang.id, 'language', e.target.value)}
                      placeholder="English"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Proficiency</Label>
                    <Input
                      value={lang.proficiency}
                      onChange={(e) => handleLanguageChange(lang.id, 'proficiency', e.target.value)}
                      placeholder="Native, Professional, or Conversational"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={addLanguage} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Language
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditorPanel;