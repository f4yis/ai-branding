import ButtonSet from '@/components/ButtonSet'
import useDataStore from '@/store/dataStore'
import useStepStore from '@/store/stepStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const Status = () => {
	const router = useRouter()
	const updateCurrent = useStepStore((state) => state.updateCurrent)

	const data = useDataStore((state) => state.data)
	const updateField = useDataStore((state) => state.updateField)

	return (
		<form
			name="form"
			className="w-[max(65%,400px)] mx-auto mt-20 flex flex-col gap-6 max-w-full"
			onSubmit={(e: React.FormEvent) => {
				e.preventDefault()
				updateCurrent(1)
			}}
		>
			<h2 className="text-[40px] text-secondary font-medium leading-[115%]">
				Are you currently a student or working?
			</h2>
			<div className="flex gap-4">
				<button
					className={`flex-1 rounded-md py-3 px-5 border-primary border-2 font-medium ${data.type === 'student' ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
					type="button"
					onClick={() => updateField({ type: 'student' })}
				>
					Student
				</button>
				<button
					className={`flex-1 rounded-md py-3 px-5 border-primary border-2 font-medium ${data.type === 'professional' ? 'bg-primary text-white' : 'bg-transparent text-primary'}`}
					type="button"
					onClick={() => updateField({ type: 'professional' })}
				>
					Professional
				</button>
			</div>
			<div>
				<p className="text-sm text-secondary">
					Select wheater you are a student or professional that will help you get the best experience
				</p>
			</div>
			<ButtonSet noBack  className="mt-1" backButton={() => {
				
			}}
			/>
		</form>
	)
}

export default Status
