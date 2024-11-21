export const dynamic = 'force-dynamic'
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import mime from 'mime-types'

export async function GET(request: Request, { params }: any ) {
	try {
		const { file } = await params
		const filePath = path.resolve(process.cwd(), 'result', file)
		const mimeType = mime.lookup(filePath)
		const imageBuffer = await readFile(filePath)
		return new Response(imageBuffer, {
			status: 200,
			headers: {
				'Content-Type': mimeType || 'application/octet-stream',
			},
		})
	} catch (e) {
		return new Response('Not found', {
			status: 404,
		})
	}
}
