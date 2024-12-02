'use client'
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

export default function Faq() {
    const [expanded, setExpanded] = useState<null | number>(null);
    return (
        <section id="faqs" className="min-h-screen flex flex-col justify-center items-center bg-white">
                <div className="w-full max-w-3xl px-4">
                    <h3 className="text-sm uppercase tracking-wide text-gray-500 mb-4 text-center">FAQs</h3>
                    <h2 className="text-4xl font-bold mb-4 text-center">Your Questions Answered</h2>
                    <p className="text-gray-600 mb-12 text-center">
                        Explore answers to frequently asked questions about our AI Personal Branding Platform. If you have more questions or need assistance, our support team is here to help.
                    </p>

                    <div className="space-y-4">
                        <div className="faq-item bg-white shadow rounded-lg p-4">
                            <div className="faq-header flex items-center justify-between cursor-pointer" onClick={() => setExpanded(1)} aria-expanded="false" aria-controls="faq1">
                                <span className="text-gray-800 font-medium">Is the platform free to use?</span>
                                <span className="text-primary font-bold text-xl">+</span>
                            </div>
                            <div id="faq1" className={twMerge("faq-body mt-2 text-gray-600", expanded === 1 ? "block" : "hidden")}>
                                Yes, it is currently free to use. However, we will soon be launching a premium version that offers advanced functionalities like detailed profile assessments, unlimited resume generation, and AI-powered content creation.
                            </div>
                        </div>

                        <div className="faq-item bg-white shadow rounded-lg p-4">
                            <div className="faq-header flex items-center justify-between cursor-pointer" onClick={() => setExpanded(2)} aria-expanded="false" aria-controls="faq2">
                                <span className="text-gray-800 font-medium">How can I download my LinkedIn profile from LinkedIn?</span>
                                <span className="text-primary font-bold text-xl">+</span>
                            </div>
                            <div id="faq2" className={twMerge("faq-body mt-2 text-gray-600", expanded === 2 ? "block" : "hidden")}>
                                To download your LinkedIn profile as a PDF, follow these steps:
                                <ol className="list-decimal list-inside mt-2">
                                    <li>Log in to your LinkedIn account.</li>
                                    <li>Go to your profile by clicking on your profile picture or name in the top navigation bar.</li>
                                    <li>Click the "<strong>More</strong>" button near your profile photo and select "<strong>Save to PDF</strong>" from the dropdown menu.</li>
                                    <li>The PDF version of your profile will automatically download to your device.</li>
                                </ol>
                                You can then upload this file to the platform for detailed assessment and optimization.
                            </div>
                        </div>

                        <div className="faq-item bg-white shadow rounded-lg p-4">
                            <div className="faq-header flex items-center justify-between cursor-pointer" onClick={() => setExpanded(3)} aria-expanded="false" aria-controls="faq3">
                                <span className="text-gray-800 font-medium">Can I use the platform to create a brand strategy without uploading my LinkedIn profile?</span>
                                <span className="text-primary font-bold text-xl">+</span>
                            </div>
                            <div id="faq3" className={twMerge("faq-body mt-2 text-gray-600", expanded === 3 ? "block" : "hidden")}>
                                No, sorry. To know more about you and provide the most personalized and effective brand strategy, we require either your LinkedIn profile.
                            </div>
                        </div>

                        <div className="faq-item bg-white shadow rounded-lg p-4">
                            <div className="faq-header flex items-center justify-between cursor-pointer" onClick={() => setExpanded(4)} aria-expanded="false" aria-controls="faq4">
                                <span className="text-gray-800 font-medium">What happens to my data after I complete the branding process?</span>
                                <span className="text-primary font-bold text-xl">+</span>
                            </div>
                            <div id="faq4" className={twMerge("faq-body mt-2 text-gray-600", expanded === 4 ? "block" : "hidden")}>
                                Your data is not stored after you complete the branding process. We ensure that all information you provide is used solely for generating your personalized strategy and is deleted immediately after the process is completed to maintain your privacy and security.
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    )
}