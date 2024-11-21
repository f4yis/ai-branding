import ButtonSet from '@/components/ButtonSet'
import DropZone from '@/components/DropZone'
import useDataStore from '@/store/dataStore'
import useStepStore from '@/store/stepStore'
import { generateObject } from 'ai'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { z } from 'zod'
import { checkPdfStatus, uploadFile } from './actions'
import { nanoid } from 'nanoid'
import { toast } from 'sonner'
// import { checkResult, fetchDocumentData, uploadFile } from "./actions"

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const UploadProfile = () => {
	const updateCurrent = useStepStore((state) => state.updateCurrent)
	const updateField = useDataStore((state) => state.updateField)
	const updateFullPage = useStepStore((state) => state.updateFullPage)
	const profile = useDataStore((state) => state.data.profile)
	const state = useDataStore((state) => state.data)
	const [loading, setLoading] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const submit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!profile) {
			return toast.error('Please upload your LinkedIn Profile', { className: 'bg-[#ff3333] text-white' })
			// updateField({
			// 	profile: null,
			// 	jobId: nanoid(),
			// })
			// updateCurrent(2)
			// return
		}
		setLoading(true)
		updateFullPage(true)
		const formData = new FormData()
		formData.append('file', profile as File)
		formData.append('type', state.type)
		const jobId = await uploadFile(formData)
		updateField({
			jobId,
		})
		const checkStatus = async () => {
			await sleep(4000)
			const status = await checkPdfStatus(jobId, 'profile')
			if (!status) {
				checkStatus()
			} else {
				console.log({
					[state.type]: status,
				})
				updateField({
					[state.type]: status,
				})
				updateFullPage(false)
				updateCurrent(2)
			}
		}
		checkStatus()
		// updateCurrent(2)
		// generateObject({
		// 	model: openai('gpt-4o'),
		// 	schema: z.object({
		// 		profile: z.string(),
		// 	}),
		// 	prompt: `Extract the following data from the uploaded LinkedIn profile: ${JSON.stringify(profile)}`,
		// })
	}
	const update = (file: any) => {
		updateField({
			profile: file,
		})
	}
	if (loading) {
		return (
			<div className="flex-1 flex justify-center items-center flex-col">
				<svg
					className="animate-spin size-6 text-secondary"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
				{/* <div className="text-secondary text-center relative h-20 overflow-hidden w-full">
					{[
						"Extracting your data from LinkedIn Profile",
						"This may take a few minutes",
						"AI is not perfect, so please check the result carefully",
						"AI makes your life easier"
					].map((text, index) => (
						<p
							key={index}
							className="absolute w-full animate-slide-up"
							style={{
								animation: `slide-up 10s steps(1) infinite`,
								animationDelay: `${index * 3}s`,
								opacity: 0,
							}}
						>
							{text}
						</p>
					))}
				</div> */}
			</div>
		)
	}

	return (
		<form className="w-[max(65%,400px)] mx-auto mt-20 flex flex-col gap-10" onSubmit={submit}>
			<div>
				<h2 className="max-w-full text-[40px] text-secondary font-normal leading-[115%]">
					Upload your LinkedIn Profile
				</h2>
				<p className="text-secondary font-normal text-base mt-3">
					Upload your LinkedIn Profile to extract your data. Skip if you don't have one
				</p>
			</div>
			<DropZone update={update} />
			<ButtonSet
				className="mt-1"
				backButton={() => updateCurrent(0)}
				nextText={'Next'}
			/>
			<div className="rounded-lg">
				<button
					className="w-full py-4 text-left flex items-center justify-between text-secondary font-medium text-lg"
					onClick={(e) => {
						e.preventDefault()
						setIsOpen(!isOpen)
					}}
				>
					How to get profile pdf from LinkedIn
					<svg
						className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
				</button>
				{isOpen && (
					<div className="p-0">
						<ol className="list-decimal list-inside text-sm text-secondary">
							<li>Go to your LinkedIn profile</li>
							<li>Click on the resources of your profile</li>
							<Image
								src={require('@/assets/linkedin-download.png')}
								alt="linkedin download"
								width={500}
								height={500}
								className="my-2 rounded-md"
							/>
							<li>Click on "Save as PDF"</li>
						</ol>
					</div>
				)}
			</div>
		</form>
	)

}

export default UploadProfile
