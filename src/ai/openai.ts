import { ChatOpenAI } from '@langchain/openai'
import { MemoryVectorStore } from 'langchain/vectorstores/memory'
import { OpenAIEmbeddings } from '@langchain/openai'
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import { createRetrievalChain } from 'langchain/chains/retrieval'
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents'
import { ChatPromptTemplate } from '@langchain/core/prompts'
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { zodToJsonSchema } from "zod-to-json-schema";
import { jsonrepair } from 'jsonrepair'
import type { ZodSchema } from 'zod'
import type { Document } from 'langchain/document'
import { marked } from 'marked'

export const jsonModel = new ChatOpenAI({ model: 'gpt-4o' }).bind({
	response_format: { type: "json_object" },
});

export const chatModel = new ChatOpenAI({ model: 'gpt-4o' })


export const pdfToJson = async (docs: Document<Record<string, any>>[], promptText: string, schema: ZodSchema) => {
	// const schema = z.object({
	// 	name: z.string()
	// })
	const textSplitter = new RecursiveCharacterTextSplitter({
		chunkSize: 1000,
		chunkOverlap: 200,
	})
	// const loader = new PDFLoader(pdfPath);

	// const docs = await loader.load();


	const splits = await textSplitter.splitDocuments(docs)

	const vectorstore = await MemoryVectorStore.fromDocuments(splits, new OpenAIEmbeddings())

	const retriever = vectorstore.asRetriever()

	const systemTemplate = [
		"you must return in json format",
		"\n\n",
		"{context}",
	].join('')

	const prompt = ChatPromptTemplate.fromMessages([
		['system', systemTemplate],
		['human', '{input}'],
	])

	const questionAnswerChain = await createStuffDocumentsChain({
		llm: jsonModel,
		prompt,
	})
	const ragChain = await createRetrievalChain({
		retriever,
		combineDocsChain: questionAnswerChain,
	})

	const results = await ragChain.invoke({
		input: `${promptText || ''}\nreturn following json\n${JSON.stringify(zodToJsonSchema(schema))}`,
	})
	return JSON.parse(jsonrepair(results.answer))

}

export const pdfToText = async (docs: Document<Record<string, any>>[], promptText: string) => {
	const textSplitter = new RecursiveCharacterTextSplitter({
		chunkSize: 1000,
		chunkOverlap: 200,
	})

	const splits = await textSplitter.splitDocuments(docs)

	const vectorstore = await MemoryVectorStore.fromDocuments(splits, new OpenAIEmbeddings())

	const retriever = vectorstore.asRetriever()

	const systemTemplate = [
		"You should return all answers in markdown format",
		"\n\n",
		"{context}",
	].join('')

	const prompt = ChatPromptTemplate.fromMessages([
		['system', systemTemplate],
		['human', '{input}'],
	])

	const questionAnswerChain = await createStuffDocumentsChain({
		llm: chatModel,
		prompt,
	})
	const ragChain = await createRetrievalChain({
		retriever,
		combineDocsChain: questionAnswerChain,
	})

	const results = await ragChain.invoke({
		input: promptText
	})
	return await marked.parse(results.answer)
}

export const generateHtml = async (promptText: string) => {
	const results = await jsonModel.invoke(promptText)
	return results.content
}