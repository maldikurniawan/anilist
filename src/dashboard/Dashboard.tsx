import { useState } from "react";
import { useGetData } from "../actions";
import { API_URL_seasonNow } from "../constants";

const Dashboard = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const getSeasonNow = useGetData(`${API_URL_seasonNow}?page=${currentPage}`, ["seasonNow", currentPage], true);
    const seasonNow = getSeasonNow.data || {};

    return (
        <div className="p-20 bg-black text-white">
            <div className="text-center text-4xl font-bold">
                Anime List
            </div>
            <div className="grid grid-cols-5 gap-4">
                {seasonNow.data?.map((item: any, index: number) => (
                    <div key={index} className="border p-2">
                        <img src={item.images.jpg.image_url} alt={item.title} className="w-full h-auto" />
                        <div className="text-left mt-2">Title: {item.title}</div>
                        <div className="text-left">Episodes: {item.episodes}</div>
                        <div className="text-left">Status: {item.status}</div>
                        <div className="text-left">Duration: {item.duration}</div>
                        <div className="text-left">Score: {item.score}</div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-4 space-x-4">
                <button
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 text-black"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2">Page {seasonNow.pagination?.current_page} of {seasonNow.pagination?.last_visible_page}</span>
                <button
                    className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 text-black"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={!seasonNow.pagination?.has_next_page}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
