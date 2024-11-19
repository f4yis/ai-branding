import { create } from 'zustand'

const StepStore = (set: any, get: any) => ({
	steps: [],
	current: 0,
	fullPage: false,
	updateSteps: (steps: string[]) => {
		set(() => ({
			steps,
		}))
	},
	updateCurrent: (current: number) => {
		set(() => ({
			current,
		}))
	},
	updateFullPage: (fullPage: boolean) => {
		set(() => ({
			fullPage,
		}))
	},
})

const useStepStore = create(StepStore)

export default useStepStore
