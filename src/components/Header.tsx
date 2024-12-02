'use client'
import { useEffect, useState } from "react";

const Header = ({callback}: {callback?: (e: any) => void}) => {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if(callback) {
            callback(() => setIsOpen(true))
        }
    }, [callback])
    return (
        <>
            <header className="container mx-auto flex justify-between items-center px-4 lg:px-32 py-4">
                <a href="/" className="text-4xl font-bold text-primary"> semat.ai </a>
                <nav className="hidden md:flex space-x-6 text-gray-600" aria-label="Main navigation">
                    <a href="#features" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">Features</a>
                    <a href="#faqs" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">FAQs</a>
                </nav>
                <a href="#" onClick={() => setIsOpen(true)} id="openWizardBtn" className="px-6 py-3 bg-primary text-white rounded-full hover:bg-blue-700">Start Wizard</a>
            </header>
            {
                isOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="w-full h-full bg-[#000] absolute opacity-55" />
                        <div className="relative w-full h-full flex items-center justify-center max-w-[1100px] max-h-[80%] rounded-2xl">
                            <span onClick={() => setIsOpen(false)} className="cursor-pointer absolute top-[-10px] right-[-10px] size-8 rounded-full bg-white flex items-center justify-center z-50" >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10.587l4.95-4.95l1.414 1.414l-4.95 4.95l4.95 4.95l-1.415 1.414l-4.95-4.95l-4.949 4.95l-1.414-1.415l4.95-4.95l-4.95-4.95L7.05 5.638z" /></svg>
                            </span>
                            <iframe id="wizard-iframe" className="w-full h-full relative rounded-2xl" src="/landing" title="Wizard" />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Header;