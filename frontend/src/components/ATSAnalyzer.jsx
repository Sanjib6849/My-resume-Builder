import React, { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { X, Sparkles, AlertCircle, CheckCircle, TrendingUp } from 'lucide-react';
import { aiAPI } from '../api/client';
import { toast } from '../hooks/use-toast';

const ATSAnalyzer = ({ resumeData, onClose }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [atsResults, setAtsResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Job Description Required",
        description: "Please paste a job description to analyze your resume",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const results = await aiAPI.analyzeATS(resumeData, jobDescription);
      setAtsResults(results);
      toast({
        title: "ATS Analysis Complete",
        description: `Your resume scored ${results.score}/100 for ATS compatibility`,
      });
    } catch (error) {
      console.error('ATS Analysis error:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full my-8">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-100 p-2 rounded-lg">
              <Sparkles className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">ATS Compatibility Analyzer</h2>
              <p className="text-sm text-gray-600">Check how well your resume performs with Applicant Tracking Systems</p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Job Description Input */}
          <div className="space-y-2">
            <Label htmlFor="jobDesc" className="text-base font-semibold">Paste Job Description</Label>
            <p className="text-sm text-gray-600 mb-2">Copy and paste the job description you're applying for to get personalized ATS optimization suggestions</p>
            <Textarea
              id="jobDesc"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the complete job description here...\n\nExample:\nWe are looking for a Senior Software Engineer with experience in React, Node.js, and cloud technologies..." 
              rows={8}
              className="font-mono text-sm"
            />
          </div>

          <Button 
            onClick={handleAnalyze} 
            disabled={loading || !jobDescription.trim()}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Analyzing Resume...
              </>
            ) : (
              <>
                <Sparkles className="h-5 w-5 mr-2" />
                Analyze ATS Compatibility
              </>
            )}
          </Button>

          {/* Results */}
          {atsResults && (
            <div className="space-y-4 animate-fade-in">
              {/* ATS Score */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">ATS Compatibility Score</h3>
                  <TrendingUp className={`h-5 w-5 ${getScoreColor(atsResults.score)}`} />
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`${getScoreBgColor(atsResults.score)} rounded-full w-24 h-24 flex items-center justify-center`}>
                    <span className={`text-3xl font-bold ${getScoreColor(atsResults.score)}`}>
                      {atsResults.score}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                      <div 
                        className={`h-3 rounded-full transition-all duration-500 ${
                          atsResults.score >= 80 ? 'bg-green-600' :
                          atsResults.score >= 60 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${atsResults.score}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">{atsResults.scoreDescription}</p>
                  </div>
                </div>
              </Card>

              {/* Missing Keywords */}
              {atsResults.missingKeywords.length > 0 && (
                <Card className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Missing Keywords</h3>
                      <p className="text-sm text-gray-600 mb-3">Add these keywords from the job description to improve your ATS score:</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {atsResults.missingKeywords.map((keyword, idx) => (
                      <span key={idx} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </Card>
              )}

              {/* Matching Keywords */}
              {atsResults.matchingKeywords.length > 0 && (
                <Card className="p-6">
                  <div className="flex items-start space-x-3 mb-4">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Matching Keywords</h3>
                      <p className="text-sm text-gray-600 mb-3">Great! Your resume includes these important keywords:</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {atsResults.matchingKeywords.map((keyword, idx) => (
                      <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </Card>
              )}

              {/* Recommendations */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                  AI Recommendations
                </h3>
                <ul className="space-y-3">
                  {atsResults.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-semibold">
                        {idx + 1}
                      </span>
                      <p className="text-gray-700 text-sm pt-0.5">{rec}</p>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Formatting Issues */}
              {atsResults.formattingIssues.length > 0 && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                    Formatting Issues
                  </h3>
                  <ul className="space-y-2">
                    {atsResults.formattingIssues.map((issue, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-red-600 mt-1">•</span>
                        <p className="text-gray-700 text-sm">{issue}</p>
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </div>
          )}

          {!atsResults && !loading && (
            <div className="text-center py-8 text-gray-500">
              <Sparkles className="h-12 w-12 mx-auto mb-3 text-gray-400" />
              <p>Paste a job description above and click "Analyze" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ATSAnalyzer;