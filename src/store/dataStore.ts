import { create } from 'zustand'

const initialState = {
	type: 'student',
	profile: null,
	jobId: '',
	student: {
		name: '',
		study: '',
		field: '',
		goal: '',
		industry: '',
		skills: [],
	},
	professional: {
		name: '',
		job: '',
		industry: '',
		goal: '',
		skills: '',
		target: '',
	},
	common: {
		audience: '',
		perception: '',
		tone: '',
		contentLikes: '',
		skills: '',
	},
	goalStudent: {
		linkedinInterest: '',
		roleClarity: '',
		contentType: '',
		careerTrends: '',
		guidanceNeeded: '',
	},
	goalProfessional: {
		profileOptimization: '',
		achievements: '',
		contentType: '',
		feedbackNeeded: '',
		networkingSupport: '',
	},
}
export type DataState = typeof initialState

const DataStore = (set: any, get: any) => ({
	data: initialState,
	updateField: (data: Object) => {
		return set(() => ({
			data: {
				...get().data,
				...data,
			},
		}))
	},
	reset: () => {
		return set(() => ({
			data: initialState,
		}))
	},
})

const useDataStore = create(DataStore)

export default useDataStore
