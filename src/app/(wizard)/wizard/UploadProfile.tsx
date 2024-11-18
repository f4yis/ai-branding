import ButtonSet from "@/components/ButtonSet"
import DropZone from "@/components/DropZone"
import useDataStore from "@/store/dataStore"
import useStepStore from "@/store/stepStore"
import { useRouter } from "next/navigation"
import { useState } from "react"
// import { checkResult, fetchDocumentData, uploadFile } from "./actions"


const UploadProfile = () => {
	const router = useRouter()
	const [current, setCurrent] = useState(0)
	const updateCurrent = useStepStore(state => state.updateCurrent)
	const updateField = useDataStore(state => state.updateField)
    const profile = useDataStore(state => state.data.profile)
	const [loading, setLoading] = useState(false)
	const [topics, setTopics] = useState([])
	const submit = async (e: React.FormEvent) => {
		e.preventDefault()
        updateCurrent(2)
		// if(state.doc) {
		// 	updateFullPage(true)
		// 	setLoading(true)
		// 	if(typeof state.doc != 'string') {
		// 		const formData = new FormData()
		// 		formData.append('file', (state as any).doc)
		// 		var jobId = await uploadFile(formData)
		// 	}else {
		// 		var jobId = state.doc
		// 	}
			
		// 	const topics = await fetchDocumentData(jobId)
		// 	setTopics(topics as any)
		// 	updateFullPage(false)
		// 	setLoading(false)
		// 	setCurrent(1)
		// } else {
		// 	updateCurrent(3)
		// }
		
	}
	const updateEditField = (index: number) => (text: string) => {
		const temp: any = [...topics]
		temp[index].details = text
		setTopics(temp)
	}
	const update = (file: any) => {
		updateField({
			profile: file
		})
	}
	const next = (e: React.FormEvent) => {
		e.preventDefault()
		// const selected = topics.filter((item: any) => item.selected)
		// updateField({
		// 	docResult: selected
		// })
		// updateCurrent(3)
	}
	if (loading) {
		return (
			<div className="flex-1 flex justify-center items-center">
				<svg className="animate-spin size-6 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
					<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
			</div>
		)
	}
	switch (current) {
		case 0:
			return (
				<form className="w-[max(65%,400px)] mx-auto mt-20 flex flex-col gap-10" onSubmit={submit}>
					<div>
						<h2 className="max-w-full text-[40px] text-secondary font-normal leading-[115%]">Upload your LinkedIn Profile</h2>
						<p className="text-secondary font-normal text-base mt-3">Upload your LinkedIn Profile to extract your data. Skip if you don't have one</p>
					</div>
					<DropZone update={update} />
					<ButtonSet className="mt-1" backButton={() => updateCurrent(0)} nextText={!profile ? "Skip" : "Next"}/>
				</form>
			)
		default:
			return (
				<div>{current}</div>
			)
	}

}

export default UploadProfile