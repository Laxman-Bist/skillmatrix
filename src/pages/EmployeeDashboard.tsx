import React from 'react';
import { TrendingUp, Briefcase, Users, Award, ArrowRight, MapPin, Calendar, Star } from 'lucide-react';
import { jobs } from '../data';
import DoughnutChart from '../components/DoughnutChart';

const EmployeeDashboard: React.FC = () => {
  // Mock data for employee dashboard
  const jobTrends = {
    labels: ['Engineering', 'Design', 'Product', 'Analytics', 'Marketing'],
    values: [35, 20, 15, 18, 12],
  };

  const skillDemand = {
    labels: ['JavaScript', 'Python', 'UI Design', 'Data Analysis', 'Project Management'],
    values: [25, 22, 18, 20, 15],
  };

  const recentJobOpenings = jobs.slice(0, 3);

  const careerInsights = [
    {
      title: 'High Demand Skills',
      description: 'JavaScript and Python are the most sought-after technical skills',
      trend: '+15%',
      color: 'success'
    },
    {
      title: 'Remote Opportunities',
      description: '68% of new job postings offer remote work options',
      trend: '+8%',
      color: 'primary'
    },
    {
      title: 'Career Growth',
      description: 'Average promotion timeline is 18 months with skill development',
      trend: '-2 months',
      color: 'secondary'
    }
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Welcome Section */}
      <div className="card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome to Your Career Hub</h2>
            <p className="text-gray-600">
              Discover opportunities, track trends, and advance your career with AI-powered insights.
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="btn btn-primary">
              Upload Resume for Analysis
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-primary-50 rounded-lg p-4 text-center">
            <p className="text-sm text-primary-600">Available Jobs</p>
            <p className="text-3xl font-bold text-primary-700">{jobs.length}</p>
          </div>
          
          <div className="bg-secondary-50 rounded-lg p-4 text-center">
            <p className="text-sm text-secondary-600">Departments Hiring</p>
            <p className="text-3xl font-bold text-secondary-700">6</p>
          </div>
          
          <div className="bg-accent-50 rounded-lg p-4 text-center">
            <p className="text-sm text-accent-600">Remote Positions</p>
            <p className="text-3xl font-bold text-accent-700">{jobs.filter(j => j.isRemote).length}</p>
          </div>
        </div>
      </div>

      {/* Job Trends and Skill Demand Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-80">
          <DoughnutChart 
            data={jobTrends} 
            title="Job Openings by Department" 
          />
        </div>
        
        <div className="h-80">
          <DoughnutChart 
            data={skillDemand} 
            title="Most In-Demand Skills" 
            colorScheme={[
              '#0F766E', '#1E3A8A', '#F97066', 
              '#15803D', '#B45309'
            ]}
          />
        </div>
      </div>

      {/* Career Insights */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <TrendingUp className="mr-2 h-5 w-5 text-primary-700" />
          Career Market Insights
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {careerInsights.map((insight, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-900">{insight.title}</h4>
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                  insight.color === 'success' ? 'bg-success-100 text-success-700' :
                  insight.color === 'primary' ? 'bg-primary-100 text-primary-700' :
                  'bg-secondary-100 text-secondary-700'
                }`}>
                  {insight.trend}
                </span>
              </div>
              <p className="text-gray-600 text-sm">{insight.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Job Openings */}
      <div className="card">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold flex items-center">
            <Briefcase className="mr-2 h-5 w-5 text-secondary-600" />
            Latest Job Openings
          </h3>
          <button className="text-primary-700 hover:text-primary-800 font-medium text-sm flex items-center">
            View All Jobs
            <ArrowRight className="ml-1 h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentJobOpenings.map((job) => (
            <div key={job.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{job.title}</h4>
                  <p className="text-sm text-gray-600">{job.department}</p>
                </div>
                <span className="badge badge-primary">Level {job.jobLevel}</span>
              </div>
              
              <div className="space-y-2 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin size={14} className="mr-2 text-gray-400" />
                  <span>{job.location} {job.isRemote && '(Remote)'}</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2 text-gray-400" />
                  <span>Posted: {new Date(job.postedDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center text-warning-600">
                  <Star size={14} className="mr-1" />
                  <span className="text-sm font-medium">Match: --</span>
                </div>
                <button className="btn btn-secondary text-sm py-1.5">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="text-xl font-semibold mb-6 flex items-center">
          <Award className="mr-2 h-5 w-5 text-accent-500" />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button className="bg-primary-50 hover:bg-primary-100 border border-primary-200 rounded-lg p-4 text-left transition-colors">
            <Briefcase className="h-6 w-6 text-primary-600 mb-2" />
            <h4 className="font-medium text-primary-900 mb-1">Find Jobs</h4>
            <p className="text-sm text-primary-700">Browse available positions</p>
          </button>
          
          <button className="bg-secondary-50 hover:bg-secondary-100 border border-secondary-200 rounded-lg p-4 text-left transition-colors">
            <TrendingUp className="h-6 w-6 text-secondary-600 mb-2" />
            <h4 className="font-medium text-secondary-900 mb-1">Skill Analysis</h4>
            <p className="text-sm text-secondary-700">Analyze your skills</p>
          </button>
          
          <button className="bg-accent-50 hover:bg-accent-100 border border-accent-200 rounded-lg p-4 text-left transition-colors">
            <Users className="h-6 w-6 text-accent-600 mb-2" />
            <h4 className="font-medium text-accent-900 mb-1">Network</h4>
            <p className="text-sm text-accent-700">Connect with colleagues</p>
          </button>
          
          <button className="bg-success-50 hover:bg-success-100 border border-success-200 rounded-lg p-4 text-left transition-colors">
            <Award className="h-6 w-6 text-success-600 mb-2" />
            <h4 className="font-medium text-success-900 mb-1">Learn</h4>
            <p className="text-sm text-success-700">Start learning path</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;