import useStepStore from "@/store/stepStore"
import { useRouter } from "next/navigation"
import ButtonSet from "@/components/ButtonSet"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import useDataStore from "@/store/dataStore"
import Select from 'react-select'
import Dropdown from "@/components/Dropdown"
import Input from "@/components/Input"

const options = [
	{ label: 'Undergraduate', value: 'undergraduate' },
	{ label: 'Graduate', value: 'graduate' },
	{ label: 'Coctoral', value: 'coctoral' }
]

const Profile = () => {
	const router = useRouter()
	const updateCurrent = useStepStore(state => state.updateCurrent)

	const state = useDataStore(state => state.data)
	// const updateField = useCommunityStore(state => state.updateField)
	const [selected, setSelected] = useState<'student' | 'professional'>('professional')
	const {
		handleSubmit,
		formState: {
			errors
		},
		register,
		control,
		reset,
		setValue,
		watch
	} = useForm({
		defaultValues: {
			fff: ""
		}, mode: "onSubmit"
	})
	return (
		<form name="form" className="w-[max(65%,400px)] mx-auto mt-20 flex flex-col gap-6" onSubmit={(e: React.FormEvent) => {
			e.preventDefault()
			updateCurrent(3)
		}}>
			<h2 className="text-[40px] text-secondary font-normal leading-[115%]">Your profile</h2>
			{
				state.type === 'student' ? (
					<div className="flex gap-4 flex-col">
						<Dropdown label="What is your current level of study?" control={control} options={options} name="type" />
						<Input label="What field or major are you studying?" />
						<Input label="What are your primary career goals after graduation?" />
						<Input label="Which industry do you aspire to work in, and do you have any specific roles in mind?" />
						<Input label="What field or major are you studying?" />
						<Dropdown 
							label="What are your top three skills or strengths you feel will help in your future career?" 
							control={control} 
							options={[
								{ label: 'Problem Solving', value: 'problem_solving' },
								{ label: 'Communication', value: 'communication' },
								{ label: 'Leadership', value: 'leadership' },
								{ label: 'Teamwork', value: 'teamwork' },
								{ label: 'Critical Thinking', value: 'critical_thinking' },
								{ label: 'Time Management', value: 'time_management' },
								{ label: 'Research', value: 'research' },
								{ label: 'Technical Skills', value: 'technical_skills' },
								{ label: 'Adaptability', value: 'adaptability' },
								{ label: 'Project Management', value: 'project_management' }
							]} 
							name="type" 
							isMulti 
						/>
					</div>
				) : (
					<div className="flex gap-4 flex-col">
						<Input label="What is your current job title?" />
						<Input label="In which industry do you currently work, and do you aim to stay in this field?" />
						<Dropdown label="What are your career aspirations in the next 3-5 years?" control={control} options={[{ label: 'Advancement', value: 'advancement' }, { label: 'Specialization', value: 'specialization' }, { label: 'pivot to a new field', value: 'Pivot to a new field' }, { label: '20+ years', value: '20+ years' }]} name="type" />
						<Input label="What are the top skills or strengths that you bring to your role?" />
						<Input label="Are there specific organizations or career levels you are targeting for growth?" />
					</div>
				)
			}
			<ButtonSet className="mt-1" backButton={() => updateCurrent(1)} />
		</form>
	)
}

export default Profile