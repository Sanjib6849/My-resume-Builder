from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Dict, Any
from ..services.ai_service import AIService
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/ai", tags=["AI"])

class SuggestionRequest(BaseModel):
    type: str = Field(..., description="Type of suggestion: 'experience', 'skills', or 'summary'")
    context: str = Field(default="", description="Additional context for suggestions")

class SuggestionResponse(BaseModel):
    suggestions: List[str]

class ATSAnalysisRequest(BaseModel):
    resumeData: Dict[str, Any] = Field(..., description="Complete resume data object")
    jobDescription: str = Field(..., description="Job description text")

class ATSAnalysisResponse(BaseModel):
    score: int = Field(..., description="ATS compatibility score (0-100)")
    scoreDescription: str
    missingKeywords: List[str]
    matchingKeywords: List[str]
    recommendations: List[str]
    formattingIssues: List[str]

@router.post("/suggestions", response_model=SuggestionResponse)
async def get_ai_suggestions(request: SuggestionRequest):
    """
    Generate AI-powered content suggestions for resume sections
    """
    try:
        logger.info(f"Generating AI suggestions for type: {request.type}")
        
        if request.type not in ['experience', 'skills', 'summary']:
            raise HTTPException(status_code=400, detail="Invalid suggestion type")
        
        suggestions = await AIService.get_content_suggestions(
            suggestion_type=request.type,
            context=request.context
        )
        
        return {"suggestions": suggestions}
        
    except Exception as e:
        logger.error(f"Error in get_ai_suggestions: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/ats/analyze", response_model=ATSAnalysisResponse)
async def analyze_ats_compatibility(request: ATSAnalysisRequest):
    """
    Analyze resume for ATS compatibility against a job description
    """
    try:
        logger.info("Analyzing ATS compatibility")
        
        if not request.jobDescription or not request.jobDescription.strip():
            raise HTTPException(status_code=400, detail="Job description is required")
        
        if not request.resumeData:
            raise HTTPException(status_code=400, detail="Resume data is required")
        
        result = await AIService.analyze_ats_compatibility(
            resume_data=request.resumeData,
            job_description=request.jobDescription
        )
        
        return result
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in analyze_ats_compatibility: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))