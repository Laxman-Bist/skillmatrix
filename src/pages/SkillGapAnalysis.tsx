import React, { useState } from 'react';
import { BarChart2, Filter, Zap, Sparkles, AlertCircle, CheckCircle, TrendingUp, Users, BookOpen, Target } from 'lucide-react';
import { skillGapData } from '../data';
import DepartmentSkillsChart from '../components/DepartmentSkillsChart';
import SkillGapBar from '../components/SkillGapBar';
import { generateDepartmentRecommendations } from '../services/gemini';

interface Recommendation {
  criticalGaps: string[];
  emergingSkills: string[];
  redundancies: string[];
  recommendations: string[];
}

const SkillGapAnalysis: React.FC = () => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>(Object.keys(skillGapData.departments)[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState<Recommendation | null>(null);
  const [error, setError] = useState<string>('');

  const handleDepartmentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDepartment(event.target.value);
    // Clear previous recommendations when department changes
    setAiRecommendations(null);
    setError('');
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

  const handleGenerateRecommendations = async () => {
    setIsGenerating(true);
    setError('');
    setAiRecommendations(null);

    try {
      const recommendations = await generateDepartmentRecommendations(
        selectedDepartment,
        currentDeptData.currentSkills,
        currentDeptData.requiredSkills
      );

      if (recommendations) {
        setAiRecommendations(recommendations);
      } else {
        setError('Failed to generate recommendations. Please try again.');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred while generating recommendations. Please check your API configuration.');
      console.error('Recommendation generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

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
                <h4 className="font-medium mb-2">Quick Insight</h4>
                <p className="text-sm text-gray-600 mb-4">
                  {sortedGaps[0]?.gap && sortedGaps[0].gap > 0 
                    ? `Focus on improving ${sortedGaps[0].name} skills within the ${selectedDepartment} team through targeted training programs.`
                    : `The ${selectedDepartment} team has a good balance of skills. Consider advanced training to further strengthen existing competencies.`
                  }
                </p>
                
                <button 
                  onClick={handleGenerateRecommendations}
                  disabled={isGenerating}
                  className="btn btn-secondary w-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Generating AI Recommendations...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Detailed Recommendations
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="card">
          <div className="bg-error-50 border-l-4 border-error-500 p-4 rounded-r-lg">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-error-500 mr-2" />
              <p className="text-error-700 font-medium">Error Generating Recommendations</p>
            </div>
            <p className="text-error-600 text-sm mt-1">{error}</p>
          </div>
        </div>
      )}

      {/* AI-Generated Recommendations */}
      {aiRecommendations && (
        <div className="card">
          <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6 rounded-t-xl -m-6 mb-6">
            <h3 className="text-xl font-semibold mb-2 flex items-center">
              <Sparkles className="mr-2 h-5 w-5" />
              AI-Powered Recommendations for {selectedDepartment} Department
            </h3>
            <p className="text-primary-100">
              Based on current skill gaps and industry trends analysis
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Critical Gaps */}
            <div className="bg-error-50 border border-error-200 rounded-lg p-4">
              <h4 className="font-semibold text-error-800 mb-3 flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                Critical Skill Gaps
              </h4>
              {aiRecommendations.criticalGaps.length > 0 ? (
                <div className="space-y-2">
                  {aiRecommendations.criticalGaps.map((gap, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 bg-error-500 rounded-full mr-2"></div>
                      <span className="text-sm text-error-700">{gap}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-error-600">No critical gaps identified</p>
              )}
            </div>

            {/* Emerging Skills */}
            <div className="bg-success-50 border border-success-200 rounded-lg p-4">
              <h4 className="font-semibold text-success-800 mb-3 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Emerging Skills to Develop
              </h4>
              {aiRecommendations.emergingSkills.length > 0 ? (
                <div className="space-y-2">
                  {aiRecommendations.emergingSkills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 bg-success-500 rounded-full mr-2"></div>
                      <span className="text-sm text-success-700">{skill}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-success-600">No emerging skills identified</p>
              )}
            </div>

            {/* Redundancies */}
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-4">
              <h4 className="font-semibold text-warning-800 mb-3 flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Skill Redundancies
              </h4>
              {aiRecommendations.redundancies.length > 0 ? (
                <div className="space-y-2">
                  {aiRecommendations.redundancies.map((redundancy, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 bg-warning-500 rounded-full mr-2"></div>
                      <span className="text-sm text-warning-700">{redundancy}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-warning-600">No redundancies identified</p>
              )}
            </div>

            {/* Action Items */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h4 className="font-semibold text-primary-800 mb-3 flex items-center">
                <Target className="mr-2 h-5 w-5" />
                Recommended Actions
              </h4>
              {aiRecommendations.recommendations.length > 0 ? (
                <div className="space-y-2">
                  {aiRecommendations.recommendations.map((recommendation, index) => (
                    <div key={index} className="flex items-start">
                      <div className="h-2 w-2 bg-primary-500 rounded-full mr-2 mt-2"></div>
                      <span className="text-sm text-primary-700">{recommendation}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-primary-600">No specific recommendations available</p>
              )}
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-success-600 mr-2" />
              <span className="text-success-800 font-medium">AI analysis completed successfully</span>
            </div>
            <div className="flex space-x-3">
              <button className="btn btn-secondary text-sm">
                <BookOpen className="mr-1.5 h-4 w-4" />
                View Learning Resources
              </button>
              <button className="btn btn-primary text-sm">
                Export Report
              </button>
            </div>
          </div>
        </div>
      )}
      
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
            <h4 className="font-medium text-primary-700">Standard Recommendation</h4>
            <p className="text-sm text-gray-600 mt-1">
              Based on the identified gaps, focus on specialized training for 
              {sortedGaps[0]?.name ? ` ${sortedGaps[0].name}` : ' key skills'} and consider recruiting profiles 
              with strong backgrounds in {sortedGaps[1]?.name ? ` ${sortedGaps[1].name}` : ' secondary gap areas'}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapAnalysis;