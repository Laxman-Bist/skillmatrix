import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Components
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import SkillGapAnalysis from './pages/SkillGapAnalysis';
import JobMatching from './pages/JobMatching';
import LearningPaths from './pages/LearningPaths';
import Settings from './pages/Settings';
import EmployeeProfile from './pages/EmployeeProfile';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/employees/:id" element={<EmployeeProfile />} />
        <Route path="/skill-gap-analysis" element={<SkillGapAnalysis />} />
        <Route path="/job-matching" element={<JobMatching />} />
        <Route path="/learning-paths" element={<LearningPaths />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Layout>
  );
};

export default App;