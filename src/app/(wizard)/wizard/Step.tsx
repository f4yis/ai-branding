'use client'
import useStepStore from '@/store/stepStore'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
	className?: string
}
const Step: FC<Props> = ({ className }) => {
	const steps = useStepStore((state) => state.steps)
	const current = useStepStore((state) => state.current)
	return (
		<div>
			<div className={twMerge('flex max-md:hidden', className)}>
				{steps.map((item: string, index) => {
					return (
						<div
							key={item.toString().replaceAll(' ', '').toLowerCase()}
							className={twMerge(
								'z-10 group flex-col flex-1 flex items-center relative before:absolute before:w-full before:h-[2px] before:-z-10 before:left-1/2 before:top-[6px]',
								index <= current ? 'active before:bg-primary' : 'before:bg-stroke',
								index === current && 'before:bg-stroke',
								index === steps.length - 1 && 'before:hidden',
							)}
						>
							<span className="size-[14px] bg-stroke rounded-full group-[.active]:bg-primary" />
							{/* <div className="mt-6 text-sm px-4 text-center text-secondary group-[.active]:font-bold">
								{item}
							</div> */}
						</div>
					)
				})}
			</div>
			<div className="md:hidden w-full">
				<div className="flex justify-center items-center before:absolute before:w-full before:h-[2px] before:-z-10 before:left-0 before:top-[6px] before:bg-stroke before:content-['']">
					<div className="size-[14px] bg-secondary border-secondary/50 rounded-full" />
				</div>
				<div className="mt-6 text-sm px-4 text-center text-secondary group-[.active]:font-bold">
					{steps[current]}
				</div>
			</div>
		</div>
	)
}

export default Step
