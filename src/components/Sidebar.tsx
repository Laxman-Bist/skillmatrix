import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, LayoutDashboard, Users, BarChart2, Briefcase, BookOpen, Settings, Upload, TrendingUp } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'manager' | 'employee';
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, userType }) => {
  const location = useLocation();

  const managerNavItems = [
    { name: 'Dashboard', path: '/manager/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Employees', path: '/manager/employees', icon: <Users size={20} /> },
    { name: 'Skill Gap Analysis', path: '/manager/skill-gap-analysis', icon: <BarChart2 size={20} /> },
    { name: 'Job Matching', path: '/manager/job-matching', icon: <Briefcase size={20} /> },
    { name: 'Learning Paths', path: '/manager/learning-paths', icon: <BookOpen size={20} /> },
    { name: 'Settings', path: '/manager/settings', icon: <Settings size={20} /> },
  ];

  const employeeNavItems = [
    { name: 'Dashboard', path: '/employee/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Job Matching', path: '/employee/job-matching', icon: <Upload size={20} /> },
    { name: 'Learning Paths', path: '/employee/learning-paths', icon: <BookOpen size={20} /> },
    { name: 'Settings', path: '/employee/settings', icon: <Settings size={20} /> },
  ];

  const navItems = userType === 'manager' ? managerNavItems : employeeNavItems;

  // Base classes for sidebar
  const sidebarClasses = `bg-primary-700 text-white w-64 h-screen flex flex-col transition-transform duration-300 ease-in-out fixed top-0 left-0 z-40 lg:relative lg:translate-x-0 ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  }`;

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden"
          onClick={onClose}
        ></div>
      )}
      
      <aside className={sidebarClasses}>
        <div className="p-6 flex items-center justify-between">
          <Link to="/" className="text-white flex items-center space-x-2">
            <div className="bg-white rounded-md p-1.5">
              <BarChart2 className="h-6 w-6 text-primary-700" />
            </div>
            <span className="text-xl font-bold">
              Ski
              <span className="text-2xl text-red-600 font-extrabold">LLM</span>
              atrix
            </span>
          </Link>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 lg:hidden focus:outline-none"
          >
            <X size={24} />
          </button>
        </div>

        {/* User Type Badge */}
        <div className="px-6 mb-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            userType === 'manager' 
              ? 'bg-primary-800 text-primary-100' 
              : 'bg-secondary-600 text-white'
          }`}>
            {userType === 'manager' ? 'Manager Portal' : 'Employee Portal'}
          </div>
        </div>

        <nav className="mt-2 flex-1 overflow-y-auto">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center py-3 px-4 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary-800 text-white'
                        : 'text-primary-100 hover:bg-primary-600 hover:text-white'
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                    {isActive && (
                      <span className="ml-auto h-2 w-2 rounded-full bg-white"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-primary-600 mt-auto">
          <div className="bg-primary-800 rounded-lg p-3">
            <p className="text-sm text-primary-200">Powered by</p>
            <p className="font-medium">LLM</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;