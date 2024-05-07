import { LineChart } from "@mui/x-charts";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Checkbox from "@mui/material/Checkbox";

const Graph = () => {
    const [casesShow, setCasesShow] = useState(true);
    const [recoveredShow, setRecoveredShow] = useState(false);
    const [deathsShow, setDeathsShow] = useState(false);

    interface Obj {
        [key: string]: number;
    }

    const sumValues = (obj: Obj): number => {
        return Object.values(obj).reduce((acc, curr) => acc + curr, 0);
    };

    const { isPending, error, data } = useQuery({
        queryKey: ["repoData"],
        queryFn: () =>
            fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all#").then(
                (res) => res.json()
            ),
    });

    if (isPending) return <>Loading...</>;

    if (error) return <>"An error has occurred: " + {error.message}</>;
    const casesSum = sumValues(data.cases)
    const deathSum = sumValues(data.deaths)
    const recoveredSum = sumValues(data.recovered)
    return (
        <div className="w-full">
            <div className="flex flex-col md:flex-row justify-around">
                <div className="flex justify-center text-center items-center">
                    <h1 className=" text-lg font-bold">
                        COVID-19 Cases Fluctuations
                    </h1>
                </div>
                <div className="text-center">
                    <h2 className="font-semibold">Global Data</h2>
                    <p><span className="font-semibold">Total Cases: </span>{casesSum}</p>
                    <p><span className="font-semibold">Total Deaths: </span>{deathSum}</p>
                    <p><span className="font-semibold">Total Recovered: </span>{recoveredSum}</p>
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