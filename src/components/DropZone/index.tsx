import { type FC, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { getMedia } from './actions';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string
}

const DropZone: FC<{ update: (file: any) => void }> = ({ update }) => {
	const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({
		accept: {
			'application/pdf': ['.pdf'],
			'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
			'application/msword': ['.doc']
		}
	})
	const [selectedFile, setSelectedFile] = useState<any>({})
	useEffect(() => {
		if (acceptedFiles.length > 0) {
			setSelectedFile({})
			return update(acceptedFiles[0])
		}
		update(null)
	}, [acceptedFiles])
	const [mediaPop, setMediaPop] = useState(false)
	const [medias, setMedias] = useState([])
	const fetchitems = () => {
		setLoading(true)
		getMedia().then((data: any) => {
			setMedias(data || [])
		})
		.finally(() => setLoading(false))
	}
	useEffect(fetchitems, [])
	const selectFile = (file: any) => {
		setSelectedFile(file)
		update(file.jobId)
		setMediaPop(false)
	}
	const renderContent = () => {
		if(selectedFile?.name) {
			return <div className='flex flex-col items-center'>
				{selectedFile?.name}
			</div>
		}
		return acceptedFiles.length > 0 ? <div className='flex flex-col items-center'>
			{acceptedFiles[0].name}
		</div> :
		(<div className='flex flex-col items-center'><p><b>Choose a file</b> or drag and drop your file</p></div>)
	}
	const [loading, setLoading] = useState(false)
	const renderItems = () => {
		if(loading) {
			return (
				<svg className="animate-spin size-6 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
					<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
			)
		}
		if(!medias.length) return <div className='text-secondary text-sm col-span-5'>No items found, Start uploading and it will start apperating here</div>
		return medias.map((item: any) => {
			return <Item key={item._id} name={item.name} preview={item.preview} onClick={() => selectFile(item)}/>
		})
	}
	return (
		<>
			<div {...getRootProps({ className: 'dropzone' })} className='border-2 border-dashed border-secondary px-5 py-16 rounded-xl bg-stroke flex flex-col justify-between items-center relative overflow-hidden'>
				<input {...getInputProps()} />


				<svg width="70" height="70" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
					<g clipPath="url(#clip0_200_2013)">
						<path d="M74.7188 84.0352H21.2812C20.4939 84.0352 19.7388 83.7224 19.182 83.1656C18.6253 82.6089 18.3125 81.8538 18.3125 81.0664V15.7539C18.3125 14.9665 18.6253 14.2114 19.182 13.6547C19.7388 13.0979 20.4939 12.7852 21.2812 12.7852H56.9062L77.6875 33.5664V81.0664C77.6875 81.8538 77.3747 82.6089 76.818 83.1656C76.2612 83.7224 75.5061 84.0352 74.7188 84.0352Z" stroke="#262877" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M55.4219 12.7852V35.0508H77.6875" stroke="#262877" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M39.0938 55.832L48 46.9258L56.9062 55.832" stroke="#262877" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
						<path d="M48 69.1914V46.9258" stroke="#262877" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
					</g>
					<defs>
						<clipPath id="clip0_200_2013">
							<rect width="95" height="95" fill="white" transform="translate(0.5 0.910156)" />
						</clipPath>
					</defs>
				</svg>
				<p className='text-secondary text-lg mt-6'>
					{
						renderContent()
					}
				</p>
				{
					isDragActive &&
					<div className='bg-secondary bg-opacity-70 absolute top-0 left-0 w-full h-full flex justify-center items-center text-white text-2xl font-bold'>
						Drop your file
					</div>
				}
			</div>
		</>
	)
}

const Item:FC<{ name: string, preview?: string, onClick: any }> = ({ name, preview, onClick }) => {
	return (
		<div className=" rounded-md bg-[#EEF2FE] cursor-pointer hover:bg-[#c5d0f1]" onClick={onClick}>
			<div className="text-center p-2 m-[2px] h-[80px] text-sm text-secondary rounded-md bg-[#F7F9FF] flex justify-center items-center bg-cover" style={{ backgroundImage: `url(${preview})` }}>
				{!preview && "No Preview Available"}
			</div>
			<div className="flex justify-between items-center p-2 py-1">
				<p className="flex-1 text-secondary text-xs overflow-hidden whitespace-nowrap text-ellipsis">{name}</p>
			</div>
		</div>
	)
}

export default DropZone