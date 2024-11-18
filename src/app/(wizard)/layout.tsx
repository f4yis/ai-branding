import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <main className="container min-h-screen flex flex-col">
            <Navigation />
            <section className="flex-1 blur-bg rounded-2xl flex flex-col">{children}</section>
            <Footer />
        </main>
    )
}
