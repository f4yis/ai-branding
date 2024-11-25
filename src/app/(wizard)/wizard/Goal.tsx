import ButtonSet from '@/components/ButtonSet'
import Dropdown from '@/components/Dropdown'
import Input from '@/components/Input'
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
	{ label: 'Resumes', value: 'resumes' },
]
const contentLikesOptions = [
	{ label: 'Showcasing school projects', value: 'showcasing_school_projects' },
	{ label: 'Thought pieces on your field', value: 'thought_pieces_on_field' },
]
const contentWorkOptions = [
	{ label: 'Thought Leadership Articles', value: 'thought_leadership_articles' },
	{ label: 'Industry Insights', value: 'industry_insights' },
]

const skillOptions = [
	{ label: 'Profile Optimization', value: 'profile_optimization' },
	{ label: 'Content Writing', value: 'content_writing' },
	{ label: 'Personal Branding', value: 'personal_branding' },
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
		console.log(data)
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
			className="w-[max(65%,400px)] mx-auto mt-20 flex flex-col gap-6 max-w-full"
			onSubmit={handleSubmit(submit)}
		>
			<h2 className="text-[40px] text-secondary font-normal leading-[115%]">
				Deep Dive: Shape Your Personal Branding Strategy
			</h2>
			<div className="flex gap-4 flex-col">
				<Dropdown
					label="What is the primary audience you want to reach with your personal brand?"
					options={audienceOptions}
					control={control}
					name="common.audience"
				/>
				<Dropdown
					label="How would you like to be perceived in your industry or desired field?"
					options={perceptionOptions}
					control={control}
					name="common.perception"
				/>
				<Dropdown
					label="What type of tone best represents your personal brand?"
					options={toneOptions}
					control={control}
					name="common.tone"
				/>
				<Dropdown
					label="Would you like to focus on creating specific types of content?"
					options={contentLikesOptions}
					control={control}
					name="common.contentLikes"
				/>
				<Dropdown
					label="Do you need any additional support with specific skills?"
					options={skillOptions}
					control={control}
					name="common.skills"
				/>
				<div className="border-b border-secondary/50 my-2" />
				{state.type === 'student' ? (
					<>
						<Dropdown
							label="Are you interested in building a LinkedIn profile to connect with potential employers or mentors?"
							options={yesNoOptions}
							control={control}
							name="student.linkedinInterest"
						/>
						<Dropdown
							label="Do you have a clear idea of the roles or skills you would like to emphasize on LinkedIn?"
							options={yesNoOptions}
							control={control}
							name="student.roleClarity"
						/>
						<Dropdown
							label="What types of content would you like to create?"
							options={contentTypeOptions}
							control={control}
							name="student.contentType"
						/>
						<Dropdown
							label="Are you interested in exploring career-related trends or skills you can develop before graduation?"
							options={yesNoOptions}
							control={control}
							name="student.careerTrends"
						/>
						<Dropdown
							label="Would you like guidance on internship or entry-level role applications?"
							options={yesNoOptions}
							control={control}
							name="student.guidanceNeeded"
						/>
					</>
				) : (
					<>
						<Dropdown
							label="Are you interested in optimizing your LinkedIn profile or other professional profiles for better visibility?"
							options={yesNoOptions}
							control={control}
							name="professional.profileOptimization"
						/>
						<Dropdown
							label="Do you have specific achievements or experiences you would like to emphasize?"
							options={yesNoOptions}
							control={control}
							name="professional.achievements"
						/>
						<Dropdown
							label="What type of content aligns best with your branding goals?"
							options={contentWorkOptions}
							control={control}
							name="professional.contentType"
						/>
						<Dropdown
							label="Would you like feedback on aligning your profile with industry trends or leadership paths?"
							options={yesNoOptions}
							control={control}
							name="professional.feedbackNeeded"
						/>
						<Dropdown
							label="Do you need support with networking or building connections with industry peers or clients?"
							options={yesNoOptions}
							control={control}
							name="professional.networkingSupport"
						/>
					</>
				)}
			</div>
			<ButtonSet className="mt-1" backButton={() => updateCurrent(2)} />
		</form>
	)
}

export default Goal
