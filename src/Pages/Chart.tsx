import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Map from "../components/Map";
import Graph from "../components/Graph";
const queryClient = new QueryClient();

const Chart = () => {
    const [showMap, setShowMap] = useState(true);
    return (
        <div className=' '>
            <div className="w-full flex flex-col items-center">
                <div className=" p-2 rounded-md shadow-md mb-2">
                    <button
                        className={`text-xl md:text-2xl font-semibold py-2 px-4 mb-2 md:mb-4 rounded-md focus:outline-none ${showMap ? 'bg-[#f75990] text-white' : 'text-gray-800 hover:bg-pink-300'}`}
                        onClick={() => setShowMap(true)}
                    >
                        Maps
                    </button>
                    <button
                        className={`text-xl md:text-2xl font-semibold py-2 px-4 rounded-md focus:outline-none ${!showMap ? 'bg-[#f75990] text-white' : 'text-gray-800 hover:bg-pink-300'}`}
                        onClick={() => setShowMap(false)}
                    >
                        Graph
                    </button>
                </div>
            </div>
            <QueryClientProvider client={queryClient}>
                <div className="p-4 ">
                    <div className="">
                        {showMap ? <Map /> : <Graph />}
                    </div>
                </div>
            </QueryClientProvider>
        </div>
    )
}

export default Chart