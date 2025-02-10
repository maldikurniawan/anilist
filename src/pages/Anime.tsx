import { useEffect, useState } from "react";
import { useGetData } from "../actions";
import {
    API_URL_anime,
    API_URL_seasonNow,
    API_URL_seasonUpcoming,
    API_URL_topAnime
} from "../constants";
import { FaArrowUp, FaGithub, FaInstagram, FaLinkedin, FaStar, FaTheaterMasks } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { TbLoader2 } from "react-icons/tb";
import { motion } from "framer-motion";
import Pagination from "../components/Pagination";
import Tooltip from "../components/Tooltip";
import { Link } from "react-router-dom";

const apiOptions: Record<string, string> = {
    now: API_URL_seasonNow,
    upcoming: API_URL_seasonUpcoming,
    top: API_URL_topAnime,
    all: API_URL_anime,
};

const Anime = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedApi, setSelectedApi] = useState("now");
    const [searchQuery, setSearchQuery] = useState("");
    const [showScrollToTop, setShowScrollToTop] = useState(false);

    const getSeasonNow = useGetData(`${apiOptions[selectedApi]}?page=${currentPage}&q=${searchQuery}`, [selectedApi, currentPage, searchQuery], true);
    const seasonNow = getSeasonNow.data || {};
    const totalPages = seasonNow.pagination?.last_visible_page || 1;

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
        <div className="min-h-screen p-4 sm:pt-10 sm:px-10 lg:pt-20 lg:px-20 text-white">
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <div className="text-center text-4xl font-bold whitespace-nowrap">Anime List</div>
                {selectedApi === "all" && (
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-4 py-2 h-10 bg-gray-900 text-white rounded w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                )}
                <div className="flex justify-center">
                    <select
                        className="px-2 py-2 bg-gray-900 text-white rounded w-full"
                        value={selectedApi}
                        onChange={(e) => {
                            setSelectedApi(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="now">Current Season</option>
                        <option value="upcoming">Upcoming Season</option>
                        <option value="top">Top Anime</option>
                        <option value="all">All Anime</option>
                    </select>
                </div>
            </div>

            {getSeasonNow.isLoading && (
                <div className="flex justify-center">
                    <TbLoader2 className="text-white animate-spin" size={50} />
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {seasonNow.data?.map((item: any, index: any) => (
                    <motion.div
                        key={index}
                        className="bg-gray-900 rounded-md p-4"
                        initial={{ rotateY: 0 }}
                        whileHover={{ rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="text-left line-clamp-1 mb-2 font-bold">{item.title}</div>
                        <img
                            src={item.images.webp.image_url}
                            alt={item.title}
                            className="w-full h-auto rounded-md"
                        />
                        <div className="text-left mt-2 line-clamp-1">
                            {
                                Array.isArray(item.genres) && item.genres.length > 0
                                    ? item.genres.map((genre: any) => genre.name).join(", ")
                                    : "N/A"
                            }
                        </div>
                        <div className="text-left">Episodes: {item.episodes ?? "N/A"}</div>
                        <div className="text-left line-clamp-1">Aired: {item.aired.string}</div>
                        <div className="text-left line-clamp-1">Duration: {item.duration}</div>
                        <div className="text-left flex items-center gap-1">
                            <span>Score: </span>
                            <FaStar className="text-yellow-500" />{item.score ?? "N/A"}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Reusable Pagination Component */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

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

            <Link to={"/movie"} className="fixed bottom-4 border border-purple-500 left-4 bg-gray-900 p-2 rounded-full">
                <Tooltip tooltip="Movie" spacing={10}>
                    <FaTheaterMasks className="w-8 h-8 text-purple-500" />
                </Tooltip>
            </Link>

            {showScrollToTop && (
                <button onClick={scrollToTop} className="fixed bottom-4 border border-purple-500 right-4 cursor-pointer bg-gray-900 p-2 rounded-full">
                    <FaArrowUp className='w-8 h-8 text-purple-500' />
                </button>
            )}
        </div>
    );
}

export default Anime;
