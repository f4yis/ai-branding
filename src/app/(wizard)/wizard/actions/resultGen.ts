import type { DataState } from '@/store/dataStore'
import { chatModel, jsonModel, pdfToText } from '@/ai/openai'
import { marked } from 'marked'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import { z } from 'zod'
import zodToJsonSchema from 'zod-to-json-schema'
import { jsonrepair } from 'jsonrepair'
import { generatePdf } from './pdf'
import redisClient from '@/utils/redisClient'

export const generateStudentResult = async (state: DataState) => {
	const systemContent = `
        Canidate is a student with the following profile as QA:
        -----
        Q: What is your name
        A: ${state.student.name}
        -----
        Q: What is your current level of study?
        A: ${state.student.study}
        -----
        Q: What field or major are you studying?
        A: ${state.student.field}
        -----
        Q: What are your primary career goals after graduation?
        A: ${state.student.goal}
        -----
        Q: Which industry do you aspire to work in, and do you have specific roles in mind?
        A: ${state.student.industry}
        -----
        Q: What are your top three skills or strengths you feel will help in your future career?
        A: ${state.student.skills.join(', ')}
        -----

        Goal and preferences of the candidate as QA:
        -----
        Q: What is the primary audience you want to reach with your personal brand?
        A: ${state.common.audience}
        -----
        Q: How would you like to be perceived in your industry or desired field?
        A: ${state.common.perception}
        -----
        Q: What type of tone best represents your personal brand?
        A: ${state.common.tone}
        -----
        Q: Would you like to focus on creating specific types of content?
        A: ${state.common.contentLikes}
        -----
        Q: Do you need any additional support with specific skills?
        A: ${state.common.skills}
        -----
        Q: Are you interested in building a LinkedIn profile to connect with potential employers or mentors?
        A: ${state.goalStudent.linkedinInterest}
        -----
        Q: Do you have a clear idea of the roles or skills you would like to emphasize on LinkedIn?
        A: ${state.goalStudent.roleClarity}
        -----
        Q: What types of content would you like to create?
        A: ${state.goalStudent.contentType}
        -----
        Q: Are you interested in exploring career-related trends or skills you can develop before graduation?
        A: ${state.goalStudent.careerTrends}
        -----
        Q: Would you like guidance on internship or entry-level role applications?
        A: ${state.goalStudent.guidanceNeeded}
    `

    const regularSystemContent = `
        ${systemContent}

        You are required to generate anwer the user question based on the above profile and goal. The answer should be in markdown format. and the content is to include in personal branding document and shoud be in that tone and perception. and the content specificaly for Qatar
    `

    const jsonSystemContent = `
        ${systemContent}

        You are required to generate anwer the user question on requested JSON format based on the above profile and goal. The answer should be in json format. and the content is to include in personal branding document and shoud be in that tone and perception. and the content specificaly for Qatar.
    `

	const chat = async (q: string) => {
		const aiMsg = await chatModel.invoke([
			{
				role: 'system',
				content: regularSystemContent,
			},
			{
				role: 'user',
				content: q
			},
		])

		return marked.parse(aiMsg.content.toString())
	}


    const chatJson = async (q: string, schema: z.ZodSchema) => {
        const aiMsg = await jsonModel.invoke([
			{
				role: 'system',
				content: jsonSystemContent,
			},
			{
				role: 'user',
				content: `${q || ''}\nreturn in follwing json format\n${JSON.stringify(zodToJsonSchema(schema))}`,
			},
		])
        return JSON.parse(jsonrepair(aiMsg.content.toString()))
    }
    const loader = new PDFLoader(`files/${state.jobId}.pdf`)
	const docs = await loader.load()

    const [
        executiveSummary,
        profileOverview,
        bradningGoal,
        assessmentAndRecommendations
    ] = await Promise.all([
        chat(
            'write a Executive Summary for the candidate. it should be 200 words. dont include any titles like Executive Summary'
        ),
        pdfToText(docs, "generate Profile Overview of the person. Don't include the title Profile Overview. can be list and small titles as ###"),
        chat(
            'Personal Branding Goals for the candidate. Dont include any titles like Personal Branding Goals. include as much as possible.'
        ),
        pdfToText(docs, "give me an assesment report and recommendations of the profile of the person. include the skills, strengths, weaknesses, opportunities, threats, and career goals. Compare the old profile and the new profile and the report should be in markdown format. dont include any titles like Assesment Report")
    ])

    const [
        contentStrategy,
        skillDevelopmentPlan,
        industryInsights,
        actionPlan
    ] = await Promise.all([
        chat('Content Strategy for the candidate. include the posts or articles that the canidate can post in linkedIn. inlude day by day posts article eveything that improve the persons personal branding. shoudl be in details and include words upto 500 words'),
        chat(
            'write a Skills Development Plan for the candidate. Give every steps in detail.'
        ),
        chat(
            'A detailed Industry Insights for the candidate. include the industry trends, skills, and opportunities.'
        ),
        chat('A detailed Action Plan for the candidate. include the steps to achieve the goals. must be in details and upto 500 words.')
    ])


    const [
        networkingEngagement,
        brandColor,
        brandFont
    ] = await Promise.all([
        chat(
            'A Networking and Engagement Plan for the candidate. include the steps to achieve the goals. must be in details and upto 500 words.'
        ),
        chatJson("create a brand color for the candidate. must match following json schema. dont include the schema return the result", z.object({ 
            primaryColor: z.string().describe("primary color in hex code"),
            secondaryColor: z.string().describe("secondary color in hex code"),
            accentColors: z.array(z.string()).describe("array of accent colors in hex code"),
            reason: z.string().describe("reason for choosing the font"),
        })),
        chatJson("create a brand font the person can use. Must be a google font. must match following json schema. dont include the schema return the result", z.object({
            font: z.string().describe("google font name. just the font name as it fron google font"),
            reason: z.string().describe("reason for choosing the font"),
        }))
    ])

    generatePdf(state.student.name, { 
        executiveSummary, 
        profileOverview, 
        bradningGoal,
        contentStrategy,
        skillDevelopmentPlan,
        industryInsights,
        actionPlan,
        networkingEngagement,
        brandColor,
        brandFont,
        assessmentAndRecommendations
    }, state.jobId)
}

