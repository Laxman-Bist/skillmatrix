import axios from 'axios';
import { Employee, Job, LearningPath } from '../types';

const API_KEY = `AIzaSyA55vkI6vrrN3yHgZ4ckYlj9MRHKSrEhKs`;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

const LEARNING_PATH_CONTEXT = `
You are an AI career development advisor. Analyze the employee's current skills and the target job requirements to create a personalized learning path.

Consider:
1. Current skill levels vs required levels
2. Critical skills missing for the target role
3. Industry best practices and trends
4. Realistic timeline for skill acquisition
5. Mix of theoretical and practical learning

Format the response as a JSON object with:
- targetSkills: array of skills to develop
- estimatedTime: total time needed
- priority: "High", "Medium", or "Low" based on skill gap
- resources: array of recommended learning materials
  - title
  - provider
  - skillsAddressed
  - level
  - duration
  - type
`;

export const generateLearningPath = async (
  employee: Employee,
  targetJob: Job
): Promise<LearningPath | null> => {
  const prompt = JSON.stringify({
    employee: {
      currentSkills: employee.skills,
      position: employee.position,
      department: employee.department
    },
    targetJob: {
      title: targetJob.title,
      requiredSkills: targetJob.requiredSkills,
      department: targetJob.department
    }
  });

  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{
        parts: [
          { text: LEARNING_PATH_CONTEXT },
          { text: prompt }
        ]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    const suggestion = JSON.parse(response.data.candidates[0].content.parts[0].text);

    return {
      id: crypto.randomUUID(),
      employeeId: employee.id,
      targetSkills: suggestion.targetSkills,
      resources: suggestion.resources.map((resource: any) => ({
        id: crypto.randomUUID(),
        ...resource
      })),
      estimatedCompletionTime: suggestion.estimatedTime,
      priority: suggestion.priority
    };
  } catch (error) {
    console.error('Error generating learning path:', error);
    return null;
  }
};

const SKILL_RECOMMENDATION_CONTEXT = `
As an AI career advisor, analyze the department's current skill distribution and industry trends to recommend:
1. Critical skill gaps to address
2. Emerging skills to develop
3. Areas of potential skill redundancy
4. Training priorities

Format response as JSON with:
- criticalGaps: array of skill gaps to address immediately
- emergingSkills: array of future-relevant skills
- redundancies: array of over-represented skills
- recommendations: array of specific action items
`;

export const generateDepartmentRecommendations = async (
  departmentName: string,
  currentSkills: Array<{ name: string; level: number }>,
  requiredSkills: Array<{ name: string; level: number }>
) => {
  const prompt = JSON.stringify({
    department: departmentName,
    currentSkills,
    requiredSkills
  });

  try {
    const response = await axios.post(GEMINI_API_URL, {
      contents: [{
        parts: [
          { text: SKILL_RECOMMENDATION_CONTEXT },
          { text: prompt }
        ]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    return JSON.parse(response.data.candidates[0].content.parts[0].text);
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return null;
  }
};