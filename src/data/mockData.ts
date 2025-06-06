import { Employee, Job, LearningResource, SkillCluster, MatchScore, LearningPath } from '../types';

// Mock Employees
export const employees: Employee[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    position: 'Senior Developer',
    department: 'Engineering',
    email: 'alex.morgan@jmpc.com',
    profileImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=300',
    skills: [
      { id: '1', name: 'JavaScript', category: 'Technical', level: 5 },
      { id: '2', name: 'React', category: 'Technical', level: 4 },
      { id: '3', name: 'Node.js', category: 'Technical', level: 4 },
      { id: '4', name: 'Team Leadership', category: 'Leadership', level: 3 },
      { id: '5', name: 'Project Management', category: 'Process', level: 3 },
    ],
    joinDate: '2020-03-15',
    projects: ['Web Portal', 'Mobile App'],
  },
  {
    id: '2',
    name: 'Sarah Chen',
    position: 'UX Designer',
    department: 'Design',
    email: 'sarah.chen@jmpc.com',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
    skills: [
      { id: '6', name: 'UI Design', category: 'Technical', level: 5 },
      { id: '7', name: 'User Research', category: 'Technical', level: 4 },
      { id: '8', name: 'Figma', category: 'Technical', level: 5 },
      { id: '9', name: 'Communication', category: 'Soft', level: 4 },
      { id: '10', name: 'HTML/CSS', category: 'Technical', level: 3 },
    ],
    joinDate: '2021-06-10',
    projects: ['Brand Redesign', 'Mobile App'],
  },
  {
    id: '3',
    name: 'Michael Johnson',
    position: 'Product Manager',
    department: 'Product',
    email: 'michael.johnson@jmpc.com',
    profileImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    skills: [
      { id: '11', name: 'Product Strategy', category: 'Domain', level: 4 },
      { id: '12', name: 'Agile Methodology', category: 'Process', level: 5 },
      { id: '13', name: 'Market Research', category: 'Domain', level: 4 },
      { id: '14', name: 'Leadership', category: 'Leadership', level: 4 },
      { id: '15', name: 'Data Analysis', category: 'Technical', level: 3 },
    ],
    joinDate: '2019-02-22',
    projects: ['Market Expansion', 'Product Roadmap'],
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    position: 'Data Scientist',
    department: 'Analytics',
    email: 'emily.rodriguez@jmpc.com',
    profileImage: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=300',
    skills: [
      { id: '16', name: 'Python', category: 'Technical', level: 5 },
      { id: '17', name: 'Machine Learning', category: 'Technical', level: 4 },
      { id: '18', name: 'SQL', category: 'Technical', level: 5 },
      { id: '19', name: 'Data Visualization', category: 'Technical', level: 4 },
      { id: '20', name: 'Statistics', category: 'Technical', level: 5 },
    ],
    joinDate: '2022-01-05',
    projects: ['Customer Analytics', 'Predictive Modeling'],
  },
  {
    id: '5',
    name: 'David Kim',
    position: 'HR Specialist',
    department: 'Human Resources',
    email: 'david.kim@jmpc.com',
    profileImage: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=300',
    skills: [
      { id: '21', name: 'Recruiting', category: 'Domain', level: 4 },
      { id: '22', name: 'Employee Relations', category: 'Soft', level: 5 },
      { id: '23', name: 'HR Policies', category: 'Domain', level: 4 },
      { id: '24', name: 'Conflict Resolution', category: 'Soft', level: 4 },
      { id: '25', name: 'HRIS Systems', category: 'Technical', level: 3 },
    ],
    joinDate: '2020-09-18',
    projects: ['Employee Handbook', 'Onboarding Process'],
  },
];

// Mock Jobs
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

// Mock Learning Resources
export const learningResources: LearningResource[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    provider: 'Frontend Masters',
    skillsAddressed: ['React'],
    level: 'Advanced',
    duration: '8 hours',
    url: 'https://example.com/advanced-react',
    type: 'Course',
  },
  {
    id: '2',
    title: 'Introduction to Machine Learning with Python',
    provider: 'Coursera',
    skillsAddressed: ['Python', 'Machine Learning'],
    level: 'Intermediate',
    duration: '30 hours',
    url: 'https://example.com/intro-ml',
    type: 'Course',
  },
  {
    id: '3',
    title: 'Leadership Skills for New Managers',
    provider: 'LinkedIn Learning',
    skillsAddressed: ['Leadership', 'Team Leadership'],
    level: 'Beginner',
    duration: '4 hours',
    url: 'https://example.com/leadership-skills',
    type: 'Course',
  },
  {
    id: '4',
    title: 'SQL Masterclass',
    provider: 'Udemy',
    skillsAddressed: ['SQL', 'Data Analysis'],
    level: 'Intermediate',
    duration: '15 hours',
    url: 'https://example.com/sql-masterclass',
    type: 'Course',
  },
  {
    id: '5',
    title: 'User Research Fundamentals',
    provider: 'Interaction Design Foundation',
    skillsAddressed: ['User Research'],
    level: 'Beginner',
    duration: '10 hours',
    url: 'https://example.com/user-research',
    type: 'Course',
  },
];

