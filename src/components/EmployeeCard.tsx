import React from 'react';
import { Link } from 'react-router-dom';
import { Employee } from '../types';
import SkillLevelBar from './SkillLevelBar';

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  // Get top 3 skills by level
  const topSkills = [...employee.skills]
    .sort((a, b) => b.level - a.level)
    .slice(0, 3);
  
  return (
    <div className="card h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4">
        <div className="h-14 w-14 flex-shrink-0 rounded-full overflow-hidden mr-4 mb-3 sm:mb-0">
          <img
            src={employee.profileImage}
            alt={employee.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{employee.name}</h3>
          <p className="text-gray-600 text-sm">{employee.position}</p>
          <p className="text-gray-500 text-xs">{employee.department}</p>
          <span className="badge badge-secondary text-xs mt-1">
            Level {employee.jobLevel}
          </span>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Top Skills</h4>
        <div className="space-y-2">
          {topSkills.map((skill) => (
            <div key={skill.id} className="flex flex-col">
              <div className="flex justify-between mb-1">
                <span className="text-sm text-gray-600">{skill.name}</span>
                <span className="badge badge-primary">{skill.category}</span>
              </div>
              <SkillLevelBar level={skill.level} />
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-auto pt-3 border-t border-gray-100">
        <Link
          to={`/employees/${employee.id}`}
          className="btn btn-primary w-full"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default EmployeeCard;