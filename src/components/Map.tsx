// import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { createCustomIcon } from "./CreateCustomIcon";


interface CountryData {
    country: string;
    countryInfo: CountryInfo;
    active: number;
    recovered: number;
    deaths: number;
}

interface CountryInfo {
    lat: number;
    long: number;
}

const Map = () => {
    const { isPending, error, data } = useQuery({
        queryKey: ["repoDataMap"],
        queryFn: () =>
            fetch("https://disease.sh/v3/covid-19/countries#").then((res) =>
                res.json()
            ),
    });

    if (isPending) return <>"Loading..."</>;

    if (error) return <>"An error has occurred: " + {error.message}</>;
    return (
        <div className=" flex justify-center items-center h-96">
            <MapContainer
                className="h-full w-screen"
                center={[data[0].countryInfo.lat, data[0].countryInfo.long]}
                zoom={5}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {data.map((elem: CountryData) => (
                    <Marker
                        icon={createCustomIcon}
                        key={elem.country}
                        position={[elem.countryInfo.lat, elem.countryInfo.long]}
                    >
                        <Popup>
                            <div>
                                <span className="font-bold">Country: </span>
                                {elem.country}
                            </div>
                            <div>
                                <span className="font-bold">Acitve Cases: </span>{" "}
                                {elem.active}
                            </div>
                            <div>
                                <span className="font-bold">Recovered Cases: </span>{" "}
                                {elem.recovered}
                            </div>
                            <div>
                                <span className="font-bold">Deaths: </span> {elem.deaths}
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map