export const generateProfessionalResult = async (state: DataState) => {
    const systemContent = `
        Canidate is a professional with the following profile as QA:
        -----
        Q: What is your name
        A: ${state.professional.name}
        -----
        Q: What is your current job title?
        A: ${state.professional.job}
        -----
        Q: In which industry do you currently work, and do you aim to stay in this field?
        A: ${state.professional.industry}
        -----
        Q: What are your career aspirations in the next 3-5 years?
        A: ${state.professional.goal}
        -----
        Q: What are the top skills or strengths that you bring to your role?
        A: ${state.professional.skills}
        -----
        Q: Are there specific organizations or career levels you are targeting for growth?
        A: ${state.professional.target}
        -----

        Goal and preferences of the candidate as QA:
        -----
        Q: What is the primary audience you want to reach with your personal brand?
        A: ${state.common.audience}
        -----
        Q: How would you like to be perceived in your industry or desired field?
        A: ${state.common.perception}
        -----
        Q: What type of tone best represents your personal brand?
        A: ${state.common.tone}
        -----
        Q: Would you like to focus on creating specific types of content?
        A: ${state.common.contentLikes}
        -----
        Q: Do you need any additional support with specific skills?
        A: ${state.common.skills}
        -----
        Q: Are you interested in optimizing your LinkedIn profile or other professional profiles for better visibility?
        A: ${state.goalProfessional.profileOptimization}
        -----
        Q: Do you have specific achievements or experiences you would like to emphasize?
        A: ${state.goalProfessional.achievements}
        -----
        Q: What type of content aligns best with your branding goals?
        A: ${state.goalProfessional.contentType}
        -----
        Q: Would you like feedback on aligning your profile with industry trends or leadership paths?
        A: ${state.goalProfessional.feedbackNeeded}
        -----
        Q: Do you need support with networking or building connections with industry peers or clients?
        A: ${state.goalProfessional.networkingSupport}
    `

    const regularSystemContent = `
        ${systemContent}

        You are required to generate anwer the user question based on the above profile and goal. The answer should be in markdown format. and the content is to include in personal branding document and shoud be in that tone and perception. and the content specificaly for Qatar
    `

    const jsonSystemContent = `
        ${systemContent}

        You are required to generate anwer the user question on requested JSON format based on the above profile and goal. The answer should be in json format. and the content is to include in personal branding document and shoud be in that tone and perception. and the content specificaly for Qatar.
    `

	const chat = async (q: string) => {
		const aiMsg = await chatModel.invoke([
			{
				role: 'system',
				content: regularSystemContent,
			},
			{
				role: 'user',
				content: q
			},
		])

		return marked.parse(aiMsg.content.toString())
	}


    const chatJson = async (q: string, schema: z.ZodSchema) => {
        const aiMsg = await jsonModel.invoke([
			{
				role: 'system',
				content: jsonSystemContent,
			},
			{
				role: 'user',
				content: `${q || ''}\nreturn in follwing json format\n${JSON.stringify(zodToJsonSchema(schema))}`,
			},
		])
        return JSON.parse(jsonrepair(aiMsg.content.toString()))
    }
    const loader = new PDFLoader(`files/${state.jobId}.pdf`)
	const docs = await loader.load()

    const [
        executiveSummary,
        profileOverview,
        bradningGoal,
        assessmentAndRecommendations
    ] = await Promise.all([
        chat(
            'write a Executive Summary for the candidate. it should be 200 words. dont include any titles like Executive Summary'
        ),
        pdfToText(docs, "generate Profile Overview of the person. Don't include the title Profile Overview. can be list and small titles as ###"),
        chat(
            'Personal Branding Goals for the candidate. Dont include any titles like Personal Branding Goals. include as much as possible.'
        ),
        pdfToText(docs, "give me an assesment report and recommendations of the profile of the person. include the skills, strengths, weaknesses, opportunities, threats, and career goals. Compare the old profile and the new profile and the report should be in markdown format. dont include any titles like Assesment Report")
    ])

    const [
        contentStrategy,
        skillDevelopmentPlan,
        industryInsights,
        actionPlan
    ] = await Promise.all([
        chat('Content Strategy for the candidate. include the posts or articles that the canidate can post in linkedIn. inlude day by day posts article eveything that improve the persons personal branding. shoudl be in details and include words upto 500 words'),
        chat(
            'write a Skills Development Plan for the candidate. Give every steps in detail.'
        ),
        chat(
            'A detailed Industry Insights for the candidate. include the industry trends, skills, and opportunities.'
        ),
        chat('A detailed Action Plan for the candidate. include the steps to achieve the goals. must be in details and upto 500 words.')
    ])


    const [
        networkingEngagement,
        brandColor,
        brandFont
    ] = await Promise.all([
        chat(
            'A Networking and Engagement Plan for the candidate. include the steps to achieve the goals. must be in details and upto 500 words.'
        ),
        chatJson("create a brand color for the candidate. must match following json schema. dont include the schema return the result", z.object({ 
            primaryColor: z.string().describe("primary color in hex code"),
            secondaryColor: z.string().describe("secondary color in hex code"),
            accentColors: z.array(z.string()).describe("array of accent colors in hex code"),
            reason: z.string().describe("reason for choosing the font"),
        })),
        chatJson("create a brand font the person can use. Must be a google font. must match following json schema. dont include the schema return the result", z.object({
            font: z.string().describe("google font name. just the font name as it fron google font"),
            reason: z.string().describe("reason for choosing the font"),
        }))
    ])

    generatePdf(state.student.name, { 
        executiveSummary, 
        profileOverview, 
        bradningGoal,
        contentStrategy,
        skillDevelopmentPlan,
        industryInsights,
        actionPlan,
        networkingEngagement,
        brandColor,
        brandFont,
        assessmentAndRecommendations
    }, state.jobId)

}


