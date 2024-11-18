"use client"
import Image from 'next/image'
import logo from '@/assets/logo.png'
import Link from 'next/link'

const Navigation =  () => {

	return (
		<div className="flex py-5 justify-between items-center z-50">
			<Link href="/">
				<Image src={logo} alt="f" className="h-12 w-auto" />
			</Link>
			<nav className="inline-flex items-center gap-9">
				<Link href="/" className="text-secondary font-medium text-sm">
					Home
				</Link>
				<Link href="#" className="text-secondary font-medium text-sm">
					About Us
				</Link>
				<div className='relative'>
					<Link href={"#"}>
						<svg width="30" height="30" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M20 39.375C30.7005 39.375 39.375 30.7005 39.375 20C39.375 9.29948 30.7005 0.625 20 0.625C9.29948 0.625 0.625 9.29948 0.625 20C0.625 30.7005 9.29948 39.375 20 39.375Z" fill="#E9EBFE" />
							<path
								d="M35.5485 31.5468C33.7415 29.1275 31.3952 27.1631 28.6959 25.8097C25.9967 24.4562 23.0189 23.7509 19.9993 23.75C16.9798 23.7491 14.0016 24.4524 11.3015 25.8042C8.6014 27.156 6.25382 29.1189 4.44531 31.537C6.24462 33.9674 8.58837 35.9423 11.2886 37.3034C13.9889 38.6646 16.9705 39.3741 19.9944 39.375C23.0184 39.376 26.0005 38.6683 28.7016 37.3089C31.4027 35.9494 33.7477 33.976 35.5485 31.5468Z"
								fill="#262877"
							/>
							<path d="M20 21.25C24.1421 21.25 27.5 17.8921 27.5 13.75C27.5 9.60786 24.1421 6.25 20 6.25C15.8579 6.25 12.5 9.60786 12.5 13.75C12.5 17.8921 15.8579 21.25 20 21.25Z" fill="#262877" />
						</svg>
						<div >

						</div>
					</Link>
				</div>
			</nav>
		</div>
	)
}

export default Navigation
