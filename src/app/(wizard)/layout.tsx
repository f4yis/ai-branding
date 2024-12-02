import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main className="container min-h-screen flex flex-col">
			{/* <Navigation /> */}
			<section className="flex-1 blur-bg rounded-2xl flex flex-col">{children}</section>
			{/* <Footer /> */}
		</main>
	)
}
