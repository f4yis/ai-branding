import { create } from 'zustand'

const DataStore = (set: any, get: any) => ({
	data: {
		type: "student",
		profile: null
	},
	updateField: (data: Object) => {
		return set(() => ({
			data: {
				...get().data,
				...data
			}
		}))
	},
	reset: () => {
		return set(() => ({
			data: {
				type: "student"
			}
		}))
	}
})

const useDataStore = create(DataStore)

export default useDataStore
