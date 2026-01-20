import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { FileText, Sparkles, Download, Layout, Palette, Zap } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ResumeBuilder</span>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/login')}>Sign In</Button>
            <Button onClick={() => navigate('/builder')}>Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Build Your Perfect Resume in Minutes
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create professional resumes with AI-powered suggestions, beautiful templates, and instant exports. No design skills required.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={() => navigate('/builder')} className="px-8">
              Start Building Free
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/builder')}>
              View Templates
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Stand Out
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Palette className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">6+ Professional Templates</h3>
              <p className="text-gray-600">Choose from modern, classic, creative and more professionally designed templates.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Suggestions</h3>
              <p className="text-gray-600">Get intelligent content recommendations powered by GPT-4 to improve your resume.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multiple Export Formats</h3>
              <p className="text-gray-600">Download your resume as PDF, Word document, or plain text format.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">ATS Compatibility Checker</h3>
              <p className="text-gray-600">Analyze and optimize your resume for Applicant Tracking Systems with AI-powered insights.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-pink-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Layout className="h-6 w-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Drag & Drop Sections</h3>
              <p className="text-gray-600">Easily reorder sections to highlight what matters most for each job application.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Preview</h3>
              <p className="text-gray-600">See your changes instantly with live preview as you type and edit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to Build Your Dream Resume?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of job seekers who landed their dream jobs with our resume builder.
          </p>
          <Button size="lg" onClick={() => navigate('/builder')} className="px-12">
            Create Your Resume Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-400">© 2025 ResumeBuilder. Built with ❤️ to help you succeed.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;