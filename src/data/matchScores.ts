import { MatchScore } from '../types';

export const matchScores: MatchScore[] = [
  {
    employeeId: '1',
    jobId: '1',
    score: 95,
    matchedSkills: 4,
    missingSkills: ['MongoDB'],
  },
  {
    employeeId: '2',
    jobId: '2',
    score: 90,
    matchedSkills: 3,
    missingSkills: ['Prototyping', 'Accessibility'],
  },
  {
    employeeId: '4',
    jobId: '3',
    score: 85,
    matchedSkills: 4,
    missingSkills: ['Excel'],
  },
  {
    employeeId: '3',
    jobId: '1',
    score: 40,
    matchedSkills: 1,
    missingSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
  },
];