import React, { useState } from 'react';
import { Briefcase, Users, Search, Filter, Upload } from 'lucide-react';
import { employees, jobs, matchScores } from '../data';
import JobCard from '../components/JobCard';

const JobMatching: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<string>('');
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  
  // Filter matches based on selections
  const filteredMatches = matchScores.filter(match => {
    const matchesJob = selectedJob === '' || match.jobId === selectedJob;
    const matchesEmployee = selectedEmployee === '' || match.employeeId === selectedEmployee;
    
    const job = jobs.find(j => j.id === match.jobId);
    const employee = employees.find(e => e.id === match.employeeId);
    
    const matchesSearch = 
      searchTerm === '' || 
      job?.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee?.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesJob && matchesEmployee && matchesSearch;
  });
  
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="card">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <Briefcase className="mr-2 h-5 w-5 text-primary-700" />
          AI-Powered Job Matching
        </h2>
        
        <p className="text-gray-600 mb-6">
          Our AI system analyzes employee skills and resumes against job descriptions to find the best internal candidates for open positions. This helps with career development and efficient resource allocation.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for job title or employee name..."
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
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              className="input pl-10 pr-10 appearance-none min-w-[200px]"
            >
              <option value="">All Jobs</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="input pl-10 pr-10 appearance-none min-w-[200px]"
            >
              <option value="">All Employees</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end mb-6">
          <button 
            className="btn btn-secondary flex items-center"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Resume
          </button>
        </div>
        
        {filteredMatches.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No matches found for the selected criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match) => {
              const job = jobs.find(j => j.id === match.jobId);
              if (!job) return null;
              
              const employee = employees.find(e => e.id === match.employeeId);
              if (!employee) return null;
              
              return (
                <div key={`${match.employeeId}-${match.jobId}`} className="card">
                  <div className="mb-4 pb-3 border-b border-gray-100">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="font-medium">Match Overview</h3>
                      <div className={`text-white text-sm font-medium rounded-full h-10 w-10 flex items-center justify-center ${
                        match.score >= 80 ? 'bg-success-500' : 
                        match.score >= 60 ? 'bg-warning-500' : 'bg-error-500'
                      }`}>
                        {match.score}%
                      </div>
                    </div>
                    
                    <div className="flex items-center mb-2">
                      <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                        <img 
                          src={employee.profileImage} 
                          alt={employee.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-sm text-gray-600">{employee.position}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Match Details</h4>
                    <p className="text-sm text-gray-600">
                      <span className="text-success-600 font-medium">{match.matchedSkills}</span> matched skills
                    </p>
                    
                    {match.missingSkills.length > 0 && (
                      <>
                        <p className="text-sm text-gray-600 mt-2 mb-1">Missing skills:</p>
                        <div className="flex flex-wrap gap-2">
                          {match.missingSkills.map((skill, i) => (
                            <span key={i} className="badge badge-error">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  
                  <button className="btn btn-primary w-full">
                    View Full Analysis
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="card">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Briefcase className="mr-2 h-5 w-5 text-secondary-600" />
          Open Positions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
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