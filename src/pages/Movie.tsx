import { useState, useEffect } from "react";
import { useGetData } from "@/actions";
import { TbLoader2 } from "react-icons/tb";
import moment from "moment";
import { API_URL_movie, API_URL_movieSearch } from "@/constants";
import { Footer, Header, Pagination } from "@/components";
import { FaSearch, FaStar, FaTimes } from "react-icons/fa";

const API_KEY = "ec4ebf43da0d341b08af3daf97e1a574";

const Movie = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [apiUrl, setApiUrl] = useState(`${API_URL_movie}?page=${currentPage}&api_key=${API_KEY}`);

    useEffect(() => {
        if (searchQuery.trim() !== "") {
            setApiUrl(`${API_URL_movieSearch}?query=${searchQuery}&page=${currentPage}&api_key=${API_KEY}`);
        } else {
            setApiUrl(`${API_URL_movie}?page=${currentPage}&api_key=${API_KEY}`);
        }
    }, [searchQuery, currentPage]);

    const { data, isLoading } = useGetData(apiUrl, [searchQuery, currentPage], true);
    const movies = data?.results || [];
    const totalPages = data?.total_pages || 1;

    const clearSearch = () => {
        setSearchQuery("");
    };

    return (
        <>
            <Header />
            <div className="min-h-screen p-4 pt-24 sm:px-10 lg:px-20 text-white">
                <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                    <div className="text-center text-xl sm:text-3xl font-bold whitespace-nowrap">
                        {searchQuery ? "Search Results" : "Popular Movies"}
                    </div>
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
                </div>

                {isLoading && (
                    <div className="flex justify-center">
                        <TbLoader2 className="text-white animate-spin" size={50} />
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {movies.map((item: any, index: any) => (
                        <div key={index} className="group relative bg-gray-900 rounded-md p-4 transition-all duration-300">
                            <div className="text-left line-clamp-1 mb-2 font-bold">{item.title}</div>
                            <img
                                src={item.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                                    : "https://image.tmdb.org/t/p/w500/k3awyNipWd53HkFtgYst8pa4SlP.jpg"}
                                alt={item.title}
                                className="w-full h-auto rounded-md"
                            />
                            <div className="text-center mt-2">{moment(item.release_date).format("D MMM YYYY")}</div>
                            <div className="text-center flex items-center gap-1 justify-center">
                                <FaStar className="text-yellow-500" />{item.vote_average ?? "N/A"}
                            </div>

                            <div className="absolute inset-0 bg-gray-900/90 bg-opacity-90 text-white p-4 rounded-md 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                                <p className="text-sm text-center line-clamp-12 sm:line-clamp-16">{item.overview || "No synopsis available."}</p>
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
};

export default Movie;
