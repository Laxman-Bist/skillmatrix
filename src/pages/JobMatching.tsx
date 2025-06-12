import React, { useState } from 'react';
import { Briefcase, Users, Search, Filter, Upload, Star, TrendingUp, Loader2, AlertCircle, RefreshCw, Zap } from 'lucide-react';
import { employees, jobs } from '../data';
import { calculateBatchJobMatches } from '../services/gemini';

interface JobMatchResult {
  employeeId: string;
  jobId: string;
  score: number;
  matchedSkills: number;
  missingSkills: string[];
  matchedSkillNames: string[];
  employee: typeof employees[0];
}

const JobMatching: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [jobMatches, setJobMatches] = useState<Record<string, JobMatchResult[]>>({});
  const [loadingJobs, setLoadingJobs] = useState<Set<string>>(new Set());
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Get unique departments from jobs
  const departments = [...new Set(jobs.map(job => job.department))];
  
  // Filter jobs based on search and department
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === '' || job.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  // Function to calculate matches for a specific job using batch processing
  const calculateMatchesForJob = async (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    setLoadingJobs(prev => new Set([...prev, jobId]));
    setErrors(prev => ({ ...prev, [jobId]: '' }));

    try {
      // Use batch processing to analyze all employees at once
      const batchResults = await calculateBatchJobMatches(employees, job);
      
      // Convert results to JobMatchResult format
      const jobMatchResults: JobMatchResult[] = batchResults
        .map(result => {
          const employee = employees.find(emp => emp.id === result.employeeId);
          if (!employee) return null;
          
          // Calculate matched skill names based on employee skills and job requirements
          const employeeSkillNames = employee.skills.map(s => s.name.toLowerCase());
          const jobSkillNames = job.requiredSkills.map(s => s.name.toLowerCase());
          const matchedSkillNames = employee.skills
            .filter(skill => jobSkillNames.includes(skill.name.toLowerCase()))
            .map(skill => skill.name);
          
          return {
            employeeId: result.employeeId,
            jobId: job.id,
            score: result.score,
            matchedSkills: result.matchedSkills,
            missingSkills: result.missingSkills,
            matchedSkillNames: matchedSkillNames,
            employee
          };
        })
        .filter(Boolean) as JobMatchResult[];
      
      // Sort by score (highest first) and take top 5
      const topCandidates = jobMatchResults
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);

      setJobMatches(prev => ({
        ...prev,
        [jobId]: topCandidates
      }));
    } catch (error: any) {
      console.error(`Error calculating matches for job ${jobId}:`, error);
      setErrors(prev => ({
        ...prev,
        [jobId]: error.message || 'Failed to calculate job matches. Please try again.'
      }));
    } finally {
      setLoadingJobs(prev => {
        const newSet = new Set(prev);
        newSet.delete(jobId);
        return newSet;
      });
    }
  };

  // Function to refresh matches for a job
  const refreshJobMatches = (jobId: string) => {
    calculateMatchesForJob(jobId);
  };

  // Function to analyze all visible jobs at once
  const analyzeAllJobs = async () => {
    const jobsToAnalyze = filteredJobs.filter(job => !jobMatches[job.id] && !loadingJobs.has(job.id));
    
    if (jobsToAnalyze.length === 0) {
      return; // No jobs to analyze
    }
    
    // Process jobs in smaller batches to avoid overwhelming the API
    const batchSize = 2;
    for (let i = 0; i < jobsToAnalyze.length; i += batchSize) {
      const batch = jobsToAnalyze.slice(i, i + batchSize);
      await Promise.all(batch.map(job => calculateMatchesForJob(job.id)));
      
      // Add a small delay between batches to be respectful to the API
      if (i + batchSize < jobsToAnalyze.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  };

  // Check if there are unanalyzed jobs
  const hasUnanalyzedJobs = filteredJobs.some(job => !jobMatches[job.id] && !loadingJobs.has(job.id));
  
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="card">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Briefcase className="mr-2 h-5 w-5 text-primary-700" />
          AI-Powered Job Matching
        </h2>
        
        <p className="text-gray-600 mb-6">
          Our AI system analyzes employee skills and experience against job requirements to identify the best internal candidates for each position. This helps with career development and efficient resource allocation.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for job title or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="input pl-10 pr-10 appearance-none min-w-[200px]"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
          
          {hasUnanalyzedJobs && (
            <button 
              onClick={analyzeAllJobs}
              disabled={loadingJobs.size > 0}
              className="btn btn-accent flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Zap className="mr-2 h-4 w-4" />
              {loadingJobs.size > 0 ? 'Analyzing...' : 'Analyze All Jobs'}
            </button>
          )}
          
          <button 
            className="btn btn-secondary flex items-center"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </button>
        </div>
        
        {filteredJobs.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredJobs.map((job) => {
              const topCandidates = jobMatches[job.id] || [];
              const isLoading = loadingJobs.has(job.id);
              const error = errors[job.id];
              const hasBeenAnalyzed = jobMatches[job.id] !== undefined;
              
              return (
                <div key={job.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  {/* Job Header */}
                  <div className="bg-gradient-to-r from-primary-50 to-secondary-50 p-6 border-b border-gray-200">
                    <div className="flex flex-col md:flex-row justify-between items-start">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{job.title}</h3>
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
                        <div className="flex items-center text-primary-700 mb-2">
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          )}
                          <span className="text-sm font-medium">
                            {isLoading ? 'Analyzing candidates...' : 
                             hasBeenAnalyzed ? `${topCandidates.length} candidates analyzed` : 
                             'Not analyzed yet'}
                          </span>
                        </div>
                        <button
                          onClick={() => refreshJobMatches(job.id)}
                          disabled={isLoading}
                          className="btn btn-secondary text-xs py-1.5 px-3 flex items-center disabled:opacity-50"
                        >
                          <RefreshCw className={`h-3 w-3 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                          {hasBeenAnalyzed ? 'Refresh Analysis' : 'Analyze Job'}
                        </button>
                      </div>
                    </div>
                    
                    {/* Required Skills */}
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {job.requiredSkills.map((skill) => (
                          <span 
                            key={skill.id} 
                            className={`text-xs px-2 py-1 rounded-full ${
                              skill.importance === 'required' 
                                ? 'bg-error-100 text-error-800' 
                                : skill.importance === 'preferred'
                                ? 'bg-warning-100 text-warning-800'
                                : 'bg-success-100 text-success-800'
                            }`}
                          >
                            {skill.name} (Level {skill.minimumLevel}+)
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Top Candidates */}
                  <div className="p-6">
                    <h4 className="text-lg font-medium mb-4 flex items-center">
                      <Star className="mr-2 h-5 w-5 text-warning-500" />
                      Top 5 Candidates
                    </h4>
                    
                    {error ? (
                      <div className="bg-error-50 border border-error-200 rounded-lg p-4 flex items-center">
                        <AlertCircle className="h-5 w-5 text-error-500 mr-2" />
                        <div>
                          <p className="text-error-700 font-medium">Error analyzing candidates</p>
                          <p className="text-error-600 text-sm">{error}</p>
                        </div>
                      </div>
                    ) : isLoading ? (
                      <div className="text-center py-8">
                        <Loader2 className="h-8 w-8 mx-auto mb-3 text-primary-600 animate-spin" />
                        <p className="text-gray-600">AI is analyzing all employee skills against job requirements...</p>
                        <p className="text-gray-500 text-sm mt-1">Using batch processing for faster results</p>
                      </div>
                    ) : !hasBeenAnalyzed ? (
                      <div className="text-center py-8 text-gray-500">
                        <Zap className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p className="mb-2">Click "Analyze Job" to find the best candidates for this position</p>
                        <p className="text-sm">Our AI will analyze all employees against the job requirements</p>
                      </div>
                    ) : topCandidates.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Users className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p>No suitable candidates found for this position.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {topCandidates.map((candidate, index) => (
                          <div 
                            key={candidate.employeeId} 
                            className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                          >
                            {/* Rank Badge */}
                            <div className="flex justify-between items-start mb-3">
                              <div className={`text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center ${
                                index === 0 ? 'bg-warning-500 text-white' :
                                index === 1 ? 'bg-gray-400 text-white' :
                                index === 2 ? 'bg-orange-600 text-white' :
                                'bg-gray-300 text-gray-700'
                              }`}>
                                {index + 1}
                              </div>
                              
                              <div className={`text-white text-xs font-medium rounded-full h-8 w-8 flex items-center justify-center ${
                                candidate.score >= 80 ? 'bg-success-500' : 
                                candidate.score >= 60 ? 'bg-warning-500' : 'bg-error-500'
                              }`}>
                                {candidate.score}%
                              </div>
                            </div>
                            
                            {/* Employee Info */}
                            <div className="flex items-center mb-3">
                              <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                                <img 
                                  src={candidate.employee.profileImage} 
                                  alt={candidate.employee.name} 
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm truncate">{candidate.employee.name}</p>
                                <p className="text-xs text-gray-600 truncate">{candidate.employee.position}</p>
                                <span className="badge badge-secondary text-xs mt-1">
                                  Level {candidate.employee.jobLevel}
                                </span>
                              </div>
                            </div>
                            
                            {/* Matched Skills */}
                            {candidate.matchedSkillNames.length > 0 && (
                              <div className="mb-3">
                                <p className="text-xs text-success-600 font-medium mb-1">
                                  Matched Skills ({candidate.matchedSkillNames.length}):
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {candidate.matchedSkillNames.slice(0, 3).map((skill, i) => (
                                    <span key={i} className="text-xs bg-success-100 text-success-700 px-1.5 py-0.5 rounded">
                                      {skill}
                                    </span>
                                  ))}
                                  {candidate.matchedSkillNames.length > 3 && (
                                    <span className="text-xs bg-success-200 text-success-600 px-1.5 py-0.5 rounded">
                                      +{candidate.matchedSkillNames.length - 3}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {/* Missing Skills */}
                            {candidate.missingSkills.length > 0 && (
                              <div className="mb-3">
                                <p className="text-xs text-error-600 font-medium mb-1">
                                  Missing Skills ({candidate.missingSkills.length}):
                                </p>
                                <div className="flex flex-wrap gap-1">
                                  {candidate.missingSkills.slice(0, 2).map((skill, i) => (
                                    <span key={i} className="text-xs bg-error-100 text-error-700 px-1.5 py-0.5 rounded">
                                      {skill}
                                    </span>
                                  ))}
                                  {candidate.missingSkills.length > 2 && (
                                    <span className="text-xs bg-error-200 text-error-600 px-1.5 py-0.5 rounded">
                                      +{candidate.missingSkills.length - 2}
                                    </span>
                                  )}
                                </div>
                              </div>
                            )}
                            
                            {/* Action Button */}
                            <button className="btn btn-primary w-full mt-3 text-xs py-1.5">
                              View Profile
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Upload Resume Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 animate-fade-in">
            <h3 className="text-lg font-semibold mb-4">Upload Resume for Analysis</h3>
            
            <p className="text-gray-600 mb-4">
              Upload a resume to find the best job matches within the organization.
              Our AI will analyze skills and experience to provide personalized recommendations.
            </p>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center mb-4">
              <Upload className="h-10 w-10 text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 text-center mb-2">
                Drag and drop your resume here, or click to browse
              </p>
              <p className="text-xs text-gray-400 text-center">
                Supported formats: PDF, DOCX, TXT
              </p>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt"
              />
              <button className="btn btn-primary mt-4">
                Select File
              </button>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button 
                className="btn bg-gray-200 hover:bg-gray-300 text-gray-800"
                onClick={() => setIsUploadModalOpen(false)}
              >
                Cancel
              </button>
              <button className="btn btn-primary">
                Upload & Analyze
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobMatching;