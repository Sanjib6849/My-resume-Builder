import React, { useState } from 'react';
import { Button } from './ui/button';
import { X, FileDown, FileText, FileType } from 'lucide-react';
import { exportToPDF, exportToWord, exportToText } from '../utils/exportUtils';
import { toast } from '../hooks/use-toast';

const ExportOptions = ({ resumeData, template, onClose }) => {
  const [exporting, setExporting] = useState(false);

  const handleExport = async (format) => {
    setExporting(true);
    try {
      if (format === 'pdf') {
        await exportToPDF(resumeData, template);
        toast({
          title: "PDF Downloaded",
          description: "Your resume has been downloaded successfully!",
        });
      } else if (format === 'word') {
        exportToWord(resumeData, template);
        toast({
          title: "Word Document Downloaded",
          description: "Your resume has been downloaded successfully!",
        });
      } else if (format === 'text') {
        exportToText(resumeData);
        toast({
          title: "Text File Downloaded",
          description: "Your resume has been downloaded successfully!",
        });
      }
      setTimeout(() => onClose(), 1500);
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: "Export Failed",
        description: "Failed to export resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Export Resume</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-gray-600 mb-4">Choose your preferred export format:</p>
          
          <Button
            onClick={() => handleExport('pdf')}
            className="w-full justify-start"
            variant="outline"
            disabled={exporting}
          >
            <FileDown className="h-5 w-5 mr-3 text-red-600" />
            <div className="text-left">
              <div className="font-semibold">Export as PDF</div>
              <div className="text-xs text-gray-500">Best for printing and sharing</div>
            </div>
          </Button>

          <Button
            onClick={() => handleExport('word')}
            className="w-full justify-start"
            variant="outline"
            disabled={exporting}
          >
            <FileText className="h-5 w-5 mr-3 text-blue-600" />
            <div className="text-left">
              <div className="font-semibold">Export as Word (.docx)</div>
              <div className="text-xs text-gray-500">Editable document format</div>
            </div>
          </Button>

          <Button
            onClick={() => handleExport('text')}
            className="w-full justify-start"
            variant="outline"
            disabled={exporting}
          >
            <FileType className="h-5 w-5 mr-3 text-gray-600" />
            <div className="text-left">
              <div className="font-semibold">Export as Plain Text</div>
              <div className="text-xs text-gray-500">Simple text format</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExportOptions;