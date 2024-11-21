import ButtonSet from '@/components/ButtonSet'
import useDataStore from '@/store/dataStore'
import useStepStore from '@/store/stepStore'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { checkPdfStatus, generateResult } from '../actions'

// const tabs = ['Branding', 'Social Media Posts', 'Personal Brand Strategy']
const tabs = ['Personal Brand Strategy']
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const Result = () => {
	const router = useRouter()
	const updateCurrent = useStepStore((state) => state.updateCurrent)

	const state = useDataStore((state) => state.data)
	const updateField = useDataStore((state) => state.updateField)
	const updateFullPage = useStepStore((state) => state.updateFullPage)
	const [loading, setLoading] = useState(true)

	const generateResultDebounced = useCallback(async () => {
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

	const [tab, setTab] = useState<string>(tabs[0])
	if (loading) {
		return (
			<div className="flex-1 flex justify-center items-center">
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
			</div>
		)
	}
	return (
		<form
			name="form"
			className="w-[max(85%,400px)] mx-auto mt-20 flex flex-col gap-6"
			onSubmit={(e: React.FormEvent) => {
				e.preventDefault()
				updateCurrent(0)
			}}
		>
			<h2 className="text-[40px] text-secondary font-normal leading-[115%]">
				Your Personalized Branding Results Are Ready!
			</h2>
			<div className="flex gap-2">
				{tabs?.map((t, i) => (
					<button
						key={`tab-${i.toString()}`}
						className={`text-white rounded-full py-1.5 px-3.5 bg-opacity-10 text-sm font-medium ${tab === t ? 'gradient-bg' : 'gradient-bg-opacity'}`}
						type="button"
						onClick={() => setTab(t)}
					>
						{t}
					</button>
				))}
			</div>
			<div>
				<iframe src={`/assets/${state.jobId}.pdf`} className="w-full h-[50vh]" title="result" />
			</div>
			<ButtonSet className="mt-1" backButton={() => updateCurrent(3)} nextText="Start new" />
		</form>
	)
}

export default Result
