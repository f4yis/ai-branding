import Header from "@/components/Header";

const PrivacyPolicy = () => {
    return (
        <>
            <Header />
            <section id="privacy-policy" className="min-h-screen py-16 bg-gray-50">
                <div className="container mx-auto px-4 lg:px-32">
                    <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4 text-left">Legal</h3>
                    <h2 className="text-4xl font-bold mb-8 text-left text-dark">Privacy Policy</h2>
                    <p className="text-gray-600 mb-8 text-leq">
                        At semat.ai, your privacy is our priority. We are committed to handling your data responsibly and in compliance with applicable privacy regulations, including GDPR.
                    </p>

                    <h3 className="text-2xl font-bold text-dark mb-4">1. Introduction</h3>
                    <p className="text-gray-600 mb-6">
                        This Privacy Policy outlines how semat.ai processes your data when you use our AI-powered personal branding platform. Our commitment is to safeguard your privacy and protect any data you provide.
                    </p>

                    <h3 className="text-2xl font-bold text-dark mb-4">2. Data Collection</h3>
                    <p className="text-gray-600 mb-6">
                        semat.ai does not store any personal data. All inputs, such as survey responses or uploaded files (e.g., LinkedIn profiles), are processed temporarily to generate results and are deleted immediately after the session ends.
                    </p>

                    <h3 className="text-2xl font-bold text-dark mb-4">3. Data Usage</h3>
                    <p className="text-gray-600 mb-6">
                        Your data is used only to provide the following functionalities:
                    </p>
                    <ul className="list-disc list-inside mb-6 text-gray-600">
                        <li>Generating personalized branding strategies and insights.</li>
                        <li>Optimizing LinkedIn profiles and resumes.</li>
                        <li>Creating AI-generated content, such as professional posts or articles.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-dark mb-4">4. Data Storage</h3>
                    <p className="text-gray-600 mb-6">
                        We do not store any data. Once your session is complete, all inputs are permanently deleted from our servers.
                    </p>

                    <h3 className="text-2xl font-bold text-dark mb-4">5. Third-Party Services</h3>
                    <p className="text-gray-600 mb-6">
                        semat.ai integrates with third-party APIs (e.g., LinkedIn and OpenAI GPT) to deliver its features:
                    </p>
                    <ul className="list-disc list-inside mb-6 text-gray-600">
                        <li>LinkedIn APIs: Used for authentication and profile data retrieval with your consent.</li>
                        <li>OpenAI GPT APIs: Used for AI-powered content generation and branding insights.</li>
                    </ul>
                    <p className="text-gray-600 mb-6">
                        All data sent to third-party APIs is encrypted and processed only for the duration of the session.
                    </p>

                    <h3 className="text-2xl font-bold text-dark mb-4">6. Cookies</h3>
                    <p className="text-gray-600 mb-6">
                        We use minimal cookies strictly for session management. These cookies do not track personal data and are deleted after your session ends.
                    </p>

                    <h3 className="text-2xl font-bold text-dark mb-4">7. Your Rights</h3>
                    <p className="text-gray-600 mb-6">
                        Under GDPR, you have the following rights regarding your data:
                    </p>
                    <ul className="list-disc list-inside mb-6 text-gray-600">
                        <li>Access: You can request information on the data being processed during your session.</li>
                        <li>Correction: You can update your inputs during the session.</li>
                        <li>Erasure: No further action is required, as we do not retain your data.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-dark mb-4">8. Security</h3>
                    <p className="text-gray-600 mb-6">
                        We use industry-standard encryption (e.g., HTTPS/TLS) to protect your data during transmission. While your data is being processed, it is handled securely to ensure confidentiality.
                    </p>

                    <h3 className="text-2xl font-bold text-dark mb-4">9. Policy Updates</h3>
                    <p className="text-gray-600 mb-6">
                        This Privacy Policy may be updated periodically to reflect changes in our practices or regulations. Updates will be posted on this page with a revised effective date.
                    </p>

                    <h3 className="text-2xl font-bold text-dark mb-4">10. Contact Us</h3>
                    <p className="text-gray-600">
                        If you have any questions about this Privacy Policy, you can contact us at:
                    </p>
                    <ul className="list-none mt-4 text-gray-600">
                        <li><strong>Email:</strong> <a href="mailto:support@semat.ai" className="text-primary">support@semat.ai</a></li>
                        <li><strong>Address:</strong> The Pearl, Unit 48, Tower 2 Marina Bay, Doha, Qatar</li>
                    </ul>
                </div>
            </section>

            <footer className="bg-gray-100 py-6">
                <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between px-4 lg:px-32">
                    <nav className="flex space-x-6 text-gray-600 text-sm mb-4 lg:mb-0">
                        &copy; 2024 semat.ai
                        <a href="https://innovationcafe.qa/" className="hover:text-primary ml-2" target="_blank" rel="noopener noreferrer" >Powered by InnovationCafe</a>
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