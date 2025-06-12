import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';
import Employees from './pages/Employees';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import JobMatching from './pages/JobMatching';
import EmployeeJobMatching from './pages/EmployeeJobMatching';
import LearningPaths from './pages/LearningPaths';
import Settings from './pages/Settings';
import EmployeeProfile from './pages/EmployeeProfile';

const App: React.FC = () => {
  return (
    <Routes>
      {/* Landing Page */}
      <Route path="/" element={<LandingPage />} />
      
      {/* Manager Routes */}
      <Route path="/manager/*" element={
        <Layout userType="manager">
          <Routes>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employees/:id" element={<EmployeeProfile />} />
            <Route path="skill-gap-analysis" element={<SkillGapAnalysis />} />
            <Route path="job-matching" element={<JobMatching />} />
            <Route path="learning-paths" element={<LearningPaths />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Layout>
      } />
      
      {/* Employee Routes */}
      <Route path="/employee/*" element={
        <Layout userType="employee">
          <Routes>
            <Route path="dashboard" element={<EmployeeDashboard />} />
            <Route path="job-matching" element={<EmployeeJobMatching />} />
            <Route path="learning-paths" element={<LearningPaths />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Layout>
      } />
    </Routes>
  );
};

export default App;