import useStepStore from '@/store/stepStore'
import type { FC } from 'react'
import { twMerge } from 'tailwind-merge'
export interface Props {
	className?: string
	nextButton?: () => void
	backButton: () => void
	nextText?: string
	backText?: string
	nextBtnClass?: string
	backBtnClass?: string
	loading?: boolean
}

const ButtonSet: FC<Props> = ({
	className,
	nextButton,
	backButton,
	nextText,
	backText,
	nextBtnClass,
	backBtnClass,
	loading,
}) => {
	// const back = useHashStore(state => state.back)
	// const updateBack = useHashStore(state => state.updateBack)
	// const current = useStepStore(state => state.current)
	return (
		<div className={twMerge('flex flex-col gap-2', className)}>
			<div className={twMerge('flex gap-6')}>
				<button
					type="button"
					onClick={() => {
						// updateBack(current)
						backButton()
					}}
					className={twMerge(
						'text-base py-2 px-5 border-2 border-primary text-primary rounded-full font-medium text-center max-w-[160px] w-full hover:bg-primary hover:text-white',
						backBtnClass,
					)}
				>
					{backText || 'Back'}
				</button>
				<button
					disabled={loading}
					type="submit"
					onClick={nextButton}
					className={twMerge(
						'text-base text-center flex-1 py-2 px-5 bg-primary rounded-full disabled:bg-opacity-50 text-white hover:bg-secondary font-medium',
						nextBtnClass,
					)}
				>
					{loading ? (
						<svg className="animate-spin mx-auto h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
							<circle
								className="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							/>
							<path
								className="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							/>
						</svg>
					) : (
						nextText || 'Next'
					)}
				</button>
			</div>
		</div>
	)
}

export default ButtonSet
