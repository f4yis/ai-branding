'use client'

import ButtonSet from '@/components/ButtonSet'
import Input from '@/components/Input'
import useStepStore from '@/store/stepStore'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Step from './Step'

const Apply = ({ children }: { children: React.ReactNode }) => {
	const steps = useStepStore((state) => state.steps)
	const fullPage = useStepStore((state) => state.fullPage)
	const updateCurrent = useStepStore((state) => state.updateCurrent)
	useEffect(() => {
		updateCurrent(0)
	}, [updateCurrent])
	return (
		<div className={twMerge('flex-1 text-5x flex flex-col items-center p-6', fullPage && 'p-0')}>
			{!fullPage && (
				<div className={twMerge('flex-1 items-center flex', steps.length && 'hidden')}>
					<svg
						className="animate-spin size-6 text-secondary"
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
				</div>
			)}
			<div
				id="roooot"
				className={twMerge(
					'w-full mt-9 relative max-md:max-w-full',
					!steps.length && 'hidden',
					fullPage && 'flex-col flex mt-0 max-w-full h-full flex-1 justify-center items-center',
				)}
			>
				{!fullPage && <Step className="w-full mx-auto overflow-x-auto" />}
				{children}
			</div>
		</div>
	)
}

export default Apply