// Mock Skill Clusters
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

// Mock Match Scores
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

// Mock Learning Paths
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

// Mock skill gap data
export const skillGapData = {
  departments: {
    'Engineering': {
      currentSkills: [
        { name: 'JavaScript', level: 4.2 },
        { name: 'React', level: 3.8 },
        { name: 'Node.js', level: 3.5 },
        { name: 'Python', level: 2.1 },
        { name: 'AWS', level: 2.3 },
      ],
      requiredSkills: [
        { name: 'JavaScript', level: 4.0 },
        { name: 'React', level: 4.0 },
        { name: 'Node.js', level: 4.0 },
        { name: 'Python', level: 3.0 },
        { name: 'AWS', level: 4.0 },
      ]
    },
    'Design': {
      currentSkills: [
        { name: 'UI Design', level: 4.5 },
        { name: 'Figma', level: 4.2 },
        { name: 'User Research', level: 3.2 },
        { name: 'Prototyping', level: 3.0 },
        { name: 'Accessibility', level: 2.0 },
      ],
      requiredSkills: [
        { name: 'UI Design', level: 4.0 },
        { name: 'Figma', level: 4.0 },
        { name: 'User Research', level: 4.0 },
        { name: 'Prototyping', level: 3.5 },
        { name: 'Accessibility', level: 3.0 },
      ]
    },
    'Analytics': {
      currentSkills: [
        { name: 'SQL', level: 4.4 },
        { name: 'Data Analysis', level: 4.0 },
        { name: 'Python', level: 3.6 },
        { name: 'Machine Learning', level: 2.8 },
        { name: 'Data Visualization', level: 3.5 },
      ],
      requiredSkills: [
        { name: 'SQL', level: 4.0 },
        { name: 'Data Analysis', level: 4.0 },
        { name: 'Python', level: 4.0 },
        { name: 'Machine Learning', level: 4.0 },
        { name: 'Data Visualization', level: 4.0 },
      ]
    }
  }
};

// Mock dashboard data
export const dashboardData = {
  employeeCount: 143,
  departmentBreakdown: [
    { department: 'Engineering', count: 62 },
    { department: 'Design', count: 23 },
    { department: 'Product', count: 18 },
    { department: 'Analytics', count: 15 },
    { department: 'Human Resources', count: 10 },
    { department: 'Marketing', count: 15 }
  ],
  skillDistribution: [
    { category: 'Technical', count: 86 },
    { category: 'Soft', count: 42 },
    { category: 'Leadership', count: 25 },
    { category: 'Domain', count: 36 },
    { category: 'Process', count: 31 }
  ],
  topSkillGaps: [
    { skill: 'Machine Learning', gap: 1.2, department: 'Analytics' },
    { skill: 'AWS', gap: 1.7, department: 'Engineering' },
    { skill: 'Accessibility', gap: 1.0, department: 'Design' },
    { skill: 'Data Visualization', gap: 0.5, department: 'Analytics' },
    { skill: 'Prototyping', gap: 0.5, department: 'Design' }
  ],
  recentActivities: [
    { id: '1', type: 'skill_assessment', employee: 'Sarah Chen', skill: 'User Research', level: 4, date: '2024-04-01' },
    { id: '2', type: 'learning_completion', employee: 'Alex Morgan', course: 'TypeScript: The Complete Developer\'s Guide', date: '2024-03-28' },
    { id: '3', type: 'job_match', employee: 'Emily Rodriguez', job: 'Data Analyst', score: 85, date: '2024-03-25' },
    { id: '4', type: 'new_employee', employee: 'Robert Wilson', position: 'Marketing Specialist', date: '2024-03-20' },
    { id: '5', type: 'skill_gap_identified', department: 'Engineering', skill: 'AWS', gap: 1.7, date: '2024-03-15' }
  ]
};