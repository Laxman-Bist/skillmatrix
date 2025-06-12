import axios from 'axios';
import { Employee, Job, LearningPath } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

// Retry configuration
const MAX_RETRIES = 3;
const BASE_DELAY = 1000; // 1 second

// Helper function to wait for a specified amount of time
const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Retry wrapper with exponential backoff
const retryWithBackoff = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = MAX_RETRIES
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // If it's not a rate limit error, don't retry
      if (error.response?.status !== 429) {
        throw error;
      }
      
      // If we've exhausted all retries, throw the last error
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const delay = BASE_DELAY * Math.pow(2, attempt);
      console.log(`Rate limit hit, retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries + 1})`);
      
      await wait(delay);
    }
  }
  
  throw lastError;
};

// Helper function to make API calls with retry logic
const makeGeminiRequest = async (requestData: any) => {
  return retryWithBackoff(async () => {
    const response = await axios.post(GEMINI_API_URL, requestData);
    return response.data.candidates[0].content.parts[0].text;
  });
};

export const generateLearningPath = async (
  employee: Employee,
  targetJob: Job
): Promise<LearningPath | null> => {
  if (!API_KEY) {
    console.error('Gemini API key not found in environment variables');
    throw new Error('API key not configured. Please check your environment variables.');
  }

  const prompt = `You are an AI career development advisor. Analyze the employee's current skills and the target job requirements to create a personalized learning path.

Consider:
1. Current skill levels vs required levels
2. Critical skills missing for the target role
3. Industry best practices and trends
4. Realistic timeline for skill acquisition
5. Mix of theoretical and practical learning

Employee Profile:
- Name: ${employee.name}
- Current Position: ${employee.position}
- Department: ${employee.department}
- Job Level: ${employee.jobLevel}
- Current Skills: ${employee.skills.map(s => `${s.name} (Level ${s.level})`).join(', ')}

Target Job:
- Title: ${targetJob.title}
- Department: ${targetJob.department}
- Job Level: ${targetJob.jobLevel}
- Required Skills: ${targetJob.requiredSkills.map(s => `${s.name} (Min Level ${s.minimumLevel}, ${s.importance})`).join(', ')}

Please respond with ONLY a JSON object in this exact format:
{
  "targetSkills": ["skill1", "skill2"],
  "estimatedTime": "X weeks",
  "priority": "High|Medium|Low",
  "resources": [
    {
      "title": "Course Title",
      "provider": "Provider Name",
      "skillsAddressed": ["skill1"],
      "level": "Beginner|Intermediate|Advanced",
      "duration": "X hours",
      "type": "Course|Article|Video|Book|Workshop",
      "url": "https://example.com"
    }
  ]
}`;

  try {
    const requestData = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      }
    };

    const responseText = await makeGeminiRequest(requestData);
    
    // Clean the response text to extract JSON
    let cleanedResponse = responseText.trim();
    
    // Remove any markdown code blocks
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/, '').replace(/\n?```$/, '');
    }
    
    const suggestion = JSON.parse(cleanedResponse);

    return {
      id: crypto.randomUUID(),
      employeeId: employee.id,
      targetSkills: suggestion.targetSkills || [],
      resources: (suggestion.resources || []).map((resource: any) => ({
        id: crypto.randomUUID(),
        title: resource.title || 'Untitled Resource',
        provider: resource.provider || 'Unknown Provider',
        skillsAddressed: resource.skillsAddressed || [],
        level: resource.level || 'Intermediate',
        duration: resource.duration || '1 hour',
        type: resource.type || 'Course',
        url: resource.url || 'https://example.com'
      })),
      estimatedCompletionTime: suggestion.estimatedTime || '2 weeks',
      priority: suggestion.priority || 'Medium'
    };
  } catch (error: any) {
    console.error('Error generating learning path:', error);
    
    if (error.response?.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later or check your API quota.');
    } else if (error.response?.status === 403) {
      throw new Error('Invalid API key. Please check your Gemini API key configuration.');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid request format. Please try again.');
    } else {
      throw new Error('Failed to generate learning path. Please try again.');
    }
  }
};

export const generateDepartmentRecommendations = async (
  departmentName: string,
  currentSkills: Array<{ name: string; level: number }>,
  requiredSkills: Array<{ name: string; level: number }>
) => {
  if (!API_KEY) {
    console.error('Gemini API key not found in environment variables');
    throw new Error('API key not configured. Please check your environment variables.');
  }

  const prompt = `As an AI career advisor, analyze the department's current skill distribution and industry trends.

Department: ${departmentName}
Current Skills: ${currentSkills.map(s => `${s.name} (Level ${s.level})`).join(', ')}
Required Skills: ${requiredSkills.map(s => `${s.name} (Level ${s.level})`).join(', ')}

Please respond with ONLY a JSON object in this exact format:
{
  "criticalGaps": ["skill1", "skill2"],
  "emergingSkills": ["skill3", "skill4"],
  "redundancies": ["skill5"],
  "recommendations": ["action1", "action2"]
}`;

  try {
    const requestData = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    };

    const responseText = await makeGeminiRequest(requestData);
    
    // Clean the response text to extract JSON
    let cleanedResponse = responseText.trim();
    
    // Remove any markdown code blocks
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/, '').replace(/\n?```$/, '');
    }
    
    return JSON.parse(cleanedResponse);
  } catch (error: any) {
    console.error('Error generating recommendations:', error);
    
    if (error.response?.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later or check your API quota.');
    } else if (error.response?.status === 403) {
      throw new Error('Invalid API key. Please check your Gemini API key configuration.');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid request format. Please try again.');
    } else {
      throw new Error('Failed to generate recommendations. Please try again.');
    }
  }
};

export const calculateJobMatchScore = async (
  employee: Employee,
  job: Job
): Promise<{ score: number; matchedSkills: number; missingSkills: string[] } | null> => {
  if (!API_KEY) {
    console.error('Gemini API key not found in environment variables');
    throw new Error('API key not configured. Please check your environment variables.');
  }

  const prompt = `You are an AI recruitment specialist. Analyze how well an employee matches a job position based on their skills and experience.

Employee Profile:
- Name: ${employee.name}
- Current Position: ${employee.position}
- Department: ${employee.department}
- Job Level: ${employee.jobLevel}
- Current Skills: ${employee.skills.map(s => `${s.name} (Level ${s.level}, Category: ${s.category})`).join(', ')}
- Years of Experience: ${new Date().getFullYear() - new Date(employee.joinDate).getFullYear()} years

Job Requirements:
- Title: ${job.title}
- Department: ${job.department}
- Job Level: ${job.jobLevel}
- Required Skills: ${job.requiredSkills.map(s => `${s.name} (Min Level ${s.minimumLevel}, Importance: ${s.importance})`).join(', ')}
- Location: ${job.location}
- Remote: ${job.isRemote}

Scoring Criteria:
1. Skill match percentage (0-100)
2. Consider skill levels vs requirements
3. Weight by importance (required > preferred > nice-to-have)
4. Factor in job level compatibility
5. Consider department experience
6. Account for transferable skills

Please respond with ONLY a JSON object in this exact format:
{
  "score": 85,
  "matchedSkills": 4,
  "missingSkills": ["skill1", "skill2"]
}`;

  try {
    const requestData = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.3,
        topK: 20,
        topP: 0.8,
        maxOutputTokens: 512,
      }
    };

    const responseText = await makeGeminiRequest(requestData);
    
    // Clean the response text to extract JSON
    let cleanedResponse = responseText.trim();
    
    // Remove any markdown code blocks
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/```\n?/, '').replace(/\n?```$/, '');
    }
    
    const result = JSON.parse(cleanedResponse);

    return {
      score: Math.min(Math.max(result.score || 0, 0), 100), // Ensure score is between 0-100
      matchedSkills: result.matchedSkills || 0,
      missingSkills: result.missingSkills || []
    };
  } catch (error: any) {
    console.error('Error calculating job match score:', error);
    
    if (error.response?.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later or check your API quota.');
    } else if (error.response?.status === 403) {
      throw new Error('Invalid API key. Please check your Gemini API key configuration.');
    } else if (error.response?.status === 400) {
      throw new Error('Invalid request format. Please try again.');
    } else {
      throw new Error('Failed to calculate job match score. Please try again.');
    }
  }
};