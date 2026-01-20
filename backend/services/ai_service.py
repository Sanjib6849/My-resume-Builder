from openai import OpenAI
import os
import json
import logging

logger = logging.getLogger(__name__)

# Initialize OpenAI client lazily
_client = None

def get_openai_client():
    global _client
    if _client is None:
        api_key = os.environ.get('OPENAI_API_KEY')
        if not api_key:
            raise Exception("OPENAI_API_KEY environment variable is not set")
        _client = OpenAI(api_key=api_key)
    return _client

class AIService:
    @staticmethod
    async def get_content_suggestions(suggestion_type: str, context: str = ""):
        """
        Generate AI-powered content suggestions for resumes
        
        Args:
            suggestion_type: 'experience', 'skills', or 'summary'
            context: Additional context for the suggestions
        
        Returns:
            List of suggestion strings
        """
        try:
            prompts = {
                'experience': f"""Generate 3 professional achievement-focused bullet points for a resume experience section.
                Context: {context}
                
                Requirements:
                - Start with strong action verbs
                - Include quantifiable metrics where possible
                - Focus on impact and results
                - Keep each bullet point concise (1-2 lines)
                
                Return only the 3 bullet points, one per line, without numbering.""",
                
                'skills': f"""Generate 8-10 relevant professional skills based on the following context.
                Context: {context}
                
                Requirements:
                - Mix of technical and soft skills
                - Industry-relevant
                - Modern and in-demand skills
                
                Return only the skill names, comma-separated.""",
                
                'summary': f"""Generate 3 different professional summary options for a resume.
                Context: {context}
                
                Requirements:
                - 2-3 sentences each
                - Highlight key strengths and experience
                - Professional tone
                - Action-oriented language
                
                Return only the 3 summaries, separated by '---'."""
            }
            
            prompt = prompts.get(suggestion_type, prompts['experience'])
            
            client = get_openai_client()
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert resume writer and career coach."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.7,
                max_tokens=500
            )
            
            content = response.choices[0].message.content.strip()
            
            # Parse the response based on type
            if suggestion_type == 'skills':
                suggestions = [skill.strip() for skill in content.split(',')]
            elif suggestion_type == 'summary':
                suggestions = [s.strip() for s in content.split('---')]
            else:
                suggestions = [line.strip() for line in content.split('\n') if line.strip()]
            
            return suggestions
            
        except Exception as e:
            logger.error(f"Error generating AI suggestions: {str(e)}")
            raise Exception(f"Failed to generate suggestions: {str(e)}")
    
    @staticmethod
    async def analyze_ats_compatibility(resume_data: dict, job_description: str):
        """
        Analyze resume for ATS compatibility against a job description
        
        Args:
            resume_data: Dictionary containing resume information
            job_description: The job posting text
        
        Returns:
            Dictionary with ATS analysis results
        """
        try:
            # Extract resume text
            resume_text = AIService._extract_resume_text(resume_data)
            
            # Create analysis prompt
            prompt = f"""You are an ATS (Applicant Tracking System) expert. Analyze the following resume against the job description and provide detailed feedback.

JOB DESCRIPTION:
{job_description}

RESUME:
{resume_text}

Provide your analysis in the following JSON format:
{{
    "score": <number between 0-100>,
    "scoreDescription": "<brief description of the score>",
    "missingKeywords": ["keyword1", "keyword2", ...],
    "matchingKeywords": ["keyword1", "keyword2", ...],
    "recommendations": ["recommendation1", "recommendation2", ...],
    "formattingIssues": ["issue1", "issue2", ...]
}}

Guidelines:
- Score should reflect keyword match, formatting, and relevance
- Identify 5-8 missing keywords from the job description
- Identify 5-8 matching keywords found in the resume
- Provide 5-7 actionable recommendations
- List 2-4 formatting issues if any (or empty array if none)
- Be specific and helpful

Return ONLY the JSON object, no additional text."""
            
            client = get_openai_client()
            response = client.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an ATS optimization expert who helps job seekers improve their resumes."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.3,
                max_tokens=1500
            )
            
            content = response.choices[0].message.content.strip()
            
            # Try to extract JSON from the response
            try:
                # Remove markdown code blocks if present
                if content.startswith('```'):
                    content = content.split('```')[1]
                    if content.startswith('json'):
                        content = content[4:]
                content = content.strip()
                
                result = json.loads(content)
                
                # Validate the structure
                required_keys = ['score', 'scoreDescription', 'missingKeywords', 'matchingKeywords', 'recommendations', 'formattingIssues']
                if not all(key in result for key in required_keys):
                    raise ValueError("Invalid response structure")
                
                return result
                
            except (json.JSONDecodeError, ValueError) as e:
                logger.error(f"Failed to parse AI response: {content}")
                # Return a fallback response
                return {
                    "score": 70,
                    "scoreDescription": "Good match with room for improvement",
                    "missingKeywords": ["Unable to extract keywords"],
                    "matchingKeywords": ["Analysis in progress"],
                    "recommendations": ["Add more specific keywords from the job description"],
                    "formattingIssues": []
                }
            
        except Exception as e:
            logger.error(f"Error analyzing ATS compatibility: {str(e)}")
            raise Exception(f"Failed to analyze ATS compatibility: {str(e)}")
    
    @staticmethod
    def _extract_resume_text(resume_data: dict) -> str:
        """
        Extract readable text from resume data structure
        """
        text_parts = []
        
        # Personal Info
        personal = resume_data.get('personalInfo', {})
        if personal:
            text_parts.append(f"Name: {personal.get('fullName', '')}")
            text_parts.append(f"Email: {personal.get('email', '')}")
            text_parts.append(f"Phone: {personal.get('phone', '')}")
            text_parts.append(f"Location: {personal.get('location', '')}")
            if personal.get('summary'):
                text_parts.append(f"\nSummary: {personal.get('summary')}")
        
        # Experience
        experiences = resume_data.get('experience', [])
        if experiences:
            text_parts.append("\nWORK EXPERIENCE:")
            for exp in experiences:
                text_parts.append(f"{exp.get('position', '')} at {exp.get('company', '')}")
                text_parts.append(f"{exp.get('startDate', '')} - {exp.get('endDate', 'Present')}")
                text_parts.append(exp.get('description', ''))
        
        # Education
        education = resume_data.get('education', [])
        if education:
            text_parts.append("\nEDUCATION:")
            for edu in education:
                text_parts.append(f"{edu.get('degree', '')} in {edu.get('field', '')}")
                text_parts.append(f"{edu.get('school', '')}")
        
        # Skills
        skills = resume_data.get('skills', {})
        if skills:
            text_parts.append("\nSKILLS:")
            if skills.get('technical'):
                text_parts.append(f"Technical: {', '.join(skills['technical'])}")
            if skills.get('soft'):
                text_parts.append(f"Soft Skills: {', '.join(skills['soft'])}")
        
        # Projects
        projects = resume_data.get('projects', [])
        if projects:
            text_parts.append("\nPROJECTS:")
            for proj in projects:
                text_parts.append(f"{proj.get('name', '')}: {proj.get('description', '')}")
        
        # Certifications
        certifications = resume_data.get('certifications', [])
        if certifications:
            text_parts.append("\nCERTIFICATIONS:")
            for cert in certifications:
                text_parts.append(f"{cert.get('name', '')} - {cert.get('issuer', '')}")
        
        return '\n'.join(text_parts)