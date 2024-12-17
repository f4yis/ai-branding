import * as React from 'react'

import { twMerge } from 'tailwind-merge'
import Skeleton from './Skeleton'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string
	label?: string
	sm?: boolean
	attrib?: string
	loading?: boolean
	right?: any
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, error, label, sm, attrib, loading, right, ...props }, ref) => {
		return (
			<div className="relative w-full">
				<div className="flex justify-between">
					{label && <label className="text-sm mb-2 block text-secondary font-medium">{label}</label>}
					{attrib && (
						<a href={attrib} target="_blank" className="flex text-xs items-center gap-2" rel="noreferrer">
							Data Source
							<svg
								width="18"
								height="19"
								viewBox="0 0 24 25"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<g clip-path="url(#clip0_211_4252)">
									<path
										d="M7.5 12.9619H16.5"
										stroke="#262877"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M9.75 17.4619H6C4.80653 17.4619 3.66193 16.9878 2.81802 16.1439C1.97411 15.3 1.5 14.1554 1.5 12.9619C1.5 11.7684 1.97411 10.6238 2.81802 9.77993C3.66193 8.93602 4.80653 8.46191 6 8.46191H9.75"
										stroke="#262877"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
									<path
										d="M14.25 8.46191H18C19.1935 8.46191 20.3381 8.93602 21.182 9.77993C22.0259 10.6238 22.5 11.7684 22.5 12.9619C22.5 14.1554 22.0259 15.3 21.182 16.1439C20.3381 16.9878 19.1935 17.4619 18 17.4619H14.25"
										stroke="#262877"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									/>
								</g>
								<defs>
									<clipPath id="clip0_211_4252">
										<rect width="24" height="24" fill="white" transform="translate(0 0.961914)" />
									</clipPath>
								</defs>
							</svg>
						</a>
					)}
				</div>

				<div className="flex gap-1 w-full">
					<input
						type={type}
						className={twMerge(
							'flex flex-1 h-10 w-full text-secondary rounded-full border-2 border-primary/50 bg-background px-3 py-5 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
							className,
							sm && 'py-5',
						)}
						ref={ref}
						readOnly={loading}
						{...props}
					/>
					{right?.()}
				</div>

				{error && <div className="absolute bottom-[-18px] right-0 text-[11px] text-[#FF0000]">{error}</div>}
				{loading && <Skeleton className="w-[200px] h-[20px] absolute rounded-sm bottom-3 left-4" />}
			</div>
		)
	},
)
Input.displayName = 'Input'

export default Input
