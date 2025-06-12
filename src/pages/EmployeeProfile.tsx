import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Mail, Calendar, BarChart2, Award, Briefcase, BookOpen, 
  AlertTriangle, CheckCircle 
} from 'lucide-react';
import { employees, jobs, learningPaths, matchScores } from '../data';
import SkillLevelBar from '../components/SkillLevelBar';
import JobCard from '../components/JobCard';

const EmployeeProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const employee = employees.find(emp => emp.id === id);
  
  if (!employee) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Employee not found.</p>
        <Link to="/employees" className="btn btn-primary mt-4">
          Back to Employees
        </Link>
      </div>
    );
  }
  
  // Group skills by category
  const skillsByCategory = employee.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof employee.skills>);
  
  // Get employee job matches
  const employeeMatches = matchScores.filter(match => match.employeeId === employee.id);
  
  // Get learning path for this employee
  const employeeLearningPath = learningPaths.find(path => path.employeeId === employee.id);
  
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex items-center mb-6">
        <Link to="/employees" className="text-primary-700 hover:text-primary-800 mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-2xl font-semibold">Employee Profile</h2>
      </div>
      
      <div className="card">
        <div className="flex flex-col sm:flex-row">
          <div className="sm:w-1/4 mb-6 sm:mb-0 flex flex-col items-center">
            <div className="h-32 w-32 rounded-full overflow-hidden mb-4">
              <img
                src={employee.profileImage}
                alt={employee.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-center">{employee.name}</h2>
            <p className="text-gray-600 text-center">{employee.position}</p>
            <p className="text-gray-500 text-sm text-center">{employee.department}</p>
            
            <div className="mt-4 flex flex-col space-y-2 w-full">
              <a href={`mailto:${employee.email}`} className="flex items-center text-primary-700 text-sm">
                <Mail className="h-4 w-4 mr-2" />
                {employee.email}
              </a>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="h-4 w-4 mr-2" />
                Joined: {new Date(employee.joinDate).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="sm:w-3/4 sm:pl-6 sm:border-l sm:border-gray-200">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <Award className="mr-2 h-5 w-5 text-primary-700" />
              Skills Assessment
            </h3>
            
            <div className="space-y-6">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category} className="mb-4">
                  <h4 className="text-md font-medium text-gray-700 mb-3">{category} Skills</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {skills.map(skill => (
                      <div key={skill.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full">
                            Level {skill.level}
                          </span>
                        </div>
                        <SkillLevelBar level={skill.level} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {employeeMatches.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-secondary-600" />
            Job Match Recommendations
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {employeeMatches.map(match => {
              const job = jobs.find(j => j.id === match.jobId);
              if (!job) return null;
              
              return (
                <JobCard 
                  key={match.jobId} 
                  job={job} 
                  matchScore={match.score} 
                />
              );
            })}
          </div>
        </div>
      )}
      
      {employeeLearningPath && (
        <div className="card">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-accent-500" />
            Personalized Learning Path
          </h3>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Target Skills</h4>
              <span className={`badge ${
                employeeLearningPath.priority === 'High' 
                  ? 'bg-error-100 text-error-800' 
                  : employeeLearningPath.priority === 'Medium'
                  ? 'bg-warning-100 text-warning-800'
                  : 'bg-success-100 text-success-800'
              }`}>
                {employeeLearningPath.priority} Priority
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {employeeLearningPath.targetSkills.map((skill, index) => (
                <span key={index} className="badge badge-secondary">
                  {skill}
                </span>
              ))}
            </div>
            
            <p className="text-sm text-gray-600 mb-4">
              Estimated completion time: {employeeLearningPath.estimatedCompletionTime}
            </p>
            
            <h4 className="font-medium mb-2">Recommended Resources</h4>
            <div className="space-y-4">
              {employeeLearningPath.resources.map(resource => (
                <div key={resource.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <h5 className="font-medium">{resource.title}</h5>
                    <span className="badge badge-primary">{resource.type}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Provider: {resource.provider}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {resource.skillsAddressed.map((skill, i) => (
                      <span key={i} className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center text-gray-600 text-sm">
                      <AlertTriangle className="h-4 w-4 mr-1 text-warning-500" />
                      {resource.level} • {resource.duration}
                    </div>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-primary-700 hover:text-primary-800 font-medium text-sm"
                    >
                      View Resource
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
            <button className="btn btn-primary">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark Learning Path Complete
            </button>
          </div>
        </div>
      )}
      
      {employee.projects.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-medium mb-4">Projects Involved</h3>
          
          <div className="space-y-3">
            {employee.projects.map((project, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <h4 className="font-medium">{project}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeProfile;