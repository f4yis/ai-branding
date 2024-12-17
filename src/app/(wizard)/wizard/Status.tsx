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
			className="w-[max(65%,400px)] mx-auto mt-20 flex flex-col gap-6 max-w-full text-white text-center flex-1"
			onSubmit={(e: React.FormEvent) => {
				e.preventDefault()
				updateCurrent(1)
			}}
		>
			<h2 className="text-[46px] text-primary font-bold leading-[115%] max-w-[500px] mx-auto">
				Are you currently a student or working?
			</h2>
			<p className="text-xl w-[500px] mx-auto text-secondary">
				Select wheater you are a student or professional that will help you get the best experience
			</p>
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
			
			<div className='mt-auto'>
				<ButtonSet noBack  className="mt-1" backButton={() => {
					
				}}
				/>
			</div>
		</form>
	)
}

export default Status
