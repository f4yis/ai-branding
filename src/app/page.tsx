import Header from "@/components/Header"
import Link from "next/link"

import Image from "next/image"
import image1 from "@/assets/semat-ai-landing.jpg"
import image2 from "@/assets/linkedin-ai.png"
import image3 from "@/assets/profile.png"
import Faq from "@/components/Faq"

const Home = () => {
    return <>
        <Header />
        <main>
            <section className="flex flex-col items-center justify-center min-h-screen text-center px-4 lg:px-16 mt-32">
                <header>
                    <div className="text-sm uppercase tracking-wider text-gray-500 mb-4">AI-Powered Personal Branding</div>
                    <h1 className="text-5xl font-bold mb-6 leading-tight max-w-4xl mx-auto">
                        Transform Your Career with Smart
                        <span className="text-primary"> Personal Branding Strategy</span>
                    </h1>
                </header>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">
                    An innovative AI-driven platform designed to help students, graduates, and professionals build compelling personal brands, optimize LinkedIn profiles, and generate impactful content effortlessly.
                </p>
                <Link href="#next-section" className="block mt-4 max-w-4xl mx-auto">
                <Image src={image1} alt="AI-powered branding illustration" className="rounded-lg shadow-2xl hover:opacity-80 transition-opacity duration-300 w-full" loading="lazy" />
                </Link>
            </section>

            <section id="features" className="min-h-screen container mx-auto flex flex-col lg:flex-row items-center px-4 lg:px-32" role="region" aria-labelledby="features-heading">
                <h2 id="features-heading" className="sr-only">Features</h2>
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h3 className="text-4xl font-bold text-dark leading-tight mb-6">
                        Elevate <span className="text-primary">Personal Branding</span> with AI-Driven Insights
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Effortlessly craft your personal brand with our intelligent platform. From interactive surveys to customized branding strategies, streamline your journey to professional excellence with AI-powered tools.
                    </p>
                    <ul className="space-y-4 text-gray-700">
                        <li className="flex items-center">
                            <span className="text-primary mr-2">✔</span>Create Tailored Personal Branding Strategies
                        </li>
                        <li className="flex items-center">
                            <span className="text-primary mr-2">✔</span>Optimize LinkedIn Profiles Seamlessly
                        </li>
                        <li className="flex items-center">
                            <span className="text-primary mr-2">✔</span>Generate Engaging Professional Content Effortlessly
                        </li>
                    </ul>
                </div>
                <div className="lg:w-1/2 mt-8 lg:mt-0 relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-xl -z-10" />
                    <Image src={image2} width={1200} height={800} alt="Illustration of AI-driven branding" className="rounded-xl shadow-2xl w-full" loading="lazy" />
                </div>
            </section>

            <section className="min-h-screen container mx-auto flex flex-col lg:flex-row items-center px-4 lg:px-32 bg-gray-50">
                <div className="lg:w-1/2 mt-8 lg:mt-0 relative">
                    <div className="absolute inset-0 bg-blue-100 rounded-xl -z-10" />
                    <Image src={image3} width={1200} height={800} alt="Task Management Preview" className="rounded-xl shadow-2xl w-full" loading="lazy" />
                  </div>

                <div className="lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0 lg:ml-8">
                    <h3 className="text-4xl font-bold text-dark leading-tight mb-6">
                        Redefine <span className="text-primary">Your Career Identity</span> with Smart Branding Solutions
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Take charge of your professional narrative with tools designed to showcase your unique strengths. From crafting standout profiles to delivering industry-relevant insights, we make personal branding seamless and impactful.
                    </p>
                    <ul className="space-y-4 text-gray-700">
                        <li className="flex items-center justify-center lg:justify-start">
                            <span className="text-primary mr-2">✔</span>
                            <span>Showcase Your Unique Strengths</span>
                        </li>
                        <li className="flex items-center justify-center lg:justify-start">
                            <span className="text-primary mr-2">✔</span>
                            <span>Achieve Career Goals with Tailored Strategies</span>
                        </li>
                        <li className="flex items-center justify-center lg:justify-start">
                            <span className="text-primary mr-2">✔</span>
                            <span>Stay Ahead with AI-Driven Industry Insights</span>
                        </li>
                    </ul>
                </div>
            </section>
            <section className="py-16 bg-white">
                <div className="container mx-auto text-center px-4 lg:px-32">
                    <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">Features</h3>
                    <h2 className="text-4xl font-bold mb-8 leading-tight">
                        Unleash the Power of <span className="text-primary">AI-Driven</span> <br /> Personal Branding
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 lg:px-32">
                        <div className="border border-gray-200 shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                            <svg className="size-16 text-primary mb-4 text-center mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"/></svg>
                            <h3 className="text-xl font-bold mb-2">Build a Strong Professional Identity</h3>
                            <p className="text-gray-600">
                                Craft a compelling personal brand that highlights your unique strengths and aspirations.
                            </p>
                        </div>

                        <div className="border border-gray-200 shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                        <svg className="size-16 text-primary mb-4 text-center mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M17.9 17.39c-.26-.8-1.01-1.39-1.9-1.39h-1v-3a1 1 0 0 0-1-1H8v-2h2a1 1 0 0 0 1-1V7h2a2 2 0 0 0 2-2v-.41a7.984 7.984 0 0 1 2.9 12.8M11 19.93c-3.95-.49-7-3.85-7-7.93c0-.62.08-1.22.21-1.79L9 15v1a2 2 0 0 0 2 2m1-16A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/></svg>
                            <h3 className="text-xl font-bold mb-2">Enhance Online Presence</h3>
                            <p className="text-gray-600">
                                Optimize your LinkedIn and social profiles to stand out in a competitive job market.
                            </p>
                        </div>

                        <div className="border border-gray-200 shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                        <svg className="size-16 text-primary mb-4 text-center mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71 7.04c.39-.39.39-1.04 0-1.41l-2.34-2.34c-.37-.39-1.02-.39-1.41 0l-1.84 1.83l3.75 3.75M3 17.25V21h3.75L17.81 9.93l-3.75-3.75z"/></svg>
                            <h3 className="text-xl font-bold mb-2">Streamline Content Creation</h3>
                            <p className="text-gray-600">
                                Generate professional posts and articles effortlessly with AI-powered tools.
                            </p>
                        </div>

                        <div className="border border-gray-200 shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                        <svg className="size-16 text-primary mb-4 text-center mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21 8c-1.5 0-2.3 1.4-1.9 2.5l-3.6 3.6c-.3-.1-.7-.1-1 0l-2.6-2.6c.4-1.1-.4-2.5-1.9-2.5c-1.4 0-2.3 1.4-1.9 2.5L3.5 16c-1.1-.3-2.5.5-2.5 2c0 1.1.9 2 2 2c1.4 0 2.3-1.4 1.9-2.5l4.5-4.6c.3.1.7.1 1 0l2.6 2.6c-.3 1 .5 2.5 2 2.5s2.3-1.4 1.9-2.5l3.6-3.6c1.1.3 2.5-.5 2.5-1.9c0-1.1-.9-2-2-2m-6 1l.9-2.1L18 6l-2.1-.9L15 3l-.9 2.1L12 6l2.1.9zM3.5 11L4 9l2-.5L4 8l-.5-2L3 8l-2 .5L3 9z"/></svg>
                            <h3 className="text-xl font-bold mb-2">Gain Career Insights</h3>
                            <p className="text-gray-600">
                                Stay ahead with data-driven insights into industry trends and emerging skills.
                            </p>
                        </div>

                        <div className="border border-gray-200 shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                        <svg className="size-16 text-primary mb-4 text-center mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg>
                            <h3 className="text-xl font-bold mb-2">Achieve Career Goals</h3>
                            <p className="text-gray-600">
                                Tailor strategies that align with your aspirations and open new opportunities.
                            </p>
                        </div>

                        <div className="border border-gray-200 shadow-lg rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
                        <svg className="size-16 text-primary mb-4 text-center mx-auto" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m13.16 22.19l-1.66-3.84c1.6-.58 3.07-1.35 4.43-2.27l-2.78 6.11m-7.5-9.69l-3.84-1.65l6.11-2.78a20 20 0 0 0-2.27 4.43M21.66 2.35S23.78 7.31 18.11 13c-2.2 2.17-4.58 3.5-6.73 4.34c-.74.28-1.57.1-2.12-.46l-2.13-2.13c-.56-.56-.74-1.38-.47-2.13C7.5 10.5 8.83 8.09 11 5.89C16.69.216 21.66 2.35 21.66 2.35M6.25 22H4.84l4.09-4.1c.3.21.63.36.97.45zM2 22v-1.41l4.77-4.78l1.43 1.42L3.41 22zm0-2.84v-1.41l3.65-3.65c.09.35.24.68.45.97zM16 6a2 2 0 1 0 0 4c1.11 0 2-.89 2-2a2 2 0 0 0-2-2"/></svg>
                            <h3 className="text-xl font-bold mb-2">Grow with Confidence</h3>
                            <p className="text-gray-600">
                                Leverage personalized branding strategies to establish yourself as a leader in your field.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-16 bg-gray-50 min-h-screen flex flex-col justify-center items-center">
                <div className="container mx-auto text-center px-4 lg:px-32">
                    <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4">Testimonials</h3>
                    <h2 className="text-4xl font-bold mb-4">
                        Hear What <span className="text-primary">Our Users</span> Have to Say
                    </h2>
                    <p className="text-gray-600 mb-12">
                        See how our platform has transformed careers and boosted confidence.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center text-center transition-all hover:shadow-xl hover:scale-105 transform duration-300">
                            <img
                                src="https://via.placeholder.com/48"
                                alt="Michael Brown"
                                className="w-20 h-20 rounded-full mb-4 border-4 border-primary"
                            />
                            <p className="text-gray-800 italic mb-6">
                                "As a startup founder, building my personal brand felt overwhelming. The AI Personal Branding Platform simplified the entire process. From creating an optimized profile to generating professional articles, it gave me the steps I needed to stand out."
                            </p>
                            <h4 className="font-bold text-lg mb-2">Michael Brown</h4>
                            <p className="text-gray-600">Company Founder</p>
                        </div>

                        <div className="bg-white shadow-md rounded-xl p-8 flex flex-col items-center text-center transition-all hover:shadow-xl hover:scale-105 transform duration-300">
                            <img
                                src="https://via.placeholder.com/48"
                                alt="Lisa Rodriguez"
                                className="w-20 h-20 rounded-full mb-4 border-4 border-primary"
                            />
                            <p className="text-gray-800 italic mb-6">
                                "As a final-year student, I had no idea how to start building my personal brand. This platform walked me through every step—from crafting a professional LinkedIn profile to creating posts that showcased my skills. It made me feel confident as I prepared for the job market."
                            </p>
                            <h4 className="font-bold text-lg mb-2">Lisa Rodriguez</h4>
                            <p className="text-gray-600">Computer Science Student</p>
                        </div>

                    </div>
                </div>
            </section>


            <Faq />

            {/* <script>
        function toggleFaq(element) {
          const faqBody = element.nextElementSibling;
          const isExpanded = element.getAttribute('aria-expanded') === 'true';
      
          element.setAttribute('aria-expanded', !isExpanded);
          faqBody.classList.toggle('hidden', isExpanded);
        }
      </script> */}


        </main>

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
}

export default Home
