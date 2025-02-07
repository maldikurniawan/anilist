import { useState, useEffect } from "react";
import { useGetData } from "../actions";
import { TbLoader2 } from "react-icons/tb";
import Pagination from "../components/Pagination";

const API_KEY = "ec4ebf43da0d341b08af3daf97e1a574";
const POPULAR_API_URL = "https://api.themoviedb.org/3/movie/popular";
const SEARCH_API_URL = "https://api.themoviedb.org/3/search/movie";

const Movie = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [apiUrl, setApiUrl] = useState(POPULAR_API_URL);

    useEffect(() => {
        if (searchQuery.trim() !== "") {
            setApiUrl(`${SEARCH_API_URL}?query=${searchQuery}&page=${currentPage}&api_key=${API_KEY}`);
        } else {
            setApiUrl(`${POPULAR_API_URL}?page=${currentPage}&api_key=${API_KEY}`);
        }
    }, [searchQuery, currentPage]);

    const { data, isLoading } = useGetData(apiUrl, [searchQuery, currentPage], true);

    const movies = data?.results || [];
    const totalPages = data?.total_pages || 1;

    return (
        <div className="min-h-screen p-4 sm:p-10 lg:p-20 text-white">
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                <div className="text-center text-4xl font-bold whitespace-nowrap">
                    {searchQuery ? "Search Results" : "Popular Movies"}
                </div>
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="px-4 py-2 h-10 bg-gray-900 text-white rounded w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {isLoading && (
                <div className="flex justify-center">
                    <TbLoader2 className="text-white animate-spin" size={50} />
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {movies.map((movie: any) => (
                    <div key={movie.id} className="bg-gray-900 rounded-md p-4">
                        <div className="text-left line-clamp-1 mb-2 font-bold">{movie.title}</div>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            className="w-full h-auto rounded-md"
                        />
                    </div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
};

export default Movie;
