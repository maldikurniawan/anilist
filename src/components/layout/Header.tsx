import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GiEvilBook, GiFaceToFace, GiFilmSpool, GiSamuraiHelmet } from "react-icons/gi";

const Header = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { width } = useWindowSize();
    const [navOpen, setNavOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const menu = [
        { icon: <GiSamuraiHelmet />, title: "Anime", link: "/" },
        { icon: <GiEvilBook />, title: "Manga", link: "/manga" },
        { icon: <GiFilmSpool />, title: "Movie", link: "/movie" },
        { icon: <GiFaceToFace />, title: "Seiyuu", link: "/seiyuu" },
    ];

    useOnClickOutside(ref, () => setNavOpen(false));

    useEffect(() => {
        if (width > 1024) {
            setNavOpen(false);
        }
    }, [width]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY >= 100);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="px-4 sm:px-10 lg:px-20 fixed w-full z-50 mt-4">
            <div
                className={`px-4 md:px-[40px] h-20 rounded-xl flex items-center justify-between shadow transition-all duration-300 ${scrolled
                    ? "bg-gray-900/75 backdrop-blur-xl hover:bg-gray-900 hover:shadow-purple-500"
                    : "bg-gray-900"
                    }`}
            >
                <div className="font-bold text-xl flex md:text-3xl items-center gap-4 justify-center text-white">
                    <Link
                        to="/"
                        className="cursor-pointer bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 inline-block text-transparent bg-clip-text"
                    >
                        MAL CLONE
                    </Link>
                </div>

                <div className="hidden lg:flex items-center gap-x-2">
                    {menu.map((item, itemIdx) => (
                        <div key={itemIdx}>
                            <Link
                                to={item.link}
                                className="text-white flex items-center gap-1 rounded-md px-2 py-[8px] hover:bg-white hover:text-purple-500 font-medium whitespace-nowrap cursor-pointer"
                            >
                                {item.icon}
                                <p>{item.title}</p>
                            </Link>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => setNavOpen(true)}
                    className="block lg:hidden text-white p-5 cursor-pointer"
                >
                    <FaBars size={22} />
                </button>
            </div>

            {/* Mobile Navigation */}
            <div
                ref={ref}
                style={{ right: navOpen ? "0" : "-300px" }}
                className="fixed z-50 top-0 h-full min-[300px]:w-[300px] bg-gray-900/90 backdrop-blur drop-shadow transition-all"
            >
                <div className="flex items-center justify-end text-white p-4">
                    <FaXmark
                        className="cursor-pointer"
                        onClick={() => setNavOpen(false)}
                    />
                </div>
                <div className="p-4 h-96 text-left space-y-2">
                    {menu.map((item, itemIdx) => (
                        <div key={itemIdx}>
                            <Link
                                to={item.link}
                                className="px-6 py-2 text-white flex justify-between items-center border w-full hover:bg-white/10 font-medium whitespace-nowrap cursor-pointer rounded-lg"
                                onClick={() => setNavOpen(false)}
                            >
                                <span>{item.title}</span>
                                {item.icon}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;