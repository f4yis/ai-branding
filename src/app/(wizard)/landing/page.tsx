import Link from 'next/link'
const App = async () => {
	return (
		<div className="flex-1 text-5x flex flex-col justify-center items-center p-6 relative bg-white">
			<h2 className="text-4xl text-primary font-bold text-center">Hi There,<br/>Welcome to Your Branding Journey!</h2>
			<p className="text-secondary text-base mt-2 max-w-[500px] text-center">
				Unleash the power of AI to craft a standout personal branding strategy and unlock new opportunities.
			</p>
			<Link href="/wizard" className="mt-5 bg-primary text-lg text-white px-5 py-2.5 rounded-full font-bold">
				Start Building Your Unique Brand
			</Link>
		</div>
	)
}

export default App
