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