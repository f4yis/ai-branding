import ButtonSet from '@/components/ButtonSet'
import useDataStore from '@/store/dataStore'
import useStepStore from '@/store/stepStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { checkPdfStatus, generateResult } from '../actions'

// const tabs = ['Branding', 'Social Media Posts', 'Personal Brand Strategy']
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const Result = () => {
	const updateCurrent = useStepStore((state) => state.updateCurrent)

	const state = useDataStore((state) => state.data)
	const updateField = useDataStore((state) => state.updateField)
	const updateFullPage = useStepStore((state) => state.updateFullPage)
	const [loading, setLoading] = useState(true)

	const generateResultDebounced = useCallback(async () => {
		console.log(state)
		const status = await generateResult(state)
		if(status) {
			const checkStatus = async () => {
				await sleep(4000)
				const status = await checkPdfStatus(state.jobId, 'result')
				if (status !== 'done') {
					checkStatus()
				} else {
					setLoading(false)
					updateFullPage(false)
				}
			}
			checkStatus()
		}
	}, [state, updateFullPage])

	useEffect(() => {
		updateFullPage(true)
		setLoading(true)
		if (!state) return
		const timer = setTimeout(generateResultDebounced, 500)
		return () => clearTimeout(timer)
	}, [generateResultDebounced, state, updateFullPage])

	const downloadPdf = () => {
		// window.open(`/assets/${state.jobId}.pdf`, '_blank')

		fetch(`/assets/${state.jobId}.pdf`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/pdf',
			},
		})
			.then((response) => response.blob())
			.then((blob) => {
				const url = window.URL.createObjectURL(
					new Blob([blob]),
				);
				const link = document.createElement('a');
				link.href = url;
				const name = state.student?.name || state.professional?.name || 'User';
				const formattedName = name.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '');
				link.setAttribute(
					'download',
					`${formattedName}_PersonalBrandStrategy.pdf`,
				);
				document.body.appendChild(link);
				link.click();
				link?.parentNode?.removeChild(link);
			})
	}
	if (loading) {
		return (
			<div className="flex-1 flex flex-col justify-center items-center">
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
				<div className="text-secondary text-center relative mt-2 overflow-hidden w-full px-3">
				Your personal branding strategy is being prepared. This process may take approximately 3 minutes. Please don't close this tab during this time.
				</div>
			</div>
		)
	}
	return (
		<form
			name="form"
			className="w-[max(85%,400px)] mx-auto mt-20 flex flex-col gap-6 max-w-full"
			onSubmit={(e: React.FormEvent) => {
				e.preventDefault()
			}}
		>
			<h2 className="text-[40px] text-secondary font-medium leading-[115%]">
				Your Personalized Branding Results Are Ready!
			</h2>
			
			<ButtonSet backText='Start new' backButton={() => updateCurrent(0)} className="mt-1" nextButton={downloadPdf} nextText="Download PDF" />
		</form>
	)
}

export default Result
