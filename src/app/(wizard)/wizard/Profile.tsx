import ButtonSet from '@/components/ButtonSet'
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import useDataStore from '@/store/dataStore'
import useStepStore from '@/store/stepStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import Select from 'react-select'

const options = [
	{ label: 'Undergraduate', value: 'undergraduate' },
	{ label: 'Graduate', value: 'graduate' },
	{ label: 'Doctoral', value: 'doctoral' },
]

const Profile = () => {
	const router = useRouter()
	const updateCurrent = useStepStore((state) => state.updateCurrent)

	const state = useDataStore((state) => state.data)
	const updateField = useDataStore((state) => state.updateField)
	// const updateField = useCommunityStore(state => state.updateField)
	const [selected, setSelected] = useState<'student' | 'professional'>('professional')
	const {
		handleSubmit,
		formState: { errors },
		register,
		control,
		reset,
		setValue,
		watch,
	} = useForm({
		defaultValues: {
			student: {
				name: state.type === 'student' ? state.student.name : '',
				study: state.type === 'student' ? state.student.study : '',
				field: state.type === 'student' ? state.student.field : '',
				goal: state.type === 'student' ? state.student.goal : '',
				industry: state.type === 'student' ? state.student.industry : '',
				skills: state.type === 'student' ? state.student.skills : [],
			},
			professional: {
				name: state.type === 'professional' ? state.professional.name : '',
				job: state.type === 'professional' ? state.professional.job : '',
				industry: state.type === 'professional' ? state.professional.industry : '',
				goal: state.type === 'professional' ? state.professional.goal : '',
				skills: state.type === 'professional' ? state.professional.skills : '',
				target: state.type === 'professional' ? state.professional.target : '',
			},
		},
		mode: 'onSubmit',
	})
	const submit = handleSubmit((data) => {
		updateCurrent(3)
		updateField(data)
	})
	console.log(errors)
	return (
		<form
			name="form"
			className="w-[max(65%,400px)] mx-auto mt-20 flex flex-col gap-6 max-w-full"
			onSubmit={submit}
		>
			<div className="">
				<h2 className="text-[40px] text-secondary font-medium leading-[115%]">Your Profile</h2>
				<p className="text-secondary text-base">
					Let us understand your background to create a personalized branding strategy tailored to your goals.
				</p>
			</div>
			{state.type === 'student' ? (
				<div className="flex gap-4 flex-col">
					<Input label="Your name" {...register('student.name')} />
					<Dropdown
						label="What is your current level of study?"
						control={control}
						options={options}
						name="student.study"
					/>
					<Input label="What field or major are you studying?" {...register('student.field')} />
					<Input label="What are your primary career goals after graduation?" {...register('student.goal')} />
					<Input label="Which industry do you aspire to work in, and do you have specific roles in mind?" {...register('student.industry')} />
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
							{ label: 'Project Management', value: 'project_management' },
						]}
						name="student.skills"
						isMulti
					/>
				</div>
			) : (
				<div className="flex gap-4 flex-col">
					<Input label="Your name" {...register('professional.name')} />
					<Input label="What is your current job title?" {...register('professional.job')} />
					<Input label="In which industry do you currently work, and do you aim to stay in this field?" {...register('professional.industry')} />
					<Dropdown
						label="What are your career aspirations in the next 3-5 years?"
						control={control}
						options={[
							{ label: 'Advancement', value: 'advancement' },
							{ label: 'Specialization', value: 'specialization' },
							{ label: 'Pivot to a new field', value: 'pivot to a new field' },
						]}
						name="professional.goal"
					/>
					<Input label="What are the top skills or strengths that you bring to your role?" {...register('professional.skills')} />
					<Input label="Are there specific organizations or career levels you are targeting for growth?" {...register('professional.target')} />
				</div>
			)}
			<ButtonSet className="mt-1" backButton={() => updateCurrent(1)} />
		</form>
	)
}

export default Profile
