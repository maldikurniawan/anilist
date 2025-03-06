import { useState } from "react";
import { useGetData } from "@/actions";
import {
    API_URL_manga,
    API_URL_topManga
} from "@/constants";
import { FaSearch, FaStar, FaTimes } from "react-icons/fa";
import { TbLoader2 } from "react-icons/tb";
import { Footer, Header, Pagination } from "@/components";

const apiOptions: Record<string, string> = {
    allmanga: API_URL_manga,
    topManga: API_URL_topManga,
};

const Manga = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedApi, setSelectedApi] = useState("allmanga");
    const [searchQuery, setSearchQuery] = useState("");
    const [type, setType] = useState("");

    const getMangaData = useGetData(
        `${apiOptions[selectedApi]}?page=${currentPage}&q=${searchQuery}&type=${type}`,
        [selectedApi, currentPage, searchQuery, type],
        true
    );
    const allMangaData = getMangaData.data || {};
    const totalPages = allMangaData.pagination?.last_visible_page || 1;

    const clearSearch = () => {
        setSearchQuery("");
    };

    return (
        <>
            <Header />
            <div className="min-h-screen p-4 pt-24 sm:px-10 lg:px-20 text-white">
                <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
                    <div className="text-center text-xl sm:text-3xl font-bold whitespace-nowrap">Manga List</div>
                    {selectedApi === "allmanga" && (
                        <form className="w-full">
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                    <FaSearch />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="bg-gray-900 text-white text-sm rounded focus:ring-[#9B30FF] focus:border-[#9B30FF] block w-full ps-10 p-2.5"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <div
                                        className="absolute inset-y-0 end-0 flex items-center pr-2 cursor-pointer"
                                        onClick={clearSearch}
                                    >
                                        <FaTimes />
                                    </div>
                                )}
                            </div>
                        </form>
                    )}
                    <div className="flex justify-center gap-2">
                        <select
                            className="px-2 py-2 bg-gray-900 text-white rounded"
                            value={selectedApi}
                            onChange={(e) => {
                                setSelectedApi(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="allmanga">All</option>
                            <option value="topManga">Top</option>
                        </select>
                        <select
                            className="px-2 py-2 bg-gray-900 text-white rounded"
                            value={type}
                            onChange={(e) => {
                                setType(e.target.value);
                                setCurrentPage(1);
                            }}
                        >
                            <option value="">Default</option>
                            <option value="manga">Manga</option>
                            <option value="manhwa">Manhwa</option>
                        </select>
                    </div>
                </div>

                {getMangaData.isLoading && (
                    <div className="flex justify-center">
                        <TbLoader2 className="text-white animate-spin" size={50} />
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {allMangaData.data?.map((item: any, index: any) => (
                        <div
                            key={index}
                            className="group relative bg-gray-900 rounded-md p-4 transition-all duration-300"
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
                            <div className="text-left">Chapter: {item.chapters ?? "N/A"}</div>
                            <div className="text-left line-clamp-1">Published: {item.published.string}</div>
                            <div className="text-left flex items-center gap-1">
                                <span>Score: </span>
                                <FaStar className="text-yellow-500" />{item.score ?? "N/A"}
                            </div>

                            <div className="absolute inset-0 bg-gray-900/90 bg-opacity-90 text-white p-4 rounded-md 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                                <p className="text-sm text-center line-clamp-16 sm:line-clamp-20">{item.synopsis || "No synopsis available."}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />

                <Footer />
            </div>
        </>
    );
}

export default Manga;
