import React from 'react';
import { Settings as SettingsIcon, User, Bell, Lock, Database, RefreshCcw } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="space-y-6 animate-slide-up">
      <div className="card">
        <h2 className="text-xl font-semibold mb-6 flex items-center">
          <SettingsIcon className="mr-2 h-5 w-5 text-primary-700" />
          Settings
        </h2>
        
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <User className="mr-2 h-5 w-5 text-gray-500" />
            Account Settings
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                className="input"
                defaultValue="HR Administrator"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="input"
                defaultValue="hr@jmpc.com"
              />
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Bell className="mr-2 h-5 w-5 text-gray-500" />
            Notification Preferences
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-gray-500">Receive email updates for important events</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="email-notifications"
                  className="sr-only"
                  defaultChecked
                />
                <label
                  htmlFor="email-notifications"
                  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                >
                  <span
                    className="block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out translate-x-4"
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">New Skill Gap Alerts</h4>
                <p className="text-sm text-gray-500">Get notified when critical skill gaps are identified</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="skill-gap-alerts"
                  className="sr-only"
                  defaultChecked
                />
                <label
                  htmlFor="skill-gap-alerts"
                  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                >
                  <span
                    className="block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out translate-x-4"
                  ></span>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Job Match Notifications</h4>
                <p className="text-sm text-gray-500">Be notified when high-match job opportunities are found</p>
              </div>
              <div className="relative inline-block w-10 mr-2 align-middle select-none">
                <input
                  type="checkbox"
                  id="job-match-notifications"
                  className="sr-only"
                  defaultChecked
                />
                <label
                  htmlFor="job-match-notifications"
                  className="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                >
                  <span
                    className="block h-6 w-6 rounded-full bg-white transform transition-transform duration-200 ease-in-out translate-x-4"
                  ></span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-6 mb-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Lock className="mr-2 h-5 w-5 text-gray-500" />
            Security
          </h3>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                type="password"
                id="current-password"
                className="input"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                id="new-password"
                className="input"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirm-password"
                className="input"
                placeholder="••••••••"
              />
            </div>
            
            <div className="flex justify-end mt-4">
              <button className="btn btn-primary">
                Update Password
              </button>
            </div>
          </div>
        </div>
        
        <div className="pb-6 mb-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <Database className="mr-2 h-5 w-5 text-gray-500" />
            Data Management
          </h3>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">AI Data Analysis</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Customize how the AI analyzes your organization's skill data.
                  </p>
                </div>
                <button className="btn btn-secondary text-sm py-1.5">
                  Configure
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Import Data</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Import employee skills, job descriptions, or learning resources.
                  </p>
                </div>
                <button className="btn btn-secondary text-sm py-1.5">
                  Import
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Export Reports</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Export skill gap analysis, job matching results, and other reports.
                  </p>
                </div>
                <button className="btn btn-secondary text-sm py-1.5">
                  Export
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-medium">Refresh AI Analysis</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Manually trigger a new AI analysis of your organization's skill data.
                  </p>
                </div>
                <button className="btn btn-accent flex items-center text-sm py-1.5">
                  <RefreshCcw className="mr-1.5 h-4 w-4" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;