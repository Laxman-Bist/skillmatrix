import React from 'react';

interface SkillLevelBarProps {
  level: number;
  maxLevel?: number;
  showLabel?: boolean;
  colorClass?: string;
}

const SkillLevelBar: React.FC<SkillLevelBarProps> = ({ 
  level, 
  maxLevel = 5,
  showLabel = true,
  colorClass = 'bg-primary-600'
}) => {
  const percentage = Math.min(Math.max((level / maxLevel) * 100, 0), 100);
  
  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between mb-1 text-xs text-gray-700">
          <span>{level.toFixed(1)}</span>
          <span>/ {maxLevel.toFixed(1)}</span>
        </div>
      )}
      <div className="skill-level">
        <div 
          className={`skill-level-bar ${colorClass}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillLevelBar;