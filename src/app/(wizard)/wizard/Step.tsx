'use client'
import useStepStore from '@/store/stepStore'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	className?: string
}
const Step: FC<Props> = ({ className }) => {
	const steps = useStepStore(state => state.steps)
	const current = useStepStore(state => state.current)
	return (
		<div className={twMerge('flex', className)}>
			{steps.map((item: string, index) => {
				return (
					<div
						key={item.toString().replaceAll(' ', '').toLowerCase()}
						className={twMerge(
							'group flex-col flex-1 flex items-center relative before:absolute before:w-full before:h-[2px] before:-z-10 before:left-1/2 before:top-[6px]',
							index <= current ? 'active before:bg-secondary' : 'before:bg-stroke',
							index === current && 'before:bg-stroke',
							index === (steps.length - 1) && 'before:hidden'
						)}
					>
						<span className="size-[14px] bg-stroke border border-secondary/50 rounded-full group-[.active]:bg-secondary"/>
						<div className="mt-6 text-sm px-4 text-center text-secondary group-[.active]:font-bold">{item}</div>
					</div>
				)
			})}
		</div>
	)
}

export default Step
