import { Job } from '../types';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Full Stack Developer',
    department: 'Engineering',
    requiredSkills: [
      { id: '1', name: 'JavaScript', importance: 'required', minimumLevel: 4 },
      { id: '2', name: 'React', importance: 'required', minimumLevel: 3 },
      { id: '3', name: 'Node.js', importance: 'required', minimumLevel: 3 },
      { id: '26', name: 'MongoDB', importance: 'preferred', minimumLevel: 2 },
      { id: '27', name: 'TypeScript', importance: 'preferred', minimumLevel: 3 },
    ],
    description: 'We are seeking an experienced Full Stack Developer to join our Engineering team. The ideal candidate will have strong skills in JavaScript, React, and Node.js.',
    postedDate: '2023-11-15',
    location: 'Chicago, IL',
    isRemote: true,
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    department: 'Design',
    requiredSkills: [
      { id: '6', name: 'UI Design', importance: 'required', minimumLevel: 4 },
      { id: '7', name: 'User Research', importance: 'required', minimumLevel: 3 },
      { id: '8', name: 'Figma', importance: 'required', minimumLevel: 4 },
      { id: '28', name: 'Prototyping', importance: 'preferred', minimumLevel: 3 },
      { id: '29', name: 'Accessibility', importance: 'preferred', minimumLevel: 2 },
    ],
    description: 'Join our Design team as a UX/UI Designer to create intuitive and visually appealing user interfaces for our products. Experience with user research and Figma is essential.',
    postedDate: '2023-12-05',
    location: 'Boston, MA',
    isRemote: false,
  },
  {
    id: '3',
    title: 'Data Analyst',
    department: 'Analytics',
    requiredSkills: [
      { id: '15', name: 'Data Analysis', importance: 'required', minimumLevel: 4 },
      { id: '18', name: 'SQL', importance: 'required', minimumLevel: 4 },
      { id: '16', name: 'Python', importance: 'preferred', minimumLevel: 3 },
      { id: '19', name: 'Data Visualization', importance: 'required', minimumLevel: 3 },
      { id: '30', name: 'Excel', importance: 'required', minimumLevel: 4 },
    ],
    description: 'We are looking for a Data Analyst to help extract insights from our business data. The ideal candidate will have strong SQL skills and experience with data visualization tools.',
    postedDate: '2024-01-10',
    location: 'Remote',
    isRemote: true,
  },
];