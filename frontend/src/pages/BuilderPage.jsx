import React, { useState } from 'react';
import { mockResumeData, mockTemplates } from '../mock';
import EditorPanel from '../components/EditorPanel';
import PreviewPanel from '../components/PreviewPanel';
import TemplateSelector from '../components/TemplateSelector';
import ExportOptions from '../components/ExportOptions';
import ATSAnalyzer from '../components/ATSAnalyzer';
import { Button } from '../components/ui/button';
import { FileText, Save, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../hooks/use-toast';

const BuilderPage = () => {
  const navigate = useNavigate();
  const [resumeData, setResumeData] = useState(mockResumeData);
  const [selectedTemplate, setSelectedTemplate] = useState(mockTemplates[0]);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showATSAnalyzer, setShowATSAnalyzer] = useState(false);

  const handleSave = () => {
    // Mock save to localStorage
    localStorage.setItem('resume_draft', JSON.stringify(resumeData));
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/')}>
            <FileText className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">ResumeBuilder</span>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" onClick={() => setShowTemplateSelector(true)}>
              Change Template
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowATSAnalyzer(true)}>
              <Sparkles className="h-4 w-4 mr-2" />
              ATS Check
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button size="sm" onClick={() => setShowExportOptions(true)}>
              Export Resume
            </Button>
          </div>
        </div>
      </header>

      {/* Main Builder Interface */}
      <div className="container mx-auto px-6 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-[calc(100vh-140px)] overflow-y-auto">
            <EditorPanel resumeData={resumeData} setResumeData={setResumeData} />
          </div>

          {/* Preview Panel */}
          <div className="bg-white rounded-lg shadow-sm p-6 h-[calc(100vh-140px)] overflow-y-auto">
            <PreviewPanel resumeData={resumeData} template={selectedTemplate} />
          </div>
        </div>
      </div>

      {/* Template Selector Modal */}
      {showTemplateSelector && (
        <TemplateSelector
          templates={mockTemplates}
          selectedTemplate={selectedTemplate}
          onSelect={(template) => {
            setSelectedTemplate(template);
            setShowTemplateSelector(false);
            toast({
              title: "Template Changed",
              description: `Switched to ${template.name} template`,
            });
          }}
          onClose={() => setShowTemplateSelector(false)}
        />
      )}

      {/* Export Options Modal */}
      {showExportOptions && (
        <ExportOptions
          resumeData={resumeData}
          template={selectedTemplate}
          onClose={() => setShowExportOptions(false)}
        />
      )}

      {/* ATS Analyzer Modal */}
      {showATSAnalyzer && (
        <ATSAnalyzer
          resumeData={resumeData}
          onClose={() => setShowATSAnalyzer(false)}
        />
      )}
    </div>
  );
};

export default BuilderPage;