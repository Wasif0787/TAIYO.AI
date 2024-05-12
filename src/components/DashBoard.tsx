import { useQuery } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import Lottie from "react-lottie";
import * as location from "./loading.json"
import * as success from "./success.json"
import { useEffect, useState } from "react";

const defaultOptions1 = {
    loop: true,
    autoplay: true,
    animationData: location,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};

const defaultOptions2 = {
    loop: true,
    autoplay: true,
    animationData: success,
    rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
    },
};


const DashBoard = () => {
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const { isPending, error, data } = useQuery({
        queryKey: ["repoDataDash"],
        queryFn: () =>
            fetch("https://disease.sh/v3/covid-19/all").then((res) =>
                res.json()
            ),
    });
    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setLoading(false);
            setLoading2(true);
        }, 1000);

        const timeout2 = setTimeout(() => {
            setLoading2(false);
        }, 2000);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, []);
    if (loading) return <Lottie options={defaultOptions1} height={200} width={200} />;
    if (loading2) return <Lottie options={defaultOptions2} height={100} width={100} />;

    if (isPending) return <>
        <Lottie options={defaultOptions2} height={100} width={100} />
    </>;

    if (error) return <>"An error has occurred: " + {error.message}</>;
    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-lg">Global Cases</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg pt-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xl bg-[#f75990] text-white uppercase">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Cases
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Values
                            </th>
                        </tr>
                    </thead>
                    <tbody className="glass-container font-semibold text-lg text-slate-800">
                        {Object.entries(data)
                            .filter(([key]) => key !== "updated")
                            .map(([key, value]) => (
                                <tr
                                    key={key}
                                    className=" border-b hover:bg-gray-300"
                                >
                                    <td className="px-6 py-4">
                                        {key}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{String(value)}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

        </div>

    )
}

export default DashBoard