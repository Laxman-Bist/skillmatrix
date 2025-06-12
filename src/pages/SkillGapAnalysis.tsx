import React, { useState } from 'react';
import { BarChart2, Filter, Zap } from 'lucide-react';
import { skillGapData } from '../data';
import DepartmentSkillsChart from '../components/DepartmentSkillsChart';
import SkillGapBar from '../components/SkillGapBar';

const SkillGapAnalysis: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>(Object.keys(skillGapData.departments)[0]);

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(event.target.value);
  };

  const currentDeptData = skillGapData.departments[selectedDepartment as keyof typeof skillGapData.departments];
  
  // Calculate gaps
  const skillGaps = currentDeptData.currentSkills.map(currentSkill => {
    const requiredSkill = currentDeptData.requiredSkills.find(
      s => s.name === currentSkill.name
    );
    
    if (!requiredSkill) return null;
    
    return {
      name: currentSkill.name,
      current: currentSkill.level,
      required: requiredSkill.level,
      gap: Math.max(0, requiredSkill.level - currentSkill.level),
    };
  }).filter(Boolean);
  
  // Sort by gap (largest first)
  const sortedGaps = [...skillGaps].sort((a, b) => (b?.gap || 0) - (a?.gap || 0));

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h2 className="text-xl font-semibold mb-4 md:mb-0 flex items-center">
            <BarChart2 className="mr-2 h-5 w-5 text-primary-700" />
            Skill Gap Analysis
          </h2>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Filter className="h-5 w-5 text-gray-400" />
            </div>
            <select
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              className="input pl-10 pr-10 appearance-none"
            >
              {Object.keys(skillGapData.departments).map((dept) => (
                <option key={dept} value={dept}>
                  {dept} Department
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <p className="text-gray-600 mb-6">
          This analysis compares current skill levels within the {selectedDepartment} department against industry benchmarks and required competencies to identify gaps that may need addressing through training or recruitment.
        </p>
        
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-7/12">
            <DepartmentSkillsChart 
              department={selectedDepartment}
              currentSkills={currentDeptData.currentSkills}
              requiredSkills={currentDeptData.requiredSkills}
            />
          </div>
          
          <div className="lg:w-5/12">
            <div className="bg-white p-4 rounded-lg shadow-card h-full">
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <Zap className="mr-2 h-5 w-5 text-warning-500" />
                Skill Gaps
              </h3>
              
              <div className="space-y-2 overflow-y-auto max-h-64">
                {sortedGaps.map((gap, index) => (
                  gap && (
                    <div key={index} className="mb-2">
                      <SkillGapBar 
                        skillName={gap.name}
                        currentLevel={gap.current}
                        requiredLevel={gap.required}
                      />
                    </div>
                  )
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <h4 className="font-medium mb-2">AI Recommendation</h4>
                <p className="text-sm text-gray-600">
                  {sortedGaps[0]?.gap && sortedGaps[0].gap > 0 
                    ? `Focus on improving ${sortedGaps[0].name} skills within the ${selectedDepartment} team through targeted training programs.`
                    : `The ${selectedDepartment} team has a good balance of skills. Consider advanced training to further strengthen existing competencies.`
                  }
                </p>
                
                <button className="btn btn-secondary mt-4 w-full">
                  Generate Detailed Recommendations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="card">
        <h3 className="text-lg font-medium mb-4">Action Items</h3>
        
        <div className="space-y-4">
          <div className="bg-warning-50 border-l-4 border-warning-500 p-4 rounded-r-lg">
            <h4 className="font-medium text-warning-700">Critical Gaps</h4>
            <p className="text-sm text-gray-600 mt-1">
              {sortedGaps.filter(g => g && g.gap > 1).length > 0 
                ? `Address ${sortedGaps.filter(g => g && g.gap > 1).length} critical skill gaps in ${selectedDepartment} department.`
                : `No critical skill gaps identified in ${selectedDepartment} department.`
              }
            </p>
          </div>
          
          <div className="bg-success-50 border-l-4 border-success-500 p-4 rounded-r-lg">
            <h4 className="font-medium text-success-700">Strengths</h4>
            <p className="text-sm text-gray-600 mt-1">
              {sortedGaps.filter(g => g && g.gap <= 0).length > 0
                ? `${sortedGaps.filter(g => g && g.gap <= 0).length} skills exceed requirements in ${selectedDepartment} department.`
                : `All skills in ${selectedDepartment} department need improvement.`
              }
            </p>
          </div>
          
          <div className="bg-primary-50 border-l-4 border-primary-500 p-4 rounded-r-lg">
            <h4 className="font-medium text-primary-700">AI-Powered Recommendation</h4>
            <p className="text-sm text-gray-600 mt-1">
              Based on the identified gaps, our AI system recommends focusing on specialized training for 
              {sortedGaps[0]?.name ? ` ${sortedGaps[0].name}` : ' key skills'} and considering recruiting profiles 
              with strong backgrounds in {sortedGaps[1]?.name ? ` ${sortedGaps[1].name}` : ' secondary gap areas'}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalysis;