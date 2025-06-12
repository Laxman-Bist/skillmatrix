import React from 'react';
import { Job } from '../types';
import { CalendarDays, MapPin, Layers } from 'lucide-react';

interface JobCardProps {
  job: Job;
  matchScore?: number;
}

const JobCard: React.FC<JobCardProps> = ({ job, matchScore }) => {
  // Get top skills by importance
  const criticalSkills = job.requiredSkills
    .filter(skill => skill.importance === 'required')
    .slice(0, 3);
  
  return (
    <div className="card h-full">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-gray-600 text-sm">{job.department}</p>
          <span className="badge badge-secondary text-xs mt-1">
            Level {job.jobLevel}
          </span>
        </div>
        {matchScore !== undefined && (
          <div className={`text-white text-sm font-medium rounded-full h-10 w-10 flex items-center justify-center ${
            matchScore >= 80 ? 'bg-success-500' : 
            matchScore >= 60 ? 'bg-warning-500' : 'bg-error-500'
          }`}>
            {matchScore}%
          </div>
        )}
      </div>
      
      <div className="mb-4 space-y-1 text-sm text-gray-600">
        <div className="flex items-center">
          <MapPin size={16} className="mr-2 text-gray-400" />
          <span>{job.location} {job.isRemote && '(Remote Available)'}</span>
        </div>
        <div className="flex items-center">
          <CalendarDays size={16} className="mr-2 text-gray-400" />
          <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center">
          <Layers size={16} className="mr-2 text-gray-400" />
          <span>Job Level: {job.jobLevel}</span>
        </div>
      </div>
      
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Required Skills</h4>
        <div className="flex flex-wrap gap-2">
          {criticalSkills.map((skill) => (
            <span key={skill.id} className="badge badge-primary">
              {skill.name} (Level {skill.minimumLevel}+)
            </span>
          ))}
          {job.requiredSkills.length > 3 && (
            <span className="badge bg-gray-100 text-gray-700">
              +{job.requiredSkills.length - 3} more
            </span>
          )}
        </div>
      </div>
      
      <p className="text-gray-600 text-sm line-clamp-2 mb-4">{job.description}</p>
      
      <div className="mt-auto pt-3 border-t border-gray-100">
        <button className="btn btn-primary w-full">
          View Details
        </button>
      </div>
    </div>
  );
};

export default JobCard;