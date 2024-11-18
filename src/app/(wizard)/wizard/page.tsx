'use client'
import { memo, useEffect, useState } from 'react'
import useStepStore from '@/store/stepStore'
import { useRouter } from 'next/navigation'
import Status from './Status'
import Profile from './Profile'
import UploadProfile from './UploadProfile'
import Goal from './Goal'
import Result from './Result'
// import Demographic from './Demographic'
// import ResultPage from './ResultPage'
// import Economic from './Economic'
// import Environmental from './Environmental'
// import Community from './Community'


const Apply = memo(() => {
	const router = useRouter()
	const updateSteps= useStepStore(state => state.updateSteps)
	useEffect(() => {
		updateSteps(['Current Status', 'Upload Profile', 'Profile', 'Goal & Preferences', 'Result'])
	}, [updateSteps])
	const current = useStepStore(state => state.current)
	const renderBody = () => {
		switch (current) {
			case 0:
				return <Status key={'status'}/>
			case 1:
					return <UploadProfile key={'upload'}/>
			case 2:
				return <Profile key={'profile'}/>
			case 3:
				return <Goal key={'goal'}/>
			case 4:
				return <Result key={'result'}/>
		}
	}
	return (
		<>
			{renderBody()}
		</>
	)
})
Apply.displayName = 'Apply 2';

export default Apply