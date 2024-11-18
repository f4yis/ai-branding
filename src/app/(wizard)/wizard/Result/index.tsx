import useStepStore from "@/store/stepStore"
import { useRouter } from "next/navigation"
import ButtonSet from "@/components/ButtonSet"
import { useState } from "react"
import useDataStore from "@/store/dataStore"

const tabs = ['Branding', 'Social Media Posts', 'Personal Brand Strategy']

const Result = () => {
	const router = useRouter()
	const updateCurrent = useStepStore(state => state.updateCurrent)

	const data = useDataStore(state => state.data)
	const updateField = useDataStore(state => state.updateField)
	const [tab, setTab] = useState<string>(tabs[0])
	return (
		<form name="form" className="w-[max(65%,400px)] mx-auto mt-20 flex flex-col gap-6" onSubmit={(e: React.FormEvent) => {
			e.preventDefault()
			updateCurrent(0)
		}}>
			<h2 className="text-[40px] text-secondary font-normal leading-[115%]">Your Personalized Branding Results Are Ready!</h2>
			<div className="flex gap-2">
				{
					tabs?.map((t, i) => (
						<button key={`tab-${i.toString()}`} className={`text-white rounded-full py-1.5 px-3.5 bg-opacity-10 text-sm font-medium ${tab === t ? 'gradient-bg' : 'gradient-bg-opacity'}`} type="button" onClick={() => setTab(t)}>{t}</button>
					))
				}
			</div>
			<div>
				<p className="text-sm text-secondary">Result will be here</p>
			</div>
			<ButtonSet className="mt-1" backButton={() => updateCurrent(3)} nextText="Start new" />
		</form>
	)
}

export default Result