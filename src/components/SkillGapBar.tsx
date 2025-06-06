import React from 'react';

interface SkillGapBarProps {
  currentLevel: number;
  requiredLevel: number;
  skillName: string;
  maxLevel?: number;
}

const SkillGapBar: React.FC<SkillGapBarProps> = ({ 
  currentLevel,
  requiredLevel,
  skillName,
  maxLevel = 5
}) => {
  const currentPercentage = (currentLevel / maxLevel) * 100;
  const requiredPercentage = (requiredLevel / maxLevel) * 100;
  const gap = requiredLevel - currentLevel;
  
  return (
    <div className="w-full mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{skillName}</span>
        <span className="text-xs text-gray-500">
          {gap > 0 
            ? <span className="text-error-600">Gap: {gap.toFixed(1)}</span>
            : <span className="text-success-600">No gap</span>
          }
        </span>
      </div>
      <div className="skill-level">
        <div 
          className="skill-level-bar bg-primary-300" 
          style={{ width: `${requiredPercentage}%` }}
        >
          <div 
            className="h-full bg-primary-600" 
            style={{ width: `${(currentPercentage / requiredPercentage) * 100}%` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between mt-1 text-xs">
        <span className="text-primary-700">Current: {currentLevel.toFixed(1)}</span>
        <span className="text-primary-900">Required: {requiredLevel.toFixed(1)}</span>
      </div>
    </div>
  );
};

export default SkillGapBar;