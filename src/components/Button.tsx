import type { FC, PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export interface Props {
	type?: 'button' | 'submit' | 'reset'
	onClick?: () => void
	className?: string
	loading?: boolean
}

const Button: FC<PropsWithChildren<Props>> = ({ children, type = 'button', onClick, className, loading = false }) => {
	return (
		<button
			disabled={loading}
			type={type}
			onClick={onClick}
			className={twMerge(
				'text-base flex items-center justify-center text-center flex-1 py-3 px-5 bg-primary rounded-full disabled:bg-opacity-50 text-white hover:bg-secondary',
				className,
			)}
		>
			{loading ? (
				<svg
					className="animate-spin size-6 text-white"
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
			) : (
				children
			)}
		</button>
	)
}

export default Button
