import Link from "next/link"

const App = () => {
	return (
        <div className="flex-1 text-5x flex flex-col justify-center items-center p-6 relative">
			<h2 className="text-4xl text-secondary font-extrabold">Hi There, Welcome!</h2>
			<p className='text-secondary text-base mt-2'>AI Tools that helps you to create your personal branding strategy</p>
			<Link href="/wizard" className="mt-5 bg-primary text-white px-5 py-2.5 rounded-md font-medium">Start building yur awesome brand 🎉</Link>
		</div>
    )
}

export default App
