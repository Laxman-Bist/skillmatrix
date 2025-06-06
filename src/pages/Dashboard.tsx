import React from 'react';
import { BarChart, PieChart, TrendingUp, Users, Award, Lightbulb, AlertTriangle } from 'lucide-react';
import { dashboardData } from '../data/mockData';
import DoughnutChart from '../components/DoughnutChart';

const Dashboard: React.FC = () => {
  const { departmentBreakdown, skillDistribution, topSkillGaps, recentActivities } = dashboardData;
  
  const departmentChartData = {
    labels: departmentBreakdown.map(dept => dept.department),
    values: departmentBreakdown.map(dept => dept.count),
  };
  
  const skillChartData = {
    labels: skillDistribution.map(skill => skill.category),
    values: skillDistribution.map(skill => skill.count),
  };
  
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6">
        <div className="md:w-8/12">
          <div className="card">
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <BarChart className="mr-2 h-5 w-5 text-primary-700" />
              Organizational Skill Overview
            </h2>
            
            <p className="text-gray-600 mb-6">
              The SkillMatrix AI has analyzed your organization's skill data to provide insights into current capabilities and areas for improvement.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Total Employees</p>
                <p className="text-3xl font-bold text-primary-700">{dashboardData.employeeCount}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Skill Categories</p>
                <p className="text-3xl font-bold text-secondary-600">{skillDistribution.length}</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <p className="text-sm text-gray-500">Critical Skill Gaps</p>
                <p className="text-3xl font-bold text-accent-500">{topSkillGaps.filter(gap => gap.gap >= 1).length}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="md:w-4/12">
          <div className="card h-full">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-warning-500" />
              Critical Skill Gaps
            </h2>
            <div className="space-y-4">
              {topSkillGaps.map((gap, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{gap.skill}</p>
                    <p className="text-xs text-gray-500">{gap.department}</p>
                  </div>
                  <div className="bg-error-100 text-error-700 px-3 py-1 rounded-full text-sm font-medium">
                    Gap: {gap.gap.toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-80">
          <DoughnutChart 
            data={departmentChartData} 
            title="Employees by Department" 
          />
        </div>
        
        <div className="h-80">
          <DoughnutChart 
            data={skillChartData} 
            title="Skill Distribution by Category" 
          />
        </div>
      </div>
      
      <div className="card">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary-700" />
          Recent Activities
        </h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentActivities.map((activity) => {
                let icon;
                let details;
                
                switch(activity.type) {
                  case 'skill_assessment':
                    icon = <Award className="h-5 w-5 text-primary-600" />;
                    details = `${activity.employee} assessed at level ${activity.level} in ${activity.skill}`;
                    break;
                  case 'learning_completion':
                    icon = <Lightbulb className="h-5 w-5 text-success-600" />;
                    details = `${activity.employee} completed "${activity.course}"`;
                    break;
                  case 'job_match':
                    icon = <Users className="h-5 w-5 text-secondary-600" />;
                    details = `${activity.employee} matched at ${activity.score}% for ${activity.job} position`;
                    break;
                  case 'new_employee':
                    icon = <Users className="h-5 w-5 text-accent-500" />;
                    details = `${activity.employee} joined as ${activity.position}`;
                    break;
                  case 'skill_gap_identified':
                    icon = <AlertTriangle className="h-5 w-5 text-warning-500" />;
                    details = `Gap of ${activity.gap} identified in ${activity.skill} for ${activity.department}`;
                    break;
                  default:
                    icon = <TrendingUp className="h-5 w-5 text-gray-500" />;
                    details = 'Activity recorded';
                }
                
                return (
                  <tr key={activity.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {icon}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {activity.type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {details}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(activity.date).toLocaleDateString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;