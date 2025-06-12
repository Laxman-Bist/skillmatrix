import { SkillCluster } from '../types';

export const skillClusters: SkillCluster[] = [
  {
    id: '1',
    name: 'Frontend Development',
    skills: ['JavaScript', 'React', 'HTML/CSS', 'TypeScript'],
    employees: ['1'],
    redundancy: 'Low',
  },
  {
    id: '2',
    name: 'User Experience',
    skills: ['UI Design', 'User Research', 'Figma', 'Prototyping'],
    employees: ['2'],
    redundancy: 'Low',
  },
  {
    id: '3',
    name: 'Data Science',
    skills: ['Python', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics'],
    employees: ['4'],
    redundancy: 'Medium',
  },
  {
    id: '4',
    name: 'Management',
    skills: ['Leadership', 'Project Management', 'Agile Methodology', 'Team Leadership'],
    employees: ['3', '1'],
    redundancy: 'Medium',
  },
  {
    id: '5',
    name: 'HR Expertise',
    skills: ['Recruiting', 'Employee Relations', 'HR Policies', 'Conflict Resolution', 'HRIS Systems'],
    employees: ['5'],
    redundancy: 'High',
  },
];