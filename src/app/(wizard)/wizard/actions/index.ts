'use server'
import { promises as fs } from 'node:fs'
import { pdfToJson } from '@/ai/openai'
import { nanoid } from 'nanoid'
import { z } from 'zod'
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf'
import redisClient from '@/utils/redisClient'
import type { DataState } from '@/store/dataStore'
import { generateProfessionalResult, generateStudentResult } from './resultGen'

export const uploadFile = async (formData: FormData) => {
	const file = formData.get('file') as File
	const buffer = await file.arrayBuffer()
	const fileSave = Buffer.from(buffer)
	const type = formData.get('type') as string
	const jobId = nanoid()
	await fs.writeFile(`files/${jobId}.pdf`, fileSave)
	processProfile(jobId, type)
	return jobId
	// const docs = await pdfToJson(pdfPath, 'extract the following data from the uploaded LinkedIn profile: ', z.object({}))
}

export const processProfile = async (jobId: string, type: string) => {
	const loader = new PDFLoader(`files/${jobId}.pdf`)
	const docs = await loader.load()
	if (type === 'student') {
		const [a, b, c, d, e, f] = await Promise.all([
			pdfToJson(docs, 'What is the name of person?', z.object({ name: z.string() })),
			pdfToJson(
				docs,
				'What is the current level of study or education?',
				z.object({ study: z.enum(['undergraduate', 'graduate', 'doctoral', 'unknown']) }),
			),
			pdfToJson(docs, 'What field or major are  studying or education?', z.object({ field: z.string() })),
			pdfToJson(
				docs,
				'What is the primary career goals after graduation?',
				z.object({ goal: z.string().describe('maximum of 6 words please') }),
			),
			pdfToJson(
				docs,
				'Which industry do aspire to work in, and do you have specific roles',
				z.object({ industry: z.string() }),
			),
			pdfToJson(
				docs,
				'What is the top three skills or strengths you feel will help in your future career?',
				z.object({
					skills: z.array(
						z.enum([
							'problem_solving',
							'communication',
							'leadership',
							'teamwork',
							'critical_thinking',
							'time_management',
							'research',
							'technical_skills',
							'adaptability',
							'project_management',
						]),
					),
				}),
			),
		])
        const finalData = {
			...a,
			...b,
			...c,
			...d,
			...e,
			...f
		}
        await redisClient.set(`profile-${jobId}`, JSON.stringify(finalData), "EX", 60*30)
	} else {
        const [a, b, c, d, e, f] = await Promise.all([
			pdfToJson(docs, 'What is the name of person?', z.object({ name: z.string() })),
			pdfToJson(
				docs,
				'What is the current job title?',
				z.object({ job: z.string() }),
			),
			pdfToJson(docs, 'In which industry do he/she currently work, and do he/she aim to stay in this field?', z.object({ industry: z.string() })),
			pdfToJson(
				docs,
				'What are her/his career aspirations in the next 3-5 years?',
				z.object({ goal: z.enum(['advancement', 'specialization', 'pivot to a new field']) }),
			),
			pdfToJson(
				docs,
				'What are the top skills or strengths that you bring to his/her role?',
				z.object({ skills: z.string().describe('maximum of 6 words please') }),
			),
			pdfToJson(
				docs,
				'Are there specific organizations or career levels he/she is targeting for growth?',
				z.object({ target: z.string().describe('maximum of 6 words please') }),
			),
		])
        const finalData = {
			...a,
			...b,
			...c,
			...d,
			...e,
			...f,
		}
		await redisClient.set(`profile-${jobId}`, JSON.stringify(finalData), "EX", 60*30)
	}
}

export const checkPdfStatus = async (jobId: string, type: 'profile' | 'result') => {
	const status = await redisClient.get(`${type}-${jobId}`) || null
	if(type === 'result') {
		return status
	}
	return status ? JSON.parse(status) : null
}


export const generateResult = async (state: DataState) => {
	const data = await redisClient.get(`result-${state.jobId}`) || null
	if(data && data === 'started') {
		return null
	}
	await redisClient.set(`result-${state.jobId}`, 'started', "EX", 60*30)
	if(state.type === 'student') {
		generateStudentResult(state)
	} else {
		generateProfessionalResult(state)
	}
	return 'started'
}


