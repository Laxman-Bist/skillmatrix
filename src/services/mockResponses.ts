import { Employee, Job, LearningPath } from '../types';

// Mock responses for learning path generation
export const mockLearningPathResponses: Record<string, any> = {
  // Alex Morgan (Senior Developer) -> Full Stack Developer
  '1-1': {
    targetSkills: ['MongoDB', 'TypeScript', 'Docker'],
    estimatedTime: '6 weeks',
    priority: 'Medium',
    resources: [
      {
        title: 'MongoDB for JavaScript Developers',
        provider: 'MongoDB University',
        skillsAddressed: ['MongoDB'],
        level: 'Intermediate',
        duration: '12 hours',
        type: 'Course',
        url: 'https://university.mongodb.com/courses/M220JS/about'
      },
      {
        title: 'TypeScript: The Complete Developer\'s Guide',
        provider: 'Udemy',
        skillsAddressed: ['TypeScript'],
        level: 'Intermediate',
        duration: '20 hours',
        type: 'Course',
        url: 'https://www.udemy.com/course/typescript-the-complete-developers-guide/'
      },
      {
        title: 'Docker Mastery: with Kubernetes +Swarm',
        provider: 'Udemy',
        skillsAddressed: ['Docker'],
        level: 'Beginner',
        duration: '19 hours',
        type: 'Course',
        url: 'https://www.udemy.com/course/docker-mastery/'
      }
    ]
  },
  
  // Sarah Chen (UX Designer) -> UX/UI Designer
  '2-2': {
    targetSkills: ['Prototyping', 'Accessibility', 'Design Systems'],
    estimatedTime: '4 weeks',
    priority: 'High',
    resources: [
      {
        title: 'Advanced Prototyping in Figma',
        provider: 'Skillshare',
        skillsAddressed: ['Prototyping', 'Figma'],
        level: 'Intermediate',
        duration: '6 hours',
        type: 'Course',
        url: 'https://www.skillshare.com/classes/Advanced-Prototyping-in-Figma'
      },
      {
        title: 'Web Accessibility Fundamentals',
        provider: 'Pluralsight',
        skillsAddressed: ['Accessibility'],
        level: 'Beginner',
        duration: '5 hours',
        type: 'Course',
        url: 'https://www.pluralsight.com/courses/web-accessibility-fundamentals'
      },
      {
        title: 'Design Systems with Figma',
        provider: 'Design+Code',
        skillsAddressed: ['Design Systems', 'Figma'],
        level: 'Advanced',
        duration: '8 hours',
        type: 'Course',
        url: 'https://designcode.io/design-system-figma'
      }
    ]
  },

  // Emily Rodriguez (Data Scientist) -> Data Analyst
  '4-3': {
    targetSkills: ['Excel', 'Business Intelligence', 'Tableau'],
    estimatedTime: '3 weeks',
    priority: 'Low',
    resources: [
      {
        title: 'Excel for Data Analysis',
        provider: 'Microsoft Learn',
        skillsAddressed: ['Excel'],
        level: 'Intermediate',
        duration: '10 hours',
        type: 'Course',
        url: 'https://docs.microsoft.com/en-us/learn/paths/excel-data-analysis/'
      },
      {
        title: 'Business Intelligence Fundamentals',
        provider: 'Coursera',
        skillsAddressed: ['Business Intelligence'],
        level: 'Beginner',
        duration: '15 hours',
        type: 'Course',
        url: 'https://www.coursera.org/learn/business-intelligence-fundamentals'
      }
    ]
  },

  // Default fallback for any other combinations
  'default': {
    targetSkills: ['Communication', 'Problem Solving', 'Adaptability'],
    estimatedTime: '4 weeks',
    priority: 'Medium',
    resources: [
      {
        title: 'Effective Communication in the Workplace',
        provider: 'LinkedIn Learning',
        skillsAddressed: ['Communication'],
        level: 'Beginner',
        duration: '3 hours',
        type: 'Course',
        url: 'https://www.linkedin.com/learning/effective-communication-in-the-workplace'
      },
      {
        title: 'Critical Thinking and Problem Solving',
        provider: 'Coursera',
        skillsAddressed: ['Problem Solving'],
        level: 'Intermediate',
        duration: '8 hours',
        type: 'Course',
        url: 'https://www.coursera.org/learn/critical-thinking-problem-solving'
      }
    ]
  }
};

