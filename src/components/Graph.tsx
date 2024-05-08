import { LineChart } from "@mui/x-charts";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Checkbox from "@mui/material/Checkbox";
import Lottie from "react-lottie";
import * as location from "./loading.json"
import * as success from "./success.json"
import { useEffect } from "react";

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

const Graph = () => {
    const [casesShow, setCasesShow] = useState(true);
    const [recoveredShow, setRecoveredShow] = useState(false);
    const [deathsShow, setDeathsShow] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);


    const { isPending, error, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: () =>
            fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all#").then(
                (res) => res.json()
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

    if (isPending) return <><Lottie options={defaultOptions2} height={100} width={100} /></>;

    if (error) return <>"An error has occurred: " + {error.message}</>;
    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-around">
                <div className="flex justify-center text-center items-center">
                    <h1 className=" text-lg font-bold">
                        COVID-19 Cases Fluctuations
                    </h1>
                </div>
            </div>
            <LineChart
                height={500}
                margin={{ left: 100, right: 30, top: 70 }}
                grid={{ horizontal: true }}
                series={[
                    casesShow
                        ? {
                            data: Object.values(data.cases),
                            label: "Cases",
                            color: "blue",
                        }
                        : { data: [] },
                    deathsShow
                        ? {
                            data: Object.values(data.deaths),
                            label: "Deaths",
                            color: "red",
                        }
                        : { data: [] },
                    recoveredShow
                        ? {
                            data: Object.values(data.recovered),
                            label: "Recovered",
                            color: "green",
                        }
                        : { data: [] },
                ]}
                xAxis={[{ scaleType: "point", data: Object.keys(data.cases) }]}
            />
            <div className="flex justify-center text-center pb-4 font-semibold gap-4">
                <div>
                    Cases
                    <Checkbox
                        checked={casesShow}
                        onChange={() => {
                            setCasesShow(casesShow ? false : true);
                        }}
                    />
                </div>
                <div>
                    Deaths
                    <Checkbox
                        checked={deathsShow}
                        onChange={() => {
                            setDeathsShow(deathsShow ? false : true);
                        }}
                    />
                </div>
                <div>
                    Recovered
                    <Checkbox
                        checked={recoveredShow}
                        onChange={() => {
                            setRecoveredShow(recoveredShow ? false : true);
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Graph