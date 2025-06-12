import React, { useState } from 'react';
import { BookOpen, Users, Filter, Search, BookMarked, Award, Zap } from 'lucide-react';
import { employees, learningPaths, learningResources } from '../data';

const LearningPaths: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Get filtered learning paths
  const filteredLearningPaths = learningPaths.filter(path => {
    if (selectedEmployee && path.employeeId !== selectedEmployee) return false;
    
    // Check if resources match search term
    if (searchTerm) {
      const matchesResource = path.resources.some(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.skillsAddressed.some(skill => 
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      
      const matchesTargetSkill = path.targetSkills.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      return matchesResource || matchesTargetSkill;
    }
    
    return true;
  });
  
  // Get employees with learning paths
  const employeesWithPaths = employees.filter(employee => 
    learningPaths.some(path => path.employeeId === employee.id)
  );
  
  // Get top learning resources (most commonly included in paths)
  const resourceCounts: Record<string, number> = {};
  learningPaths.forEach(path => {
    path.resources.forEach(resource => {
      resourceCounts[resource.id] = (resourceCounts[resource.id] || 0) + 1;
    });
  });
  
  const topResources = Object.entries(resourceCounts)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 3)
    .map(([resourceId]) => 
      learningResources.find(resource => resource.id === resourceId)
    )
    .filter(Boolean);
  
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="card">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <BookOpen className="mr-2 h-5 w-5 text-primary-700" />
          Personalized Learning Paths
        </h2>
        
        <p className="text-gray-600 mb-6">
          Our AI analyzes employee skills against job requirements and industry standards to create personalized learning paths. These customized learning plans help employees bridge skill gaps and advance their careers.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for skills or resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10"
            />
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
              {employeesWithPaths.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </select>
          </div>
          
          <button className="btn btn-secondary">
            <Zap className="mr-2 h-4 w-4" />
            Generate New Paths
          </button>
        </div>
        
        {filteredLearningPaths.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No learning paths found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredLearningPaths.map((path) => {
              const employee = employees.find(e => e.id === path.employeeId);
              if (!employee) return null;
              
              return (
                <div key={path.id} className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
                  <div className="p-6 pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div className="flex items-center mb-3 sm:mb-0">
                        <div className="h-12 w-12 rounded-full overflow-hidden mr-4">
                          <img 
                            src={employee.profileImage} 
                            alt={employee.name} 
                            className="h-full w-full object-cover" 
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-medium">{employee.name}</h3>
                          <p className="text-sm text-gray-600">{employee.position}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <span className={`badge mr-2 ${
                          path.priority === 'High' 
                            ? 'bg-error-100 text-error-800' 
                            : path.priority === 'Medium'
                            ? 'bg-warning-100 text-warning-800'
                            : 'bg-success-100 text-success-800'
                        }`}>
                          {path.priority} Priority
                        </span>
                        <span className="text-sm text-gray-500">
                          {path.estimatedCompletionTime}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Target Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {path.targetSkills.map((skill, index) => (
                          <span key={index} className="badge badge-secondary">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Learning Resources</h4>
                    {path.resources.map((resource, index) => (
                      <div key={resource.id} className="bg-gray-50 p-3 rounded-lg mb-3 last:mb-0">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start">
                            <div className="bg-primary-100 rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-1">
                              <span className="text-xs text-primary-800 font-medium">{index + 1}</span>
                            </div>
                            <div>
                              <h5 className="font-medium mb-1">{resource.title}</h5>
                              <p className="text-sm text-gray-600 mb-1">
                                {resource.provider} • {resource.duration} • {resource.level}
                              </p>
                              <div className="flex flex-wrap gap-1">
                                {resource.skillsAddressed.map((skill, i) => (
                                  <span key={i} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <a 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-primary-700 hover:text-primary-800 text-sm flex-shrink-0"
                          >
                            View
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between items-center">
                    <div className="flex items-center">
                      <Award className="h-5 w-5 text-primary-700 mr-2" />
                      <span className="text-sm font-medium">AI-generated learning path</span>
                    </div>
                    <button className="btn btn-primary">
                      Track Progress
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="card">
        <h3 className="text-lg font-medium mb-4 flex items-center">
          <BookMarked className="mr-2 h-5 w-5 text-secondary-600" />
          Top Learning Resources
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {topResources.map(resource => (
            resource && (
              <div key={resource.id} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-medium">{resource.title}</h4>
                  <span className="badge badge-primary">{resource.type}</span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {resource.provider} • {resource.level}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {resource.skillsAddressed.map((skill, index) => (
                    <span key={index} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <span className="text-sm text-gray-500">{resource.duration}</span>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary text-sm py-1.5"
                  >
                    View Resource
                  </a>
                </div>
              </div>
            )
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 flex justify-center">
          <button className="btn btn-primary">
            Browse All Resources
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningPaths;