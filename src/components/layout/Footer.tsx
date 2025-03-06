import { FaArrowUp, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa"
import { Tooltip } from "@/components"
import { CgProfile } from "react-icons/cg"
import { useEffect, useState } from "react";

const Footer = () => {
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollToTop(true);
            } else {
                setShowScrollToTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <>
            <div className="flex justify-center mt-10 gap-1 sm:gap-2">
                <a href="https://github.com/maldikurniawan" target="_blank" className="border border-purple-500 text-purple-500 bg-gray-900 rounded-full p-2">
                    <Tooltip tooltip="Github" spacing={10}>
                        <FaGithub className="w-6 sm:w-8 h-6 sm:h-8" />
                    </Tooltip>
                </a>
                <a href="https://www.linkedin.com/in/m-aldi-kurniawan-23a781291/" target="_blank" className="border border-purple-500 text-purple-500 bg-gray-900 rounded-full p-2">
                    <Tooltip tooltip="LinkedIn" spacing={10}>
                        <FaLinkedin className="w-6 sm:w-8 h-6 sm:h-8" />
                    </Tooltip>
                </a>
                <a href="https://www.instagram.com/aldiknn_/" target="_blank" className="border border-purple-500 text-purple-500 bg-gray-900 rounded-full p-2">
                    <Tooltip tooltip="Instagram" spacing={10}>
                        <FaInstagram className="w-6 sm:w-8 h-6 sm:h-8" />
                    </Tooltip>
                </a>
                <a href="https://maldikurniawan.netlify.app/" target="_blank" className="border border-purple-500 text-purple-500 bg-gray-900 rounded-full p-2">
                    <Tooltip tooltip="Portofolio" spacing={10}>
                        <CgProfile className="w-6 sm:w-8 h-6 sm:h-8" />
                    </Tooltip>
                </a>
            </div>

            {showScrollToTop && (
                <button onClick={scrollToTop} className="fixed bottom-4 border border-purple-500 right-4 cursor-pointer bg-gray-900 p-2 rounded-full">
                    <FaArrowUp className='w-8 h-8 text-purple-500' />
                </button>
            )}
        </>
    )
}

export default Footer