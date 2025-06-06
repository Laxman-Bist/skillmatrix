export interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  email: string;
  profileImage: string;
  skills: Skill[];
  joinDate: string;
  projects: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 1-5
}

export type SkillCategory = 
  | 'Technical'
  | 'Soft'
  | 'Leadership'
  | 'Domain'
  | 'Process';

export interface Job {
  id: string;
  title: string;
  department: string;
  requiredSkills: JobSkill[];
  description: string;
  postedDate: string;
  location: string;
  isRemote: boolean;
}

export interface JobSkill {
  id: string;
  name: string;
  importance: 'required' | 'preferred' | 'nice-to-have';
  minimumLevel: number; // 1-5
}

export interface LearningResource {
  id: string;
  title: string;
  provider: string;
  skillsAddressed: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  url: string;
  type: 'Course' | 'Article' | 'Video' | 'Book' | 'Workshop';
}

export interface SkillGap {
  skillId: string;
  skillName: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
}

export interface SkillCluster {
  id: string;
  name: string;
  skills: string[];
  employees: string[];
  redundancy: 'Low' | 'Medium' | 'High';
}

export interface MatchScore {
  employeeId: string;
  jobId: string;
  score: number;
  matchedSkills: number;
  missingSkills: string[];
}

export interface LearningPath {
  id: string;
  employeeId: string;
  targetSkills: string[];
  resources: LearningResource[];
  estimatedCompletionTime: string;
  priority: 'Low' | 'Medium' | 'High';
}