// Mock responses for department recommendations
export const mockDepartmentRecommendations: Record<string, any> = {
  'Engineering': {
    criticalGaps: ['AWS Cloud Services', 'Kubernetes', 'Microservices Architecture'],
    emergingSkills: ['AI/ML Integration', 'Edge Computing', 'Serverless Architecture'],
    redundancies: ['Legacy Framework Knowledge', 'Outdated Testing Tools'],
    recommendations: [
      'Implement cloud-first training program focusing on AWS and containerization',
      'Establish AI/ML competency center to prepare for future projects',
      'Create cross-training opportunities to reduce single points of failure',
      'Invest in modern DevOps toolchain training',
      'Develop internal mentorship program for senior-junior knowledge transfer'
    ]
  },
  
  'Design': {
    criticalGaps: ['Accessibility Standards', 'Design Systems', 'User Research Methods'],
    emergingSkills: ['Voice UI Design', 'AR/VR Interface Design', 'Design Ops'],
    redundancies: ['Print Design Skills', 'Legacy Design Tools'],
    recommendations: [
      'Mandatory accessibility training for all design team members',
      'Establish design system governance and maintenance protocols',
      'Invest in user research tools and methodologies training',
      'Create design-engineering collaboration workshops',
      'Develop expertise in emerging interface paradigms'
    ]
  },
  
  'Analytics': {
    criticalGaps: ['Machine Learning Operations', 'Real-time Analytics', 'Data Governance'],
    emergingSkills: ['Automated ML', 'Graph Analytics', 'Privacy-Preserving Analytics'],
    redundancies: ['Manual Reporting Processes', 'Legacy BI Tools'],
    recommendations: [
      'Implement MLOps practices and toolchain training',
      'Establish real-time data processing capabilities',
      'Create data governance framework and training program',
      'Invest in automated analytics and self-service BI tools',
      'Develop privacy-first analytics methodologies'
    ]
  },
  
  'Product': {
    criticalGaps: ['Data-Driven Decision Making', 'Technical Product Management', 'Growth Hacking'],
    emergingSkills: ['AI Product Strategy', 'Platform Thinking', 'Ecosystem Design'],
    redundancies: ['Traditional Waterfall Methods', 'Feature-Driven Development'],
    recommendations: [
      'Implement analytics-first product development approach',
      'Cross-train product managers in technical fundamentals',
      'Establish growth experimentation framework',
      'Develop AI-first product strategy capabilities',
      'Create platform and ecosystem thinking workshops'
    ]
  },
  
  'Marketing': {
    criticalGaps: ['Marketing Automation', 'Data Analytics', 'Content Strategy'],
    emergingSkills: ['AI-Powered Personalization', 'Community Building', 'Influencer Relations'],
    redundancies: ['Traditional Advertising Methods', 'Manual Campaign Management'],
    recommendations: [
      'Implement marketing automation platform and training',
      'Develop data analytics capabilities for campaign optimization',
      'Create content strategy framework and guidelines',
      'Invest in AI-powered personalization tools',
      'Build community engagement and influencer relationship programs'
    ]
  },
  
  'Human Resources': {
    criticalGaps: ['People Analytics', 'Digital HR Tools', 'Change Management'],
    emergingSkills: ['AI in Recruitment', 'Employee Experience Design', 'Remote Work Management'],
    redundancies: ['Paper-Based Processes', 'Manual Performance Reviews'],
    recommendations: [
      'Implement people analytics platform and training',
      'Digitize HR processes and train team on new tools',
      'Develop change management expertise and frameworks',
      'Explore AI-powered recruitment and assessment tools',
      'Create employee experience design capabilities'
    ]
  }
};

