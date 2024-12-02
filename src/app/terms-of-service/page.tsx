import Header from "@/components/Header";

const PrivacyPolicy = () => {
    return (
        <>
        <Header />
        <main className="container mx-auto px-4 lg:px-32 py-16">
            <h1 className="text-4xl font-bold text-left text-dark mb-8">Terms of Service</h1>
            <p className="text-gray-600 text-left mb-12">
            Effective Date: <strong>November 28, 2024</strong>
            </p>

            <section id="terms" className="space-y-8">
            <h2 className="text-2xl font-bold text-dark mb-4">1. Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
                Welcome to semat.ai! These Terms of Service govern your use of our platform. By accessing or using our services, you agree to comply with these terms. If you do not agree, please do not use our platform.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-4">2. Eligibility</h2>
            <p className="text-gray-600 leading-relaxed">
                You must be at least 18 years old to use semat.ai. By using our platform, you confirm that you meet this requirement.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-4">3. Usage Rules</h2>
            <ul className="list-disc pl-8 text-gray-600 space-y-2">
                <li>You agree to use semat.ai only for lawful purposes.</li>
                <li>You must not attempt to access unauthorized areas of the platform or disrupt its functionality.</li>
                <li>Users are prohibited from reselling or redistributing content generated on the platform.</li>
            </ul>

            <h2 className="text-2xl font-bold text-dark mb-4">4. Intellectual Property</h2>
            <p className="text-gray-600 leading-relaxed">
                All content, features, and functionality on semat.ai, including but not limited to design, text, and graphics, are the intellectual property of semat.ai or its licensors. Unauthorized use of any material is strictly prohibited.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600 leading-relaxed">
                semat.ai is provided "as is" without any guarantees or warranties. We are not responsible for any damages or losses resulting from the use of our platform.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-4">6. Termination</h2>
            <p className="text-gray-600 leading-relaxed">
                We reserve the right to suspend or terminate your account if you violate these Terms of Service or engage in any activity that could harm semat.ai or its users.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-4">7. Changes to Terms</h2>
            <p className="text-gray-600 leading-relaxed">
                semat.ai may update these Terms of Service from time to time. Continued use of our platform indicates your acceptance of the updated terms.
            </p>
            </section>

            <section id="contact" className="mt-16">
            <h2 className="text-2xl font-bold text-dark mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed mt-4">
                If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-gray-600">
                Email: <a href="mailto:support@semat.ai" className="text-primary hover:underline">support@semat.ai</a>
            </p>
            </section>
        </main>



        <footer className="bg-gray-100 py-6">
            <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4 lg:px-32">
            <nav className="flex space-x-6 text-gray-600 text-sm mb-4 lg:mb-0">
                &copy; 2024 semat.ai
                    <a href="https://innovationcafe.qa/" className="hover:text-primary ml-2" target="_blank" rel="noopener noreferrer">Powered by InnovationCafe</a>
                <a href="/privacy-policy/" className="hover:text-primary">Privacy Policy</a>
                <a href="/terms-of-service/" className="hover:text-primary">Terms of Service</a>
            </nav>
            <nav className="flex space-x-6 text-gray-600 text-sm">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Instagram</a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Facebook</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">Twitter</a>
            </nav>
            </div>
        </footer>
        </>
        
    )
}

export default PrivacyPolicy;