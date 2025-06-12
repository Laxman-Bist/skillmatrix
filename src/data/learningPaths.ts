import { LearningPath } from '../types';

export const learningPaths: LearningPath[] = [
  {
    id: '1',
    employeeId: '1',
    targetSkills: ['MongoDB', 'TypeScript'],
    resources: [
      {
        id: '6',
        title: 'MongoDB for JavaScript Developers',
        provider: 'MongoDB University',
        skillsAddressed: ['MongoDB'],
        level: 'Intermediate',
        duration: '12 hours',
        url: 'https://example.com/mongodb-js',
        type: 'Course',
      },
      {
        id: '7',
        title: 'TypeScript: The Complete Developer\'s Guide',
        provider: 'Udemy',
        skillsAddressed: ['TypeScript'],
        level: 'Intermediate',
        duration: '20 hours',
        url: 'https://example.com/typescript',
        type: 'Course',
      },
    ],
    estimatedCompletionTime: '4 weeks',
    priority: 'Medium',
  },
  {
    id: '2',
    employeeId: '2',
    targetSkills: ['Prototyping', 'Accessibility'],
    resources: [
      {
        id: '8',
        title: 'Advanced Prototyping in Figma',
        provider: 'Skillshare',
        skillsAddressed: ['Prototyping', 'Figma'],
        level: 'Intermediate',
        duration: '6 hours',
        url: 'https://example.com/figma-prototyping',
        type: 'Course',
      },
      {
        id: '9',
        title: 'Web Accessibility Fundamentals',
        provider: 'Pluralsight',
        skillsAddressed: ['Accessibility'],
        level: 'Beginner',
        duration: '5 hours',
        url: 'https://example.com/accessibility',
        type: 'Course',
      },
    ],
    estimatedCompletionTime: '2 weeks',
    priority: 'High',
  },
];