import Link from 'next/link'

const Footer = () => {
	return (
		<div className="flex px-[5%] py-4 justify-between text-sm text-blue-2 items-start">
			Copyright © 2024
			<br />
			Semat.ai All rights reserved
			<div className="flex space-x-7">
				<Link href="#" className="leading-tight text-right">
					<span className="block text-sm m-0 p-0 text-secondary font-medium">FAQ</span>
					<span className="block text-[8px] m-0 p-0 leading-normal max-w-[100px]">
						Got questions? We’ve got answers.
					</span>
				</Link>
				<Link href="#" className="leading-tight text-right">
					<span className="block text-sm m-0 p-0 text-secondary font-medium">Guide for Tools</span>
					<span className="block text-[8px] m-0 p-0 leading-normal max-w-[100px]">
						Learn how to use our tools like a pro.
					</span>
				</Link>
				<Link href="#" className="leading-tight text-right">
					<span className="block text-sm m-0 p-0 text-secondary font-medium">AI & Your Data</span>
					<span className="block text-[8px] m-0 p-0 leading-normal max-w-[100px]">
						Understand how we keep your data secure.
					</span>
				</Link>
			</div>
		</div>
	)
}

export default Footer
