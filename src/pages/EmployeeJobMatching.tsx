import React, { useState } from 'react';
import { Upload, FileText, Zap, Star, MapPin, Calendar, Briefcase, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { jobs } from '../data';

interface ResumeAnalysisResult {
  jobId: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
}

const EmployeeJobMatching: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<ResumeAnalysisResult[]>([]);
  const [error, setError] = useState<string>('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setError('');
      setAnalysisResults([]);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      setError('');
      setAnalysisResults([]);
    }
  };

  const analyzeResume = async () => {
    if (!uploadedFile) {
      setError('Please upload a resume first.');
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      // Simulate API call for resume analysis
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock analysis results with more detailed skill matching
      const mockResults: ResumeAnalysisResult[] = jobs.map(job => {
        const matchScore = Math.floor(Math.random() * 40) + 60; // 60-100% match
        const allJobSkills = job.requiredSkills.map(s => s.name);
        const numMatchedSkills = Math.floor(allJobSkills.length * (matchScore / 100));
        const matchedSkills = allJobSkills.slice(0, numMatchedSkills);
        const missingSkills = allJobSkills.slice(numMatchedSkills);
        
        return {
          jobId: job.id,
          matchScore,
          matchedSkills,
          missingSkills,
          recommendations: [
            'Consider developing skills in the missing areas',
            'Highlight relevant experience in your application',
            'Network with current employees in this department'
          ]
        };
      });

      // Sort by match score
      mockResults.sort((a, b) => b.matchScore - a.matchScore);
      setAnalysisResults(mockResults);
    } catch (err) {
      setError('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetAnalysis = () => {
    setUploadedFile(null);
    setAnalysisResults([]);
    setError('');
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="card">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Upload className="mr-2 h-5 w-5 text-primary-700" />
          Resume Analysis & Job Matching
        </h2>
        
        <p className="text-gray-600 mb-6">
          Upload your resume to get AI-powered job match percentages and personalized recommendations 
          for available positions within the organization.
        </p>

        {/* Upload Section */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6">
          {!uploadedFile ? (
            <div
              className="border-2 border-dashed border-primary-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('resume-upload')?.click()}
            >
              <Upload className="h-12 w-12 text-primary-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Your Resume</h3>
              <p className="text-gray-600 mb-4">
                Drag and drop your resume here, or click to browse
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Supported formats: PDF, DOCX, TXT (Max 10MB)
              </p>
              <button className="btn btn-primary">
                Select File
              </button>
              <input
                id="resume-upload"
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
                onChange={handleFileUpload}
              />
            </div>
          ) : (
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <FileText className="h-8 w-8 text-primary-600 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-900">{uploadedFile.name}</h3>
                    <p className="text-sm text-gray-500">
                      {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetAnalysis}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={analyzeResume}
                  disabled={isAnalyzing}
                  className="btn btn-primary flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Analyze & Match Jobs
                    </>
                  )}
                </button>
                
                <button
                  onClick={resetAnalysis}
                  className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
                  disabled={isAnalyzing}
                >
                  Upload Different Resume
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-error-50 border-l-4 border-error-500 p-4 rounded-r-lg mt-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-error-500 mr-2" />
              <p className="text-error-700 font-medium">Error</p>
            </div>
            <p className="text-error-600 text-sm mt-1">{error}</p>
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {analysisResults.length > 0 && (
        <div className="card">
          <div className="bg-gradient-to-r from-success-600 to-primary-600 text-white p-6 rounded-t-xl -m-6 mb-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              Resume Analysis Complete
            </h3>
            <p className="text-success-100">
              Found {analysisResults.length} job matches based on your resume
            </p>
          </div>

          <div className="space-y-6">
            {analysisResults.map((result) => {
              const job = jobs.find(j => j.id === result.jobId);
              if (!job) return null;

              return (
                <div key={result.jobId} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  {/* Job Header */}
                  <div className="p-6 pb-4">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center mb-2">
                          <h3 className="text-xl font-semibold text-gray-900 mr-3">{job.title}</h3>
                          <div className={`text-white text-sm font-medium rounded-full h-10 w-10 flex items-center justify-center ${
                            result.matchScore >= 80 ? 'bg-success-500' : 
                            result.matchScore >= 70 ? 'bg-warning-500' : 'bg-error-500'
                          }`}>
                            {result.matchScore}%
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="badge badge-primary">{job.department}</span>
                          <span className="badge badge-secondary">Level {job.jobLevel}</span>
                          <span className="badge bg-gray-100 text-gray-700">
                            {job.location} {job.isRemote && '(Remote)'}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm max-w-2xl">{job.description}</p>
                      </div>
                      
                      <div className="flex flex-col items-end">
                        <div className="text-sm text-gray-500 mb-2">
                          Posted: {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center text-primary-700">
                          <Star className="h-4 w-4 mr-1" />
                          <span className="text-sm font-medium">
                            {result.matchScore >= 80 ? 'Excellent Match' : 
                             result.matchScore >= 70 ? 'Good Match' : 'Potential Match'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Match Details */}
                  <div className="px-6 pb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Matched Skills */}
                      <div className="bg-success-50 border border-success-200 rounded-lg p-4">
                        <h4 className="font-semibold text-success-800 mb-3 flex items-center">
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Matched Skills ({result.matchedSkills.length})
                        </h4>
                        <div className="space-y-2">
                          {result.matchedSkills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                              <div className="h-2 w-2 bg-success-500 rounded-full mr-2"></div>
                              <span className="text-sm text-success-700">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Missing Skills */}
                      <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
                        <h4 className="font-semibold text-warning-800 mb-3 flex items-center">
                          <AlertCircle className="mr-2 h-4 w-4" />
                          Skills to Develop ({result.missingSkills.length})
                        </h4>
                        <div className="space-y-2">
                          {result.missingSkills.map((skill, index) => (
                            <div key={index} className="flex items-center">
                              <div className="h-2 w-2 bg-warning-500 rounded-full mr-2"></div>
                              <span className="text-sm text-warning-700">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Recommendations */}
                    <div className="mt-6 bg-primary-50 border border-primary-200 rounded-lg p-4">
                      <h4 className="font-semibold text-primary-800 mb-3">Recommendations</h4>
                      <div className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start">
                            <div className="h-2 w-2 bg-primary-500 rounded-full mr-2 mt-2"></div>
                            <span className="text-sm text-primary-700">{rec}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex space-x-3">
                      <button className="btn btn-primary">
                        <Briefcase className="mr-2 h-4 w-4" />
                        Apply for Position
                      </button>
                      <button className="btn btn-secondary">
                        View Learning Path
                      </button>
                      <button className="btn bg-gray-200 hover:bg-gray-300 text-gray-800">
                        Save for Later
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="card">
        <h3 className="text-lg font-medium mb-4">Tips for Better Matches</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary-100 rounded-lg p-2 mr-3">
                <FileText className="h-4 w-4 text-primary-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Resume Format</h4>
                <p className="text-gray-600 text-sm">
                  Use a clear, well-structured resume with distinct sections for skills, experience, and education.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-secondary-100 rounded-lg p-2 mr-3">
                <Star className="h-4 w-4 text-secondary-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Skill Keywords</h4>
                <p className="text-gray-600 text-sm">
                  Include relevant technical and soft skills that match job requirements.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-accent-100 rounded-lg p-2 mr-3">
                <Zap className="h-4 w-4 text-accent-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Quantify Achievements</h4>
                <p className="text-gray-600 text-sm">
                  Use numbers and metrics to demonstrate your impact and experience level.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-success-100 rounded-lg p-2 mr-3">
                <CheckCircle className="h-4 w-4 text-success-600" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Keep Updated</h4>
                <p className="text-gray-600 text-sm">
                  Regularly update your resume with new skills, projects, and experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeJobMatching;