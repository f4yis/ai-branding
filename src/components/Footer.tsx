import Link from 'next/link'

const Footer = () => {
	return (
		<div className="flex px-[5%] py-9 justify-between text-sm text-blue-2">
			Copyright © 2024 AI Banding All rights reserved
			<div className="flex space-x-7">
				<Link href="#">FAQ</Link>
				<Link href="#">Guide for Tools</Link>
				<Link href="#">AI & Your Data</Link>
			</div>
		</div>
	)
}

export default Footer
