import { useState } from "react";
import { useGetData } from "../actions";
import {
    API_URL_anime,
    API_URL_seasonNow,
    API_URL_seasonUpcoming
} from "../constants";
import { FaChevronLeft, FaChevronRight, FaStar } from "react-icons/fa";

const apiOptions: Record<string, string> = {
    now: API_URL_seasonNow,
    upcoming: API_URL_seasonUpcoming,
    all: API_URL_anime,
};

const Home = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedApi, setSelectedApi] = useState("now");
    const [searchQuery, setSearchQuery] = useState("");

    const getSeasonNow = useGetData(`${apiOptions[selectedApi]}?page=${currentPage}&q=${searchQuery}`, [selectedApi, currentPage, searchQuery], true);
    const seasonNow = getSeasonNow.data || {};

    return (
        <div className="min-h-screen p-4 sm:p-10 lg:p-20 bg-black text-white">
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
                        <option value="all">All Anime</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {seasonNow.data?.map((item: any, index: any) => (
                    <div key={index} className="bg-gray-900 rounded-md p-4">
                        <img src={item.images.jpg.image_url} alt={item.title} className="w-full h-auto rounded-md" />
                        <div className="text-left mt-2 line-clamp-1">Title: {item.title}</div>
                        <div className="text-left">Episodes: {item.episodes ?? "N/A"}</div>
                        <div className="text-left">Status: {item.status}</div>
                        <div className="text-left">Duration: {item.duration}</div>
                        <div className="text-left flex items-center gap-1">
                            <span>Score: </span>
                            <FaStar className="text-yellow-500" />{item.score ?? "N/A"}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4 space-x-4">
                <button
                    className="px-4 py-2 bg-gray-900 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    <FaChevronLeft />
                </button>
                <span className="px-4 py-2">Page {seasonNow.pagination?.current_page} of {seasonNow.pagination?.last_visible_page}</span>
                <button
                    className="px-4 py-2 bg-gray-900 rounded disabled:opacity-50"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={!seasonNow.pagination?.has_next_page}
                >
                    <FaChevronRight />
                </button>
            </div>
        </div>
    );
}

export default Home;
