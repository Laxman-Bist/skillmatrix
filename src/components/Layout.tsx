import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  userType: 'manager' | 'employee';
}

const Layout: React.FC<LayoutProps> = ({ children, userType }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path.includes('/dashboard')) {
      return userType === 'manager' ? 'Manager Dashboard' : 'Employee Dashboard';
    }
    if (path.includes('/employees')) {
      if (path.includes('/employees/')) {
        return 'Employee Profile';
      }
      return 'Employees';
    }
    if (path.includes('/skill-gap-analysis')) {
      return 'Skill Gap Analysis';
    }
    if (path.includes('/job-matching')) {
      return userType === 'manager' ? 'Job Matching' : 'Resume Analysis & Job Matching';
    }
    if (path.includes('/learning-paths')) {
      return 'Learning Paths';
    }
    if (path.includes('/settings')) {
      return 'Settings';
    }
    
    return 'SkillMatrix';
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar for desktop */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        userType={userType}
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getPageTitle()} toggleSidebar={toggleSidebar} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;