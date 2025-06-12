import { MatchScore } from '../types';

// Generate comprehensive match scores for all employees against all jobs
export const matchScores: MatchScore[] = [
  // Full Stack Developer (Job 1)
  {
    employeeId: '1', // Alex Morgan - Senior Developer
    jobId: '1',
    score: 95,
    matchedSkills: 4,
    missingSkills: ['MongoDB'],
  },
  {
    employeeId: '7', // Robert Chen - Junior Developer
    jobId: '1',
    score: 72,
    matchedSkills: 2,
    missingSkills: ['React', 'Node.js', 'MongoDB'],
  },
  {
    employeeId: '3', // Michael Johnson - Product Manager
    jobId: '1',
    score: 40,
    matchedSkills: 1,
    missingSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
  },
  {
    employeeId: '4', // Emily Rodriguez - Data Scientist
    jobId: '1',
    score: 35,
    matchedSkills: 1,
    missingSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
  },
  {
    employeeId: '9', // James Wilson - Data Analyst
    jobId: '1',
    score: 25,
    matchedSkills: 0,
    missingSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'TypeScript'],
  },

  // UX/UI Designer (Job 2)
  {
    employeeId: '2', // Sarah Chen - UX Designer
    jobId: '2',
    score: 90,
    matchedSkills: 3,
    missingSkills: ['Prototyping', 'Accessibility'],
  },
  {
    employeeId: '8', // Lisa Wang - Senior Designer
    jobId: '2',
    score: 88,
    matchedSkills: 3,
    missingSkills: ['User Research', 'Accessibility'],
  },
  {
    employeeId: '1', // Alex Morgan - Senior Developer
    jobId: '2',
    score: 45,
    matchedSkills: 1,
    missingSkills: ['UI Design', 'User Research', 'Figma', 'Prototyping'],
  },
  {
    employeeId: '6', // Jennifer Liu - Marketing Manager
    jobId: '2',
    score: 30,
    matchedSkills: 0,
    missingSkills: ['UI Design', 'User Research', 'Figma', 'Prototyping', 'Accessibility'],
  },
  {
    employeeId: '3', // Michael Johnson - Product Manager
    jobId: '2',
    score: 25,
    matchedSkills: 0,
    missingSkills: ['UI Design', 'User Research', 'Figma', 'Prototyping', 'Accessibility'],
  },

  // Data Analyst (Job 3)
  {
    employeeId: '4', // Emily Rodriguez - Data Scientist
    jobId: '3',
    score: 92,
    matchedSkills: 4,
    missingSkills: ['Excel'],
  },
  {
    employeeId: '9', // James Wilson - Data Analyst
    jobId: '3',
    score: 85,
    matchedSkills: 4,
    missingSkills: ['Python'],
  },
  {
    employeeId: '3', // Michael Johnson - Product Manager
    jobId: '3',
    score: 65,
    matchedSkills: 2,
    missingSkills: ['SQL', 'Python', 'Excel'],
  },
  {
    employeeId: '6', // Jennifer Liu - Marketing Manager
    jobId: '3',
    score: 55,
    matchedSkills: 1,
    missingSkills: ['Data Analysis', 'SQL', 'Python', 'Data Visualization'],
  },
  {
    employeeId: '1', // Alex Morgan - Senior Developer
    jobId: '3',
    score: 40,
    matchedSkills: 1,
    missingSkills: ['Data Analysis', 'SQL', 'Python', 'Data Visualization'],
  },

  // Senior Product Manager (Job 4)
  {
    employeeId: '3', // Michael Johnson - Product Manager
    jobId: '4',
    score: 95,
    matchedSkills: 5,
    missingSkills: [],
  },
  {
    employeeId: '10', // Maria Garcia - HR Director
    jobId: '4',
    score: 78,
    matchedSkills: 2,
    missingSkills: ['Product Strategy', 'Agile Methodology', 'Market Research'],
  },
  {
    employeeId: '1', // Alex Morgan - Senior Developer
    jobId: '4',
    score: 65,
    matchedSkills: 2,
    missingSkills: ['Product Strategy', 'Market Research', 'Data Analysis'],
  },
  {
    employeeId: '8', // Lisa Wang - Senior Designer
    jobId: '4',
    score: 45,
    matchedSkills: 1,
    missingSkills: ['Product Strategy', 'Agile Methodology', 'Market Research', 'Data Analysis'],
  },
  {
    employeeId: '6', // Jennifer Liu - Marketing Manager
    jobId: '4',
    score: 40,
    matchedSkills: 1,
    missingSkills: ['Product Strategy', 'Agile Methodology', 'Leadership', 'Data Analysis'],
  },

  // Junior Marketing Specialist (Job 5)
  {
    employeeId: '6', // Jennifer Liu - Marketing Manager
    jobId: '5',
    score: 95,
    matchedSkills: 4,
    missingSkills: [],
  },
  {
    employeeId: '5', // David Kim - HR Specialist
    jobId: '5',
    score: 60,
    matchedSkills: 1,
    missingSkills: ['Digital Marketing', 'Content Strategy', 'Analytics'],
  },
  {
    employeeId: '3', // Michael Johnson - Product Manager
    jobId: '5',
    score: 55,
    matchedSkills: 2,
    missingSkills: ['Digital Marketing', 'Content Strategy'],
  },
  {
    employeeId: '2', // Sarah Chen - UX Designer
    jobId: '5',
    score: 45,
    matchedSkills: 1,
    missingSkills: ['Digital Marketing', 'Content Strategy', 'Analytics'],
  },
  {
    employeeId: '10', // Maria Garcia - HR Director
    jobId: '5',
    score: 40,
    matchedSkills: 1,
    missingSkills: ['Digital Marketing', 'Content Strategy', 'Analytics'],
  },
];