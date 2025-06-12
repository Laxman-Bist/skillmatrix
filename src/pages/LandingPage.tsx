import React from 'react';
import { Link } from 'react-router-dom';
import { BarChart2, Users, Briefcase, BookOpen, TrendingUp, Upload } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-primary-700 rounded-xl p-3 mr-4">
              <BarChart2 className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900">
              Ski
              <span className="text-6xl text-red-600 font-extrabold">LLM</span>
              atrix
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            AI-Powered Skill Management Platform for Modern Organizations
          </p>
          <p className="text-lg text-gray-500 mt-4 max-w-2xl mx-auto">
            Leverage artificial intelligence to analyze skills, identify gaps, match talent to opportunities, 
            and create personalized learning paths for your workforce.
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Manager Portal */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-8 text-white">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 mr-3" />
                <h2 className="text-3xl font-bold">Manager</h2>
              </div>
              <p className="text-primary-100 text-lg">
                Comprehensive workforce analytics and strategic planning tools
              </p>
            </div>
            
            <div className="p-8">
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-lg p-2 mr-4">
                    <BarChart2 className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Dashboard Analytics</h3>
                    <p className="text-gray-600 text-sm">
                      View organizational skill metrics, department breakdowns, and critical gap analysis
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-secondary-100 rounded-lg p-2 mr-4">
                    <TrendingUp className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Skill Gap Analysis</h3>
                    <p className="text-gray-600 text-sm">
                      AI-powered analysis of current vs required skills across departments
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent-100 rounded-lg p-2 mr-4">
                    <Briefcase className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Job Matching</h3>
                    <p className="text-gray-600 text-sm">
                      Find the best internal candidates for open positions using AI analysis
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-success-100 rounded-lg p-2 mr-4">
                    <BookOpen className="h-5 w-5 text-success-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Learning Paths</h3>
                    <p className="text-gray-600 text-sm">
                      Create and manage personalized learning journeys for team members
                    </p>
                  </div>
                </div>
              </div>
              
              <Link
                to="/manager/dashboard"
                className="btn btn-primary w-full text-lg py-3 flex items-center justify-center"
              >
                <Users className="mr-2 h-5 w-5" />
                Access Manager Portal
              </Link>
            </div>
          </div>

          {/* Employee Portal */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <div className="bg-gradient-to-r from-secondary-600 to-secondary-700 p-8 text-white">
              <div className="flex items-center mb-4">
                <Upload className="h-8 w-8 mr-3" />
                <h2 className="text-3xl font-bold">Employee</h2>
              </div>
              <p className="text-secondary-100 text-lg">
                Personal career development and opportunity discovery platform
              </p>
            </div>
            
            <div className="p-8">
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-secondary-100 rounded-lg p-2 mr-4">
                    <TrendingUp className="h-5 w-5 text-secondary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Job Trends Dashboard</h3>
                    <p className="text-gray-600 text-sm">
                      Discover trending job opportunities and market insights
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary-100 rounded-lg p-2 mr-4">
                    <Briefcase className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Job Openings</h3>
                    <p className="text-gray-600 text-sm">
                      View available positions with summarized requirements and match scores
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-accent-100 rounded-lg p-2 mr-4">
                    <Upload className="h-5 w-5 text-accent-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Resume Analysis</h3>
                    <p className="text-gray-600 text-sm">
                      Upload your resume to get AI-powered job match percentages
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-success-100 rounded-lg p-2 mr-4">
                    <BookOpen className="h-5 w-5 text-success-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Learning Paths</h3>
                    <p className="text-gray-600 text-sm">
                      Access personalized learning recommendations to advance your career
                    </p>
                  </div>
                </div>
              </div>
              
              <Link
                to="/employee/dashboard"
                className="btn btn-secondary w-full text-lg py-3 flex items-center justify-center"
              >
                <Upload className="mr-2 h-5 w-5" />
                Access Employee Portal
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Powered by Advanced AI Technology</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="bg-primary-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                <BarChart2 className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Smart Analytics</h4>
              <p className="text-gray-600 text-sm">
                AI-driven insights into skill gaps, workforce trends, and optimization opportunities
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="bg-secondary-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-secondary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Intelligent Matching</h4>
              <p className="text-gray-600 text-sm">
                Advanced algorithms match employees to roles based on skills, experience, and potential
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="bg-accent-100 rounded-full h-12 w-12 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-accent-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Personalized Learning</h4>
              <p className="text-gray-600 text-sm">
                Customized learning paths generated by AI to bridge skill gaps effectively
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;