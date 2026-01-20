import React from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';

const TemplateSelector = ({ templates, selectedTemplate, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-6 grid md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg ${
                selectedTemplate.id === template.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-400'
              }`}
              onClick={() => onSelect(template)}
            >
              <div className="aspect-[3/4] bg-gray-100 rounded mb-3 flex items-center justify-center">
                <span className="text-gray-400 text-sm">Template Preview</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateSelector;