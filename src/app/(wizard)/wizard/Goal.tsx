import ButtonSet from '@/components/ButtonSet'
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
import SingleSelect from '@/components/SingleSelect'
import useDataStore from '@/store/dataStore'
import useStepStore from '@/store/stepStore'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

const audienceOptions = [
	{ label: 'Employers', value: 'employers' },
	{ label: 'Clients', value: 'clients' },
	{ label: 'Professional Peers', value: 'professional_peers' },
]

const perceptionOptions = [
	{ label: 'Thought Leader', value: 'thought_leader' },
	{ label: 'Innovator', value: 'innovator' },
	{ label: 'Expert', value: 'expert' },
]

const toneOptions = [
	{ label: 'Formal', value: 'formal' },
	{ label: 'Conversational', value: 'conversational' },
	{ label: 'Visionary', value: 'visionary' },
]

const contentTypeOptions = [
	{ label: 'Thought Leadership Articles', value: 'thought_leadership_articles' },
	{ label: 'Industry Insights', value: 'industry_insights' },
]
const contentLikesOptions = [
	{ label: 'Showcasing projects', value: 'showcasing_projects' },
	{ label: 'Thought pieces on your field', value: 'thought_pieces_on_field' },
	{ label: 'Industry Insights', value: 'industry_insights' }
]
const contentWorkOptions = [
	{ label: 'Thought Leadership Articles', value: 'thought_leadership_articles' },
]

const skillOptions = [
	{ label: 'Profile Optimization', value: 'profile_optimization' },
	{ label: 'Content Writing', value: 'content_writing' },
	{ label: 'Networking Strategy', value: 'networking_strategy' },
	{ label: 'Career Development', value: 'career_development' },
]

const yesNoOptions = [
	{ label: 'Yes', value: 'yes' },
	{ label: 'No', value: 'no' },
]

const Goal = () => {
	const updateCurrent = useStepStore((state) => state.updateCurrent)

	const updateField = useDataStore((state) => state.updateField)
	const state = useDataStore((state) => state.data)
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
			common: {
				audience: state.common.audience,
				perception: state.common.perception,
				tone: state.common.tone,
				contentLikes: state.common.contentLikes,
				skills: state.common.skills,
			},
			student: {
				linkedinInterest: state.goalStudent.linkedinInterest,
				roleClarity: state.goalStudent.roleClarity,
				contentType: state.goalStudent.contentType,
				careerTrends: state.goalStudent.careerTrends,
				guidanceNeeded: state.goalStudent.guidanceNeeded,
			},
			professional: {
				profileOptimization: state.goalProfessional.profileOptimization,
				achievements: state.goalProfessional.achievements,
				contentType: state.goalProfessional.contentType,
				feedbackNeeded: state.goalProfessional.feedbackNeeded,
				networkingSupport: state.goalProfessional.networkingSupport,
			}
		},
		mode: 'onSubmit',
	})
	const submit = (data: any) => {
		updateField({
			common: data.common,
			goalStudent: data.student,
			goalProfessional: data.professional,
		})
		updateCurrent(4)
	}
	return (
		<form
			name="form"
			className="w-[max(95%,400px)] mx-auto mt-20 flex flex-col gap-6 max-w-full"
			onSubmit={handleSubmit(submit)}
		>
			<h2 className="text-[40px] text-secondary font-medium leading-[115%]">
				Deep Dive: Shape Your Personal Branding Strategy
			</h2>
			<div className="grid grid-cols-2 grid-rows-6 gap-4 gap-x-10 gap-y-5 flex-col grid-flow-col">
				<SingleSelect name="common.audience" control={control} options={audienceOptions} label="What is the primary audience you want to reach with your personal brand?" />
				<SingleSelect name="common.perception" control={control} options={perceptionOptions} label="How would you like to be perceived in your industry or desired field?" />
				<SingleSelect name="common.tone" control={control} options={toneOptions} label="What type of tone best represents your personal brand?" />
				<SingleSelect name="common.contentLikes" control={control} options={contentLikesOptions} label="Would you like to focus on creating specific types of content?" />
				<SingleSelect name="common.skills" control={control} options={skillOptions} label="Do you need any additional support with specific skills?" />
				{state.type === 'student' ? (
					<>
						<SingleSelect name="student.linkedinInterest" control={control} options={yesNoOptions} label="Are you interested in building a LinkedIn profile to connect with potential employers or mentors?" />
						<SingleSelect name="student.roleClarity" control={control} options={yesNoOptions} label="Do you have a clear idea of the roles or skills you would like to emphasize on LinkedIn?" />
						<SingleSelect name="student.contentType" control={control} options={contentTypeOptions} label="What types of content would you like to create?" />
						<SingleSelect name="student.careerTrends" control={control} options={yesNoOptions} label="Are you interested in exploring career-related trends or skills you can develop before graduation?" />
						<SingleSelect name="student.guidanceNeeded" control={control} options={yesNoOptions} label="Would you like guidance on internship or entry-level role applications?" />
					</>
				) : (
					<>
						<SingleSelect name="professional.profileOptimization" control={control} options={yesNoOptions} label="Are you interested in optimizing your LinkedIn profile or other professional profiles for better visibility?" />
						<div className="relative w-full">
							<div className="flex justify-between">
								<label className="text-base mb-2 block text-secondary font-medium">Do you have specific achievements or experiences you would like to emphasize?</label>
							</div>

							<div className="flex gap-1 w-full">
								<textarea 
									rows={3}
									className="flex flex-1 w-full text-secondary rounded-md border-2 border-primary bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
									{...register('professional.achievements')}
								/>
								
							</div>
						</div>
						<SingleSelect name="professional.feedbackNeeded" control={control} options={yesNoOptions} label="Would you like feedback on aligning your profile with industry trends or leadership paths?" />
						<SingleSelect name="professional.networkingSupport" control={control} options={yesNoOptions} label="Do you need support with networking or building connections with industry peers or clients?" />	
					</>
				)}
			</div>
			<ButtonSet className="mt-1" backButton={() => updateCurrent(2)} />
		</form>
	)
}

export default Goal
