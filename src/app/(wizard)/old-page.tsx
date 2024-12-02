import Link from 'next/link'
const App = async () => {
	return (
		<div className="flex-1 text-5x flex flex-col justify-center items-center p-6 relative">
			<h2 className="text-4xl text-secondary font-extrabold">Hi There, Welcome to Your Branding Journey!</h2>
			<p className="text-secondary text-base mt-2">
				Unleash the power of AI to craft a standout personal branding strategy and unlock new opportunities.
			</p>
			<Link href="/wizard" className="mt-5 bg-primary text-white px-5 py-2.5 rounded-md font-medium">
				Start Building Your Unique Brand 🚀
			</Link>
		</div>
	)
}

export default App