// Mock responses for job matching (batch processing)
export const mockJobMatchResponses: Record<string, any[]> = {
  // Full Stack Developer matches
  '1': [
    { employeeId: '1', score: 95, matchedSkills: 4, missingSkills: ['MongoDB', 'TypeScript'] },
    { employeeId: '7', score: 72, matchedSkills: 2, missingSkills: ['React', 'Node.js', 'MongoDB', 'TypeScript'] },
    { employeeId: '3', score: 45, matchedSkills: 1, missingSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB'] },
    { employeeId: '4', score: 35, matchedSkills: 1, missingSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB'] },
    { employeeId: '9', score: 25, matchedSkills: 0, missingSkills: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'TypeScript'] }
  ],
  
  // UX/UI Designer matches
  '2': [
    { employeeId: '2', score: 90, matchedSkills: 3, missingSkills: ['Prototyping', 'Accessibility'] },
    { employeeId: '8', score: 88, matchedSkills: 3, missingSkills: ['User Research', 'Accessibility'] },
    { employeeId: '1', score: 45, matchedSkills: 1, missingSkills: ['UI Design', 'User Research', 'Figma', 'Prototyping'] },
    { employeeId: '6', score: 30, matchedSkills: 0, missingSkills: ['UI Design', 'User Research', 'Figma', 'Prototyping', 'Accessibility'] },
    { employeeId: '3', score: 25, matchedSkills: 0, missingSkills: ['UI Design', 'User Research', 'Figma', 'Prototyping', 'Accessibility'] }
  ],
  
  // Data Analyst matches
  '3': [
    { employeeId: '4', score: 92, matchedSkills: 4, missingSkills: ['Excel'] },
    { employeeId: '9', score: 85, matchedSkills: 4, missingSkills: ['Python'] },
    { employeeId: '3', score: 65, matchedSkills: 2, missingSkills: ['SQL', 'Python', 'Excel'] },
    { employeeId: '6', score: 55, matchedSkills: 1, missingSkills: ['Data Analysis', 'SQL', 'Python', 'Data Visualization'] },
    { employeeId: '1', score: 40, matchedSkills: 1, missingSkills: ['Data Analysis', 'SQL', 'Python', 'Data Visualization'] }
  ],
  
  // Senior Product Manager matches
  '4': [
    { employeeId: '3', score: 95, matchedSkills: 5, missingSkills: [] },
    { employeeId: '10', score: 78, matchedSkills: 2, missingSkills: ['Product Strategy', 'Agile Methodology', 'Market Research'] },
    { employeeId: '1', score: 65, matchedSkills: 2, missingSkills: ['Product Strategy', 'Market Research', 'Data Analysis'] },
    { employeeId: '8', score: 45, matchedSkills: 1, missingSkills: ['Product Strategy', 'Agile Methodology', 'Market Research', 'Data Analysis'] },
    { employeeId: '6', score: 40, matchedSkills: 1, missingSkills: ['Product Strategy', 'Agile Methodology', 'Leadership', 'Data Analysis'] }
  ],
  
  // Junior Marketing Specialist matches
  '5': [
    { employeeId: '6', score: 95, matchedSkills: 4, missingSkills: [] },
    { employeeId: '5', score: 60, matchedSkills: 1, missingSkills: ['Digital Marketing', 'Content Strategy', 'Analytics'] },
    { employeeId: '3', score: 55, matchedSkills: 2, missingSkills: ['Digital Marketing', 'Content Strategy'] },
    { employeeId: '2', score: 45, matchedSkills: 1, missingSkills: ['Digital Marketing', 'Content Strategy', 'Analytics'] },
    { employeeId: '10', score: 40, matchedSkills: 1, missingSkills: ['Digital Marketing', 'Content Strategy', 'Analytics'] }
  ]
};

// Helper function to get mock learning path response
export const getMockLearningPath = (employeeId: string, jobId: string): any => {
  const key = `${employeeId}-${jobId}`;
  return mockLearningPathResponses[key] || mockLearningPathResponses['default'];
};

// Helper function to get mock department recommendations
export const getMockDepartmentRecommendations = (departmentName: string): any => {
  return mockDepartmentRecommendations[departmentName] || mockDepartmentRecommendations['Engineering'];
};

// Helper function to get mock job match responses
export const getMockJobMatches = (jobId: string): any[] => {
  return mockJobMatchResponses[jobId] || mockJobMatchResponses['1'];